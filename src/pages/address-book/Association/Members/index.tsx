import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Button, Input, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import { deleteAssociationMembers, getAssociationDetail } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { off, on } from '@utils/globalEvents';

import TableHeader from '@components/TableHeader';
import TableTags from '@components/TableTags';
import Text from '@components/Text';

import { ReactComponent as Cog } from '@assets/icons/cog.svg';

import type { GetAssociationDetailResponse } from '@type/group';

import * as S from './styled';
import type * as T from './type';

function AssociationMemberTable({ associationId }: T.AssociationMemberTableProps) {
  const dispatch = useDispatch();

  const [association, setAssociation] = useState<GetAssociationDetailResponse | undefined>();
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<T.MemberTableDataSource>([]);

  const columns: ColumnsType<T.MemberTableData> = [
    {
      dataIndex: 'id',
      title: '아이디',
      render: (_, { user }) => user?.account?.id || '',
    },
    {
      dataIndex: 'name',
      title: '이름',
      render: (_, { user }) => user?.name || '',
    },
    {
      dataIndex: 'phone',
      title: '휴대폰번호',
      render: (_, { user }) => user?.phone || '',
    },
    {
      dataIndex: 'status',
      title: '상태',
      render: () => {
        return '사용';
      },
    },
  ];

  const dataSource: T.MemberTableDataSource = useMemo(() => {
    if (typeof association === 'undefined' || !association.groupMembers?.length) return [];
    return (
      association.groupMembers
        // @ts-ignore
        .filter(v => (searchValue ? v.user.name.includes(searchValue) : true))
        .map(v => ({ ...v, key: v.id }))
    );
  }, [association, searchValue]);

  const _getAssociationDetail = async () => {
    if (typeof associationId === 'undefined') return;

    const response = await getAssociationDetail({ path: { teamId: associationId } });

    if (getIsResponseFalse(response)) {
      message.error('그룹 정보를 불러오는데 실패했습니다.');
      return false;
    }

    setAssociation(response);

    return true;
  };

  const refreshAssociationDetail = async () => {
    setSearchValue('');
    const response = await _getAssociationDetail();
    if (response) message.success('새로고침 되었습니다.');
  };

  const handleSearchText = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!value && searchValue) {
      setPage(1);
      setSearchValue('');
    }
  };

  const search = (value: string) => {
    if (value.length < 2) {
      message.info('검색어는 2글자 이상이어야 합니다.');
      return false;
    }
    setPage(1);
    setSearchValue(value);
  };

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

  const selectAll = (selected: boolean, data: T.MemberTableDataSource) => {
    setSelectedMembers(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const deselect = (id: T.MemberTableData['id']) => {
    setSelectedMembers(prevState => {
      const findIndex = prevState.findIndex(v => v.id === id);
      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const deselectAll = () => setSelectedMembers([]);

  const releaseMembers = async () => {
    if (!association) return false;

    if (!selectedMembers.length) {
      message.warning('멤버를 선택해주세요.');
      return false;
    }

    const memberIds = selectedMembers.map(({ id }) => id);

    const response = await deleteAssociationMembers({
      path: { teamId: association.id },
      data: { memberIds },
    });

    if (getIsResponseFalse(response)) {
      message.error('멤버 삭제에 실패했습니다.');
      return false;
    }

    setSelectedMembers([]);
    message.success('멤버가 팀에서 삭제되었습니다.');
    _getAssociationDetail();
  };

  const openCreateMemberModal = () =>
    dispatch(openModal({ name: 'createAssociationMembers', props: { associationId } }));

  const openMoveMembersModal = () => {
    if (typeof associationId === 'undefined') return false;

    if (!selectedMembers.length) {
      message.warning({ key: 'empty-selected-members', content: '멤버를 선택해주세요.' });
      return false;
    }

    dispatch(
      openModal({
        name: 'moveAssociationMembers',
        props: { selectedMembers, exitGroupId: associationId },
      }),
    );
  };

  useEffect(() => {
    setSelectedMembers([]);
    _getAssociationDetail();
  }, [associationId]);

  useEffect(() => {
    on('SUCCESS_CREATE_ASSOCIATION_MEMBERS', _getAssociationDetail);
    on('SUCCESS_MOVE_ASSOCIATION_MEMBERS', _getAssociationDetail);
    return () => {
      off('SUCCESS_CREATE_ASSOCIATION_MEMBERS', _getAssociationDetail);
      off('SUCCESS_MOVE_ASSOCIATION_MEMBERS', _getAssociationDetail);
    };
  }, [_getAssociationDetail]);

  if (typeof associationId === 'undefined' || !association) {
    return <></>;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <Text size={16} weight={700}>
            {association.name}
            {/* ({association.groupMembers?.length}) */}
          </Text>
          <Cog />
        </S.Title>
        <Input.Search
          placeholder='구성원 이름 검색'
          onChange={handleSearchText}
          onSearch={search}
        />
      </S.Header>
      <TableHeader
        buttons={[
          { text: '다른 그룹으로 이동', buttonProps: { onClick: openMoveMembersModal } },
          { text: '삭제', border: true, buttonProps: { onClick: releaseMembers } },
          { text: '새로고침', buttonProps: { onClick: refreshAssociationDetail } },
        ]}
      />
      <Table
        className='table-content-box'
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedMembers.map(v => v.key),
          onSelect: select,
          onSelectAll: selectAll,
        }}
        pagination={{
          current: page,
          pageSize: 8,
          position: ['bottomCenter'],
          total: dataSource.length,
          showSizeChanger: false,
          onChange: setPage,
        }}
        footer={() => (
          <TableTags
            selected={selectedMembers.map(({ id, user }) => ({ key: id, name: user?.name || '' }))}
            deselect={deselect}
            deselectAll={deselectAll}
          />
        )}
      />
      <S.CreateMemberBtnBox>
        <Button type='primary' onClick={openCreateMemberModal}>
          구성원 추가
        </Button>
      </S.CreateMemberBtnBox>
    </S.Container>
  );
}

export default AssociationMemberTable;
