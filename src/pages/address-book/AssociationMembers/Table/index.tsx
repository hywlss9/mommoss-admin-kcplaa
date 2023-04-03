import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Input, Table, Tooltip, message } from 'antd';
import type { ColumnsType, TableProps } from 'antd/lib/table';
import dayjs from 'dayjs';
import update from 'immutability-helper';

import useGetAssociationMembers from '@hooks/queries/group/useGetAssociationMembers';
import useGetPushCategories from '@hooks/queries/push/useGetPushCategories';

import TableHeader from '@components/TableHeader';
import TableTags from '@components/TableTags';

import * as S from './styled';
import type * as T from './type';

/**
 * props
 * * header: boolean - header + 검색창
 * * search: boolean - 단일 검색창
 * * isSelect: boolean - row 선택 유무
 * * tags: undefined | 'top' | 'bootom' - select 태그 표시
 * * blackList: string[] - 보이지 않을 속성
 */
function MemberTable({
  selectedMembers: _selectedMembers,
  setSelectedMembers: _setSelectedMembers,
  pageSize = 10,
  header = true,
  isSelect = false,
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
  const { data: pushCategories } = useGetPushCategories();

  const columnsData: ColumnsType<T.AssociationMembersData> = useMemo(() => {
    return [
      { title: '이름', dataIndex: 'name', key: 'name', render: (_, { name }) => name },
      {
        title: '기수',
        dataIndex: 'licenseCb',
        key: 'licenseCb',
        render: licenseCb => (licenseCb ? `${licenseCb}기` : '-'),
      },
      {
        title: '자격증번호',
        dataIndex: 'licenseNo',
        key: 'licenseNo',
        render: licenseNo => licenseNo ?? '-',
      },
      {
        title: '연락처',
        dataIndex: 'callNumber',
        key: 'callNumber',
        render: (_, { landline, phone, user }) => landline ?? phone ?? user?.phone ?? '-',
      },
      {
        title: '이메일',
        dataIndex: 'email',
        key: 'email',
        render: (_, { email }) => email ?? '-',
      },
      {
        title: '수신설정',
        dataIndex: 'receive',
        key: 'receive',
        render: (_, { user }) => {
          if (!user) return '-';
          const groupMember = user.groupMembers[0];
          const blockedCategories = groupMember.blockedCategories;
          const isBlockCategories = pushCategories.filter(
            v => !blockedCategories.map(v => v.id).includes(v.id),
          );
          const receiveCategoryNames = isBlockCategories.map(v => v.name).join(', ');

          return (
            <Tooltip title={receiveCategoryNames}>
              {pushCategories.length - blockedCategories.length}개
            </Tooltip>
          );
        },
      },
      {
        title: '이용상태',
        dataIndex: 'useMommoss',
        key: 'useMommoss',
        render: useMommoss => (useMommoss ? '사용' : '미사용'),
      },
      {
        title: '최근접속',
        dataIndex: 'lastActivatedAt',
        key: 'lastActivatedAt',
        render: (_, { user }) => {
          if (!user) return '-';

          const { lastActivatedAt } = user;
          return lastActivatedAt ? dayjs(lastActivatedAt).format('YYYY-MM-DD HH:mm') : '-';
        },
      },
    ];
  }, [pushCategories]);

  const columns = useMemo(() => {
    if (!blackList || !blackList.length) return columnsData;

    return columnsData.filter(data => {
      if (!data.key) return false;
      return !blackList.includes(String(data.key));
    });
  }, [blackList, pushCategories]);

  const dataSource: T.AssociationMembersDataSource = useMemo(() => {
    return members.map(v => ({ ...v, key: v.id }));
  }, [members]);

  const isTag = typeof tags !== 'undefined';

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
    setPage(1);
    setSearchValue(value.length > 1 ? value : undefined);
  };

  const resetSearchValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!value && searchValue) {
      setPage(1);
      setSearchValue(undefined);
    }
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
    ...(isSelect && {
      rowSelection: {
        type: 'checkbox',
        selectedRowKeys: selectedMembers.map(v => v.key),
        onSelect: select,
        onSelectAll: selectAll,
      },
    }),
    pagination: {
      pageSize,
      total,
      current: page,
      position: ['bottomCenter'],
      showSizeChanger: false,
      onChange: setPage,
    },
  };

  useEffect(() => {
    _setSelectedMembers && _setSelectedMembers(selectedMembers);
  }, [selectedMembers]);

  return (
    <S.Container search={search}>
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
      <Table columns={columns} dataSource={dataSource} loading={isLoading} {...tableProps} />
    </S.Container>
  );
}

export default MemberTable;
