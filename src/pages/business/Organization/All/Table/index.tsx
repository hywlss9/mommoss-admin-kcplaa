import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Button, Input, Popover, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import { deleteOrganizationMember, getOrganizationDetail } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { off, on, trigger } from '@utils/globalEvents';

import TableHeader from '@components/TableHeader';
import Text from '@components/Text';

import { ReactComponent as Cog } from '@assets/icons/cog.svg';

import type { GetOrganizationDetailResponse } from '@type/group';

import PositionSelect from './PositionSelect';
import * as S from './styled';
import type * as T from './type';

function OrganiztionMemberTable({ selectedOrganizationId }: T.OrganiztionMemberTableProps) {
  const dispatch = useDispatch();

  const [org, setOrg] = useState<GetOrganizationDetailResponse | undefined>();
  const [selectedMembers, setSelectedMembers] = useState<T.MemberTableDataSource>([]);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');

  const columns: ColumnsType<T.MemberTableData> = [
    {
      dataIndex: 'id',
      title: '아이디',
      // render: (_, { account: { id } }) => {
      //   return id;
      // },
    },
    {
      dataIndex: 'name',
      title: '이름',
      render: (_, record) => {
        // @ts-ignore
        return record?.user?.name;
      },
    },
    {
      dataIndex: 'position',
      title: '직위',
      render: (position, { positionId, userId }) => {
        return (
          <Popover
            overlayClassName='no-padding-popover'
            trigger='click'
            placement='bottomLeft'
            overlayInnerStyle={{ padding: '8px 12px' }}
            content={<PositionSelect memberId={userId} refresh={getOrgDetail} />}>
            <Text block={false} underline={true} cursor='pointer'>
              {typeof positionId === 'number' ? position.name : '없음'}
            </Text>
          </Popover>
        );
      },
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
    if (typeof org === 'undefined' || !org.groupMembers?.length) return [];
    return (
      org.groupMembers
        // @ts-ignore
        .filter(v => (searchValue ? v.user.name.includes(searchValue) : true))
        .map(v => ({ ...v, key: v.id }))
    );
  }, [org, searchValue]);

  const getOrgDetail = async () => {
    if (typeof selectedOrganizationId === 'undefined') return;

    const response = await getOrganizationDetail({ path: { teamId: selectedOrganizationId } });

    if (getIsResponseFalse(response)) {
      message.error('조직도 정보를 불러오는데 실패했습니다. 다시 시도해주세요.');
      return false;
    }

    setOrg(response);
    return true;
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

  const openMoveMembersModal = () => {
    if (!selectedMembers.length) {
      message.warning({ key: 'empty-selected-members', content: '멤버를 선택해주세요.' });
      return false;
    }

    dispatch(openModal({ name: 'moveOrganizationMembers', props: { selectedMembers } }));
  };

  const deleteMembers = async () => {
    if (!org) return false;

    if (!selectedMembers.length) {
      message.warning('멤버를 선택해주세요.');
      return false;
    }

    const memberIds = selectedMembers.map(({ id }) => id);

    const response = await deleteOrganizationMember({
      path: { teamId: org.id },
      data: { memberIds },
    });

    if (getIsResponseFalse(response)) {
      message.error('멤버 삭제에 실패했습니다. 다시 시도해주세요.');
      return false;
    }

    message.success('멤버가 팀에서 삭제되었습니다.');
    trigger('RELEASE_ORGANIZATION_MEMBER');
    getOrgDetail();
  };

  const refreshOrgDetail = async () => {
    const response = await getOrgDetail();
    if (response) message.success('새로고침 되었습니다.');
  };

  useEffect(() => {
    getOrgDetail();
  }, [selectedOrganizationId]);

  useEffect(() => {
    on('SUCCESS_MOVE_ORGANIZATION_MEMBERS', getOrgDetail);
    on('SUCCESS_UPDATE_ORGANIZATION_NAME', getOrgDetail);
    return () => {
      off('SUCCESS_MOVE_ORGANIZATION_MEMBERS', getOrgDetail);
      off('SUCCESS_UPDATE_ORGANIZATION_NAME', getOrgDetail);
    };
  }, [getOrgDetail]);

  if (typeof selectedOrganizationId === 'undefined' || !org) {
    return <></>;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <Text size={16} weight={700}>
            {org.name}({org.groupMembers?.length})
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
          { text: '다른 조직으로 이동', buttonProps: { onClick: openMoveMembersModal } },
          { text: '삭제', border: true, buttonProps: { onClick: deleteMembers } },
          { text: '새로고침', buttonProps: { onClick: refreshOrgDetail } },
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
          pageSize: 10,
          position: ['bottomCenter'],
          total: dataSource.length,
          showSizeChanger: false,
        }}
      />
    </S.Container>
  );
}

export default OrganiztionMemberTable;
