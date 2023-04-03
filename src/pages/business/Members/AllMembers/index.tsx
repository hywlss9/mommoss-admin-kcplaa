import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Input, Modal, Table, message } from 'antd';
import type { ColumnsType, TableProps } from 'antd/lib/table';
import dayjs from 'dayjs';
import update from 'immutability-helper';

import useGetGroupMembers from '@hooks/queries/group/useGetGroupMembers';

import { deleteMember } from '@api/group';

import { off, on } from '@utils/globalEvents';

import TableHeader from '@components/TableHeader';
import TableTags from '@components/TableTags';

import * as S from './styled';
import type * as T from './type';

//TODO: user berforlogined

const columnsData: ColumnsType<T.MemberTableData> = [
  {
    title: '아이디',
    dataIndex: 'id',
    key: 'id',
    render: (_, { user }) => {
      return user?.accountId || '-';
    },
  },
  { title: '이름', dataIndex: 'name', key: 'name', render: (_, { user }) => user?.name || '-' },
  {
    title: '소속',
    dataIndex: 'organization',
    key: 'organization',
    render: (_, { teams }) => (teams.length ? teams[0].name : '-'),
  },
  {
    title: '역할',
    dataIndex: 'role',
    key: 'role',
    render: (_, { roles }) => {
      return !!roles.length ? roles[0].name : '-';
    },
  },
  {
    title: '이메일',
    dataIndex: 'email',
    render: (_, { user }) => user?.email || '-',
  },
  // {
  //   title: '상태',
  //   dataIndex: 'status',
  //   render: () => {
  //     return '미접속';
  //   },
  // },
  {
    title: '최근접속',
    dataIndex: 'lastActivatedAt',
    // @ts-ignore
    render: (_, { user }) =>
      user?.lastActivatedAt ? dayjs(user.lastActivatedAt).format('YYYY-MM-DD HH:mm:ss') : '-',
  },
];

/**
 * props
 * * pageSize: number - row 개수
 * * header: boolean - header + 검색창
 * * search: boolean - 단일 검색창
 * * tags: undefined | 'top' | 'bootom' - select 태그 표시
 * * blackList: string[] - 보이지 않을 속성
 */
function AllMembers({
  selectedMembers: _selectedMembers,
  setSelectedMembers: _setSelectedMembers,
  header = true,
  pageSize = 10,
  search,
  tags,
  blackList,
}: T.MemberTableProps) {
  const [selectedMembers, setSelectedMembers] = useState<T.MemberTableData[]>(
    _selectedMembers || [],
  );
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const {
    data: members,
    isLoading,
    refetch,
  } = useGetGroupMembers({ type: 'organization', q: searchValue, limit: pageSize });

  const columns = useMemo(() => {
    if (!blackList || !blackList.length) return columnsData;

    return columnsData.filter(data => {
      if (!data.key) return false;
      return !blackList.includes(String(data.key));
    });
  }, [blackList]);

  const dataSource: T.MemberTableDataSource = useMemo(() => {
    return members.map(v => ({ ...v, key: v.id }));
  }, [members]);

  const isTag = useMemo(() => typeof tags !== 'undefined', [tags]);

  const select = (data: T.MemberTableData, selected: boolean) => {
    setSelectedMembers(prevState => {
      if (selected) return [...prevState, data];
      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const deselect = (id: T.MemberTableData['id'] | number) => {
    setSelectedMembers(prevState => {
      const findIndex = prevState.findIndex(v => v.id === id);
      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const selectAll = (selected: boolean, data: T.MemberTableData[]) => {
    setSelectedMembers(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const deselectAll = () => setSelectedMembers([]);

  const handleDeleteMembers = () => {
    if (!selectedMembers.length) {
      message.warning({ key: 'not-selected-members', content: '구성원을 선택해주세요.' });
      return;
    }

    Modal.confirm({
      title: '정말로 구성원을 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      onOk: async () => {
        console.log('OK');
        for await (const member of selectedMembers) {
          await deleteMember({ path: { groupMemberId: member.id } });
        }

        setSelectedMembers([]);
        refetch();
        message.success('구성원이 삭제되었습니다.');
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  };

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
            selected={selectedMembers.map(({ id, user }) => ({ name: user?.name || '', key: id }))}
            deselect={deselect}
            deselectAll={deselectAll}
          />
        ),
      }),
    pagination: {
      pageSize,
      position: ['bottomCenter'],
      total: members.length,
      showSizeChanger: false,
    },
  };

  useEffect(() => {
    _setSelectedMembers && _setSelectedMembers(selectedMembers);
  }, [selectedMembers]);

  useEffect(() => {
    on('SUCCESS_CREATE_MEMBER', refetch);
    on('SUCCESS_CREATE_MEMBERS', refetch);
    return () => {
      off('SUCCESS_CREATE_MEMBER', refetch);
      off('SUCCESS_CREATE_MEMBERS', refetch);
    };
  }, []);

  if (!members) return <>구성원을 불러오는 중 입니다.</>;

  return (
    <S.Container>
      {header && (
        <TableHeader
          buttons={[{ text: '삭제', buttonProps: { onClick: handleDeleteMembers } }]}
          searchInput={true}
          inputProps={{
            placeholder: '이름 검색',
            onChange: resetSearchValue,
            onSearch: searchMember,
          }}
        />
      )}
      {search && <Input.Search placeholder='이름 검색' />}
      {isTag && tags === 'top' && selectedMembers.length > 0 && (
        <S.TopTagsBox>
          <TableTags
            selected={selectedMembers.map(({ id, user }) => ({ name: user?.name || '', key: id }))}
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

export default AllMembers;
