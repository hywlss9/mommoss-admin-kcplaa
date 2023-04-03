import { useMemo, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';

import { Popover, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import update from 'immutability-helper';

import useGetPushCategories from '@hooks/queries/push/useGetPushCategories';
import useGetPushes from '@hooks/queries/push/useGetPushes';

import type { GetPushesQuery } from '@api/push/getPushes';

import Sort from '@components/Sort';
import TableHeader from '@components/TableHeader';

import PushDetail from './PushDetail';
import * as S from './styled';
import type * as T from './type';

const PAGE_SIZE: number = 10;

function SituationTable() {
  const { data: pushCategories } = useGetPushCategories();

  const [sendContentType, setMessageType] = useState<T.SendContentType>('push');
  const [selectedSituations, setSelectedSituations] = useState<T.PushSituationTableDataSource>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const [dir, setDir] = useState<GetPushesQuery['dir']>('desc');

  const { data: pushes, isLoading } = useGetPushes({ page, q: searchValue, dir, limit: PAGE_SIZE });

  const dataSource: T.PushSituationTableDataSource = useMemo(() => {
    return pushes.map(v => ({ ...v, key: v.id }));
  }, [pushes]);

  const columns: ColumnsType<T.PushSituationTableData> = [
    {
      key: 'id',
      dataIndex: 'id',
      title: '번호',
      width: '10%',
    },
    {
      key: 'categoryId',
      dataIndex: 'categoryId',
      title: '유형',
      width: '10%',
      render: categoryId => {
        const findCategoryName = pushCategories?.find(({ id }) => id === categoryId)?.name || '';

        return <>{findCategoryName}</>;
      },
    },
    {
      key: 'message',
      dataIndex: 'message',
      title: '메시지',
      ellipsis: true,
      width: '30%',
      render: message => <S.Message>{message}</S.Message>,
    },
    {
      key: 'date',
      dataIndex: 'date',
      title: () => {
        const toggleSort = () => setDir(dir === 'asc' ? 'desc' : 'asc');

        return <Sort title='발송일자' dir={dir} onClick={toggleSort} />;
      },
      width: '20%',
      render(_, { sendAt, createdAt }) {
        const isSendAt = sendAt && dayjs(sendAt).isAfter(dayjs(new Date()));

        return (
          <>
            {isSendAt
              ? dayjs(sendAt).format('YYYY-MM-DD HH:mm')
              : dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
          </>
        );
      },
    },
    {
      key: 'total',
      dataIndex: 'total',
      title: '발송결과',
      width: '15%',
      render: (_, { id, sendAt, results }) => {
        const total = results ? results.length : 0;
        const isSuccessArr = results ? results.filter(({ status }) => status === 'success') : [];
        const isBefore = dayjs().isBefore(dayjs(sendAt));

        if (isBefore) return <>전송 대기중</>;

        return (
          <S.SendResultText>
            <Popover
              content={<PushDetail pushId={id} />}
              trigger='click'
              placement='bottomLeft'
              overlayClassName='no-padding-popover'
              zIndex={1000}>
              <S.UnderLineText>{isSuccessArr.length} </S.UnderLineText>
            </Popover>
            / {total}
          </S.SendResultText>
        );
      },
    },
    {
      key: 'fail',
      dataIndex: 'fail',
      title: '실패',
      width: '8%',
      render: (_, record) => {
        const { results } = record;
        const failCount = results.filter(
          ({ status }) => status === 'rejected' || status === 'error',
        ).length;

        return <S.FailText>{failCount || 0}</S.FailText>;
      },
    },
    {
      key: 'reactionRate',
      dataIndex: 'reactionRate',
      title: '반응률',
      width: '8%',
      render: (_, { results }) => {
        const total = results ? results.length : 0;
        const isSuccessArr = results ? results.filter(({ status }) => status === 'success') : [];
        const reactionRate = (isSuccessArr.length / total) * 100;

        return <>{reactionRate || 0}%</>;
      },
    },
  ];

  const select = (data: T.PushSituationTableData, selected: boolean) => {
    setSelectedSituations(prevState => {
      if (selected) return [...prevState, data];

      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };
  const selectAll = (selected: boolean, data: T.PushSituationTableDataSource) => {
    setSelectedSituations(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const handleSendContentType = ({ currentTarget: { name } }: MouseEvent<HTMLButtonElement>) =>
    setMessageType(name as T.SendContentType);

  const searchMessage = (value: string) => {
    if (value.length < 2) {
      message.info('검색어는 2글자 이상이어야 합니다.');
      return false;
    }

    setSearchValue(value.length > 1 ? value : undefined);
  };

  const handleSearchText = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!value) setSearchValue(undefined);
  };

  return (
    <>
      <TableHeader
        buttons={[
          { text: '푸시알림', buttonProps: { name: 'push', onClick: handleSendContentType } },
          // { text: '사서함', buttonProps: { name: 'pobox', onClick: handleSendContentType } },
          // { text: '메일', buttonProps: { name: 'mail', onClick: handleSendContentType } },
        ]}
        searchInput={true}
        inputProps={{
          placeholder: '메시지 검색',
          onChange: handleSearchText,
          onSearch: searchMessage,
        }}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedSituations.map(v => v.key),
          onSelect: select,
          onSelectAll: selectAll,
        }}
        pagination={{
          position: ['bottomCenter'],
          total: dataSource.length,
          showSizeChanger: false,
          onChange: setPage,
          pageSize: PAGE_SIZE,
        }}
      />
    </>
  );
}

export default SituationTable;
