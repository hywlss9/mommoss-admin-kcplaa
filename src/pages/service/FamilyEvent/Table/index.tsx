import { useEffect, useMemo, useState } from 'react';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useGetFamilyEvents from '@hooks/queries/event/useGetFamilyEvents';

import type { GetFamilyEventResponse } from '@api/event/getFamilyEvent';
import type { GetFamilyEventsQuery } from '@api/event/getFamilyEvents';

import { off, on } from '@utils/globalEvents';

import * as C from '@components/Common';
import Sort from '@components/Sort';
import Text from '@components/Text';

import * as S from './styled';
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

  const columns: ColumnsType<T.FamilyEventTableData> = useMemo(() => {
    return [
      {
        key: 'type',
        dataIndex: 'type',
        title: '구분',
        render: type => {
          let eventType = '';
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
        render: (_, { groupMembers }) => {
          const outstandingMonth = groupMembers[0].user?.kcplaaMember?.outstandingMonth;
          const payEntranceFee = groupMembers[0].user?.kcplaaMember?.payEntranceFee;
          const isDiligence =
            typeof outstandingMonth === 'number' && outstandingMonth < 6 && payEntranceFee;

          return (
            <S.ApplyMemberName
              {...(isDiligence && { title: '✓ 아이콘은 성실 회원을 표시합니다.' })}>
              {isDiligence && <C.CertifiedBadge />}
              {groupMembers[0].user?.name}
            </S.ApplyMemberName>
          );
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
            <Text
              underline={true}
              cursor='pointer'
              onClick={() => openCreateFamilyEventModal(record)}>
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

  const openCreateFamilyEventModal = (event: GetFamilyEventResponse) =>
    dispatch(openModal({ name: 'approveFamilyEvent', props: { event } }));

  useEffect(() => {
    on('SUCCESS_UPDATE_FAMILY_EVENT', refetch);

    return () => {
      off('SUCCESS_UPDATE_FAMILY_EVENT', refetch);
    };
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
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
export default FamilyEventTable;
