import { useEffect, useMemo, useState } from 'react';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useGetFamilyEvents from '@hooks/queries/event/useGetFamilyEvents';

import type { GetFamiyEventResponse } from '@api/event/getFamilyEvent';
import type { GetFamilyEventsQuery } from '@api/event/getFamilyEvents';

import { off, on } from '@utils/globalEvents';

import Sort from '@components/Sort';
import Text from '@components/Text';

import type * as T from './type';

const PAGE_SIZE: number = 8;

function FamilyEventTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);
  const [dir, setDir] = useState<GetFamilyEventsQuery['dir']>('desc');

  const {
    data: FamilyEvents,
    total,
    isLoading,
    refetch,
  } = useGetFamilyEvents({ page, dir, limit: PAGE_SIZE });

  useEffect(() => {
    on('SUCCESS_UPDATE_FAMILY_EVENT', refetch);

    return () => {
      off('SUCCESS_UPDATE_FAMILY_EVENT', refetch);
    };
  }, []);

  const columns: ColumnsType<T.FamilyEventTableData> = useMemo(() => {
    return [
      {
        key: 'type',
        dataIndex: 'type',
        title: '구분',
        render: type => {
          let eventType;
          switch (type) {
            case 'wedding':
              eventType = '결혼';
              break;
            case 'funeral':
              eventType = '부고';
              break;
            case 'opening':
              eventType = '개업';
              break;
            default:
              eventType = '-';
          }

          return <>{eventType}</>;
        },
      },
      {
        key: 'title',
        dataIndex: 'title',
        title: '경조명',
        render: title => {
          return <>{title}</>;
        },
      },
      {
        key: 'name',
        dataIndex: 'name',
        title: '신청자',
        render: (_, record) => {
          return <>{record.groupMembers[0].user?.name}</>;
        },
      },
      {
        key: 'createdAt',
        dataIndex: 'createdAt',
        // title: '발생일',
        title: () => {
          const toggleSort = () => setDir(dir === 'asc' ? 'desc' : 'asc');

          return <Sort title='발생일' dir={dir} onClick={toggleSort} />;
        },
        render: createdAt => {
          const createDate = dayjs(createdAt).format('YYYY.MM.DD');
          return <>{createDate}</>;
        },
      },
      {
        key: 'approveStatus',
        dataIndex: 'approveStatus',
        title: '상태',
        render: approveStatus => {
          let status;
          switch (approveStatus) {
            case 'pending':
              status = '신청중';
              break;
            case 'approved':
              status = '승인';
              break;
            case 'rejected':
              status = '반려';
              break;
            default:
              status = '-';
          }
          return <>{status}</>;
        },
      },
      {
        key: 'approve',
        dataIndex: 'approve',
        title: '승인처리',
        render: (_, record) => {
          return (
            <Text underline cursor='pointer' onClick={() => openCreateFamilyEventModal(record)}>
              상세보기
            </Text>
          );
        },
      },
    ];
  }, [FamilyEvents]);

  const dataSource: T.FamilyEventTableDataSource = useMemo(() => {
    return FamilyEvents.map(v => ({ ...v, key: v.id }));
  }, [FamilyEvents]);

  const openCreateFamilyEventModal = (event: GetFamiyEventResponse) =>
    dispatch(openModal({ name: 'approveFamilyEvent', props: { event } }));

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{
          position: ['bottomCenter'],
          total,
          pageSize: PAGE_SIZE,
          showSizeChanger: false,
          onChange: setPage,
        }}
      />
    </>
  );
}
export default FamilyEventTable;
