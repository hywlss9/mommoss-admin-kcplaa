import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Input, Table, message } from 'antd';
import type { ColumnsType, TableProps } from 'antd/lib/table';
import dayjs from 'dayjs';
import update from 'immutability-helper';

import useGetAssociationMembers from '@hooks/queries/group/useGetAssociationMembers';

import TableHeader from '@components/TableHeader';
import TableTags from '@components/TableTags';

import * as S from './styled';
import type * as T from './type';

const columnsData: ColumnsType<T.AssociationMembersData> = [
  // { title: '아이디', dataIndex: 'id',  },
  { title: '이름', dataIndex: 'name', key: 'name', render: (_, { name }) => name },
  // {
  //   title: '소속',
  //   dataIndex: 'affiliation',
  //   render: (_, { teams }) => {
  //     const isData = !!teams.length;
  //     return isData ? <>{teams.map(({ name }) => `${name}, `)}</> : '-';
  //   },
  // },
  // {
  //   title: '직위',
  //   dataIndex: 'position',
  //   // @ts-ignore
  //   render: (_, { position }) => {
  //     return position ? position.name : '-';
  //   },
  // },
  // { title: '이메일', dataIndex: 'email', render: (_, { user: { email } }) => email || '' },
  // {
  //   title: '상태',
  //   dataIndex: 'status',
  //   render: () => '미접속',
  // },
  {
    title: '수신설정',
    dataIndex: 'receive',
    key: 'receive',
    render: () => '-',
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    render: () => '사용',
  },
  {
    title: '최근접속',
    dataIndex: 'lastActivatedAt',
    key: 'lastActivatedAt',
    render: (_, record) => {
      if (!record?.user) return '-';

      const { lastActivatedAt } = record.user;
      return lastActivatedAt ? dayjs(lastActivatedAt).format('YYYY-MM-DD HH:mm') : '-';
    },
  },
];

/**
 * props
 * * header: boolean - header + 검색창
 * * search: boolean - 단일 검색창
 * * tags: undefined | 'top' | 'bootom' - select 태그 표시
 * * blackList: string[] - 보이지 않을 속성
 */
function MemberTable({
  selectedMembers: _selectedMembers,
  setSelectedMembers: _setSelectedMembers,
  pageSize = 10,
  header = true,
  search,
  tags,
  blackList,
}: T.MemberTableProps) {
  const [selectedMembers, setSelectedMembers] = useState<T.AssociationMembersDataSource>(
    _selectedMembers || [],
  );
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);

  const {
    data: members,
    total,
    isLoading,
  } = useGetAssociationMembers({ page, limit: pageSize, q: searchValue });

  const columns = useMemo(() => {
    if (!blackList || !blackList.length) return columnsData;

    return columnsData.filter(data => {
      if (!data.key) return false;
      return !blackList.includes(String(data.key));
    });
  }, [blackList]);

  const dataSource: T.AssociationMembersDataSource = useMemo(() => {
    return members.map(v => ({ ...v, key: v.id }));
  }, [members]);

  const isTag = useMemo(() => typeof tags !== 'undefined', [tags]);

  const select = (data: T.AssociationMembersData, selected: boolean) => {
    setSelectedMembers(prevState => {
      if (selected) return [...prevState, data];

      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const deselect = (id: T.AssociationMembersData['id']) => {
    setSelectedMembers(prevState => {
      const findIndex = prevState.findIndex(v => v.id === id);
      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const selectAll = (selected: boolean, data: T.AssociationMembersData[]) => {
    setSelectedMembers(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const deselectAll = () => setSelectedMembers([]);

  const searchMember = (value: string) => {
    if (value.length < 2) {
      message.info('검색어는 2글자 이상이어야 합니다.');
      return false;
    }

    setSearchValue(value.length > 1 ? value : undefined);
  };

  const resetSearchValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!value) setSearchValue(undefined);
  };

  const tableProps: TableProps<any> = {
    ...(isTag &&
      tags === 'bottom' && {
        footer: () => (
          <TableTags
            selected={selectedMembers.map(({ id, name }) => ({ name, key: id }))}
            deselect={deselect}
            deselectAll={deselectAll}
          />
        ),
      }),
    pagination: {
      pageSize,
      total,
      position: ['bottomCenter'],
      showSizeChanger: false,
      onChange: setPage,
    },
  };

  useEffect(() => {
    _setSelectedMembers && _setSelectedMembers(selectedMembers);
  }, [selectedMembers]);

  return (
    <S.Container>
      {header && (
        <TableHeader
          searchInput={true}
          inputProps={{
            placeholder: '이름 검색',
            onChange: resetSearchValue,
            onSearch: searchMember,
          }}
        />
      )}
      {search && (
        <Input.Search placeholder='이름 검색' onChange={resetSearchValue} onSearch={searchMember} />
      )}
      {isTag && tags === 'top' && selectedMembers.length > 0 && (
        <S.TopTagsBox>
          <TableTags
            selected={selectedMembers.map(({ id, name }) => ({ name, key: id }))}
            deselect={deselect}
            deselectAll={deselectAll}
          />
        </S.TopTagsBox>
      )}
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedMembers.map(v => v.key),
          onSelect: select,
          onSelectAll: selectAll,
        }}
        {...tableProps}
      />
    </S.Container>
  );
}

export default MemberTable;
