import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Button, Input, Modal, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import update from 'immutability-helper';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@reduce';
import { closeModal } from '@reduce/modals';

import useGetAssociationMembers from '@hooks/queries/group/useGetAssociationMembers';

import { createAssociationMembers } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import type {
  AssociationMembersData,
  AssociationMembersDataSource,
} from '@pages/address-book/AssociationMembers/Table/type';

import type * as T from './type';

const PAGE_SIZE: number = 7;

function CreateAssociationMembersModal({ associationId }: T.CreateAssociationMembersModalProps) {
  const { groupInfo } = useSelector((state: RootState) => state.group);
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [selectedMembers, setSelectedMembers] = useState<AssociationMembersDataSource>([]);

  const {
    data: associationMembers,
    total,
    isLoading,
  } = useGetAssociationMembers({ page, limit: PAGE_SIZE, q: searchValue });

  const columns: ColumnsType<AssociationMembersData> = useMemo(() => {
    return [
      {
        dataIndex: 'name',
        title: '이름',
        // @ts-ignore
        render: name => name,
      },
      // {
      //   dataIndex: 'phone',
      //   title: '휴대폰번호',
      // },
      {
        dataIndex: 'status',
        title: '상태',
        render: () => {
          return '사용';
        },
      },
    ];
  }, [associationMembers]);

  const dataSource: AssociationMembersDataSource = useMemo(() => {
    return associationMembers.map(v => ({ ...v, key: v.id }));
  }, [associationMembers]);

  const handleSearchText = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!value && searchValue) {
      setPage(1);
      setSearchValue(undefined);
    }
  };

  const search = (value: string) => {
    if (value.length < 2) {
      message.info('검색어는 2글자 이상이어야 합니다.');
      return false;
    }

    setPage(1);
    setSearchValue(value.length > 1 ? value : undefined);
  };

  const select = (data: AssociationMembersData, selected: boolean) => {
    setSelectedMembers(prevState => {
      if (selected) return [...prevState, data];
      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const selectAll = (selected: boolean, data: AssociationMembersDataSource) => {
    setSelectedMembers(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const create = async () => {
    let memberIds: number[] = [];
    let kcplaaMemberIds: number[] = [];
    console.log({ selectedMembers });
    selectedMembers.forEach(member => {
      if (member.user) {
        // @ts-ignore
        const memberId = member.user.groupMembers.find(
          // @ts-ignore
          member => member?.groupId === groupInfo?.id,
        ).id;
        memberIds.push(memberId);
      } else {
        kcplaaMemberIds.push(member.id);
      }
    });
    console.log({ memberIds, kcplaaMemberIds });
    // user가있으면 memberIds 없으면 노무사
    const response = await createAssociationMembers({
      path: { teamId: associationId },
      data: { memberIds, kcplaaMemberIds },
    });

    if (getIsResponseFalse(response)) return false;

    message.success('회원 그룹에 멤버를 추가했습니다.');
    trigger('SUCCESS_CREATE_ASSOCIATION_MEMBERS');
    close();
  };

  const close = () => dispatch(closeModal('createAssociationMembers'));

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='send' type='primary' onClick={create}>
      추가
    </Button>,
  ];

  return (
    <Modal open={true} title='그룹 회원 추가' footer={footerBtns} width='800px' onCancel={close}>
      <Input.Search
        placeholder='회원 이름 검색.'
        onChange={handleSearchText}
        onSearch={search}
        style={{ marginBottom: '24px' }}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        sticky={true}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedMembers.map(v => v.id),
          onSelect: select,
          onSelectAll: selectAll,
        }}
        pagination={{
          total,
          current: page,
          pageSize: PAGE_SIZE,
          position: ['bottomCenter'],
          showSizeChanger: false,
          onChange: setPage,
        }}
      />
    </Modal>
  );
}

export default CreateAssociationMembersModal;
