import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useGetNotices from '@hooks/queries/notice/useGetNotices';

import { deleteNotice } from '@api/notice';
import type { GetNoticesQuery } from '@api/notice/getNotices';

import { off, on } from '@utils/globalEvents';

import Sort from '@components/Sort';
import TableHeader from '@components/TableHeader';
import Text from '@components/Text';

import type { NoticeTableData, NoticeTableDataSource } from '@type/notice';

const PAGE_SIZE: number = 10;

function NoticeTable() {
  const dispatch = useDispatch();

  const [selectedNotices, setSelectedNotices] = useState<NoticeTableDataSource>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const [dir, setDir] = useState<GetNoticesQuery['dir']>('desc');

  const {
    data: notices,
    total,
    isLoading,
    refetch,
  } = useGetNotices({ page, q: searchValue, dir, limit: PAGE_SIZE });

  const dataSource: NoticeTableDataSource = useMemo(() => {
    return notices.map(v => ({ ...v, key: v.id }));
  }, [notices]);

  const columns: ColumnsType<NoticeTableData> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: '제목',
    },
    {
      key: 'authorName',
      dataIndex: 'authorName',
      title: '생성자',
      render: authorName => authorName,
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: () => {
        const toggleSort = () => setDir(dir === 'asc' ? 'desc' : 'asc');

        return <Sort title='등록일' dir={dir} onClick={toggleSort} />;
      },
      render: value => {
        return dayjs(value).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '상태',
      render: () => '게시',
    },
    // {
    //   key: 'push',
    //   dataIndex: 'push',
    //   title: '알림발송',
    // },
    {
      key: 'func',
      dataIndex: 'func',
      title: '추가기능',
      render: (_, { id }) => {
        const handleUpdateNoticeModal = () => {
          if (!notices) return;

          const notice = notices.find(notice => notice.id === id);
          if (!notice) return;

          dispatch(openModal({ name: 'updateNotice', props: { notice } }));
        };
        return (
          <Space>
            <Text underline={true} onClick={handleUpdateNoticeModal}>
              수정
            </Text>
          </Space>
        );
      },
    },
  ];

  const select = (data: NoticeTableData, selected: boolean) => {
    setSelectedNotices(prevState => {
      if (selected) return [...prevState, data];

      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const selectAll = (selected: boolean, data: NoticeTableDataSource) => {
    setSelectedNotices(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const handleDeleteSurveys = async () => {
    if (!selectedNotices.length) {
      message.warning({ key: 'not-selected-notices', content: '공지를 선택해주세요.' });
      return false;
    }

    for await (const notice of selectedNotices) {
      await deleteNotice({ path: { noticeId: notice.id } });
    }

    setSelectedNotices([]);
    message.success('공지가 삭제되었습니다.');
    refetch();
  };

  const searchMember = (value: string) => {
    if (value.length < 2) {
      message.info('검색어는 2글자 이상이어야 합니다.');
      return false;
    }

    setPage(1);
    setSearchValue(value.length > 1 ? value : undefined);
  };

  const resetSearchValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!value && searchValue) {
      setPage(1);
      setSearchValue(undefined);
    }
  };

  useEffect(() => {
    on('SUCCESS_UPDATE_SURVEY', refetch);
    return () => {
      off('SUCCESS_UPDATE_SURVEY', refetch);
    };
  }, []);

  return (
    <>
      <TableHeader
        buttons={[{ text: '삭제', buttonProps: { onClick: handleDeleteSurveys } }]}
        searchInput={true}
        inputProps={{
          placeholder: '공지 검색',
          onChange: resetSearchValue,
          onSearch: searchMember,
        }}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedNotices.map(v => v.key),
          onSelect: select,
          onSelectAll: selectAll,
        }}
        pagination={{
          total,
          current: page,
          position: ['bottomCenter'],
          showSizeChanger: false,
          onChange: setPage,
          pageSize: PAGE_SIZE,
        }}
      />
    </>
  );
}

export default NoticeTable;
