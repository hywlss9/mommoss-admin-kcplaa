import { useEffect, useMemo, useState } from 'react';

import { Modal, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useGetBanners from '@hooks/queries/banner/useGetBannders';

import { deleteBanner } from '@api/banner';
import { GetBannersQuery } from '@api/banner/getBanners';

import getImageUriFromId from '@utils/getImageUriFromId';
import getIsResponseFalse from '@utils/getIsResponseFalse';
import { off, on } from '@utils/globalEvents';

import * as C from '@components/Common';
import Sort from '@components/Sort';
import Text from '@components/Text';

import * as S from './styled';
import type * as T from './type';

const PAGE_SIZE: number = 4;

function BannerList() {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);
  const [dir, setDir] = useState<GetBannersQuery['dir']>('desc');

  const { data: banners, total, refetch } = useGetBanners({ page, dir, limit: PAGE_SIZE });

  const columns: ColumnsType<T.BannerTableData> = useMemo(() => {
    return [
      {
        key: 'id',
        dataIndex: 'id',
        width: '92px',
        title: () => {
          const toggleSort = () => setDir(dir === 'asc' ? 'desc' : 'asc');

          return <Sort title='번호' dir={dir} onClick={toggleSort} />;
        },
      },
      { key: 'imageAlt', dataIndex: 'imageAlt', title: '배너명', width: '172px', ellipsis: true },
      {
        key: 'image',
        dataIndex: 'image',
        title: '이미지',
        width: '375px',
        render: (image, { imageAlt }) => {
          const src = getImageUriFromId({ uuid: image, type: 'public', preview: true });
          return <C.BannerImg src={src} alt={imageAlt} />;
        },
      },
      {
        key: 'link',
        dataIndex: 'link',
        title: '이동 링크',
        width: '272px',
        ellipsis: true,
        render: link => (
          <a href={link} target='_blank'>
            {link}
          </a>
        ),
      },
      {
        key: 'endAt',
        dataIndex: 'endAt',
        title: '만료일',
        width: '132px',
        render: endAt => (endAt ? dayjs(endAt).format('YYYY.MM.DD') : '-'),
      },
      {
        key: 'management',
        dataIndex: 'management',
        title: '관리',
        width: '120px',
        render: (_, record) => {
          const openUpdateBanenrModal = () =>
            dispatch(openModal({ name: 'updateBanner', props: { bannerId: record.id } }));

          const openDeleteBannerModal = () => {
            Modal.confirm({
              title: '배너를 삭제하시겠습니까?',
              okText: '삭제',
              cancelText: '취소',
              onOk: async () => {
                const response = await deleteBanner({ path: { groupBannerId: record.id } });

                if (getIsResponseFalse(response)) return false;

                refetch();

                message.success('배너가 삭제되었습니다.');
              },
            });
          };

          return (
            <Space>
              <Text block={false} underline={true} cursor='pointer' onClick={openUpdateBanenrModal}>
                수정
              </Text>
              <Text block={false} underline={true} cursor='pointer' onClick={openDeleteBannerModal}>
                삭제
              </Text>
            </Space>
          );
        },
      },
    ];
  }, [dir]);

  const dataSource: T.BannerTableDataSource = useMemo(() => {
    return banners.map(v => ({ ...v, key: v.id }));
  }, [banners]);

  useEffect(() => {
    on('CREATED_BANNER', refetch);
    on('UPDATED_BANNER', refetch);
    return () => {
      off('CREATED_BANNER', refetch);
      off('UPDATED_BANNER', refetch);
    };
  }, []);

  return (
    <S.Container>
      <Text>적정 크기 : 343*56 px</Text>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total,
          current: page,
          position: ['bottomCenter'],
          showSizeChanger: false,
          onChange: setPage,
          pageSize: PAGE_SIZE,
        }}
      />
    </S.Container>
  );
}

export default BannerList;
