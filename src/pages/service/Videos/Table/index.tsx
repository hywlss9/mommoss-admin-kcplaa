import { useEffect, useMemo, useState } from 'react';

import { Dropdown, Table, message } from 'antd';
import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useGetVideos from '@hooks/queries/videos/useGetVideos';

import { deleteVideos, updateVideo } from '@api/videos';
import type { GetVideosQuery } from '@api/videos/getVideos';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { off, on } from '@utils/globalEvents';

import Sort from '@components/Sort';
import TableHeader from '@components/TableHeader';
import Text from '@components/Text';
import Video from '@components/Video';

import type * as T from './type';

const items: MenuProps['items'] = [
  {
    label: '공개',
    key: '1',
  },
  {
    label: '비공개',
    key: '2',
  },
];

const PAGE_SIZE: number = 4;

function VideosTable() {
  const dispatch = useDispatch();

  const [selectedSurveys, setSelectedSurveys] = useState<T.VideoTableDataSource>([]);
  const [page, setPage] = useState<number>(1);
  const [dir, setDir] = useState<GetVideosQuery['dir']>('desc');

  const { data: videos, total, isLoading, refetch } = useGetVideos({ page, dir, limit: PAGE_SIZE });

  const columns: ColumnsType<T.VideoTableData> = useMemo(() => {
    return [
      {
        key: 'title',
        dataIndex: 'title',
        title: '동영상',
        width: '54%',
        ellipsis: true,
        render: (_, { url, title, thumbnailUrl }) => {
          return <Video url={url} title={title} thumbnailUrl={thumbnailUrl} />;
        },
      },
      {
        key: 'visible',
        dataIndex: 'visible',
        width: '23%',
        title: '상태',
        render: (_, { id, visible }) => {
          const statusChange = async ({ key }: T.MenuItem) => {
            const status = key === '1';

            if (visible === status) return;

            const response = await updateVideo({
              path: { videoPostId: id },
              data: { visible: status },
            });

            if (getIsResponseFalse(response)) return false;

            refetch();
            message.success('상태가 변경되었습니다.');
          };

          return (
            <Dropdown menu={{ items, onClick: statusChange }} trigger={['click']}>
              <Text underline cursor='pointer'>
                {visible ? '공개' : '비공개'}
              </Text>
            </Dropdown>
          );
        },
      },
      {
        key: 'createdAt',
        dataIndex: 'createdAt',
        title: () => {
          const toggleSort = () => setDir(dir === 'asc' ? 'desc' : 'asc');

          return <Sort title='등록일' dir={dir} onClick={toggleSort} />;
        },
        width: '23%',
        render: createdAt => {
          const createDate = dayjs(createdAt).format('YYYY.MM.DD HH:mm');
          return <>{createDate}</>;
        },
      },
    ];
  }, [videos]);

  const dataSource: T.VideoTableDataSource = useMemo(() => {
    return videos.map(v => ({ ...v, key: v.id }));
  }, [videos]);

  const handleDeleteVideos = async () => {
    if (!selectedSurveys.length) {
      message.warning({ key: 'not-selected-videos', content: '동영상을 선택해주세요.' });
      return false;
    }

    const response = await deleteVideos({
      data: { videoPostIds: selectedSurveys.map(({ id }) => id) },
    });
    if (getIsResponseFalse(response)) return false;

    setSelectedSurveys([]);
    refetch();
    message.success('설문이 삭제되었습니다.');
  };

  const select = (data: T.VideoTableData, selected: boolean) => {
    setSelectedSurveys(prevState => {
      if (selected) return [...prevState, data];

      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const selectAll = (selected: boolean, data: T.VideoTableDataSource) => {
    setSelectedSurveys(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const openCreateMemberModal = () => dispatch(openModal({ name: 'createVideo' }));

  useEffect(() => {
    on('SUCCESS_CREATE_VIDEO', refetch);

    return () => {
      off('SUCCESS_CREATE_VIDEO', refetch);
    };
  }, []);

  return (
    <>
      <TableHeader
        buttons={[{ text: '삭제', buttonProps: { onClick: handleDeleteVideos } }]}
        rightButtons={[
          {
            text: '동영상 업로드',
            buttonProps: { type: 'primary', onClick: openCreateMemberModal },
          },
        ]}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedSurveys.map(v => v.key),
          onSelect: select,
          onSelectAll: selectAll,
        }}
        pagination={{
          total,
          position: ['bottomCenter'],
          pageSize: PAGE_SIZE,
          showSizeChanger: false,
          onChange: setPage,
        }}
      />
    </>
  );
}

export default VideosTable;
