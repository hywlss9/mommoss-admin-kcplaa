import { useEffect, useMemo, useState } from 'react';

import { Modal, Space, Table, Tooltip, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useGetGroupMembers from '@hooks/queries/group/useGetGroupMembers';

import { updateMember } from '@api/group';

import { off, on } from '@utils/globalEvents';

import TableHeader from '@components/TableHeader';
import TableTags from '@components/TableTags';
import Text from '@components/Text';

import type { MemberData } from '@type/group';
import type { Get } from '@type/util';

import * as S from './styled';
import type * as T from './type';

const PAGE_SIZE: number = 10;

function AdminTable() {
  const [page, setPage] = useState<number>(1);

  const {
    data: members,
    isLoading,
    refetch,
  } = useGetGroupMembers({ page, type: 'organization', limit: PAGE_SIZE });

  const dispatch = useDispatch();

  const [selectedAdmins, setSelectedAdmins] = useState<T.AdminTableDataSource>([]);

  const columns: ColumnsType<Get<T.AdminTableDataSource>> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '이름',
      render: (_, { user }) => user?.name || '',
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: '아이디',
      render: (_, { user }) => {
        // @ts-ignore
        return <>{user?.account?.id || '-'}</>;
      },
    },
    {
      key: 'roles',
      dataIndex: 'roles',
      title: '접근 가능 메뉴',
      render: (data: MemberData['roles']) => {
        return (
          <Tooltip placement='bottom' title={<>{data.map(v => v.name).join(', ')}</>}>
            {data.length}개
          </Tooltip>
        );
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '상태',
      render: data => {
        return data === 0 ? '미사용' : '사용';
      },
    },
    {
      key: 'recent-connections',
      dataIndex: 'recent-connections',
      title: '최근접속',
      render: data => {
        return data ? dayjs(new Date()).format('YYYY-MM-DD HH:mm') : '미접속';
      },
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: '권한',
      render: (_, record) => {
        const { id } = record;

        const openUpdateAdminModal = () =>
          dispatch(
            openModal({
              name: 'updateAdmin',
              props: { admin: record },
            }),
          );

        const handleDeleteAdmin = () => {
          Modal.confirm({
            title: '정말로 관리자를 해제하시겠습니까?',
            okText: '삭제',
            cancelText: '취소',
            onOk: async () => {
              console.log('OK');
              await updateMember({
                path: { groupMemberId: id },
                data: { roleIds: [] },
              });

              refetch();
              message.success('관리자가 해제되었습니다.');
            },
            onCancel: () => {
              console.log('Cancel');
            },
          });
        };

        return (
          <S.RoleBox>
            <Space>
              <Text underline={true} cursor='pointer' onClick={openUpdateAdminModal}>
                수정
              </Text>
              <Text underline={true} cursor='pointer' onClick={handleDeleteAdmin}>
                해제
              </Text>
            </Space>
          </S.RoleBox>
        );
      },
    },
  ];

  const dataSource: T.AdminTableDataSource = useMemo(() => {
    return members
      .filter(({ roles }) =>
        roles.map(({ name }) => name === '관리자' || name === '최고 관리자').includes(true),
      )
      .map(v => ({ ...v, key: v.id }));
  }, [members]);

  const select = (data: Get<T.AdminTableDataSource>, selected: boolean) => {
    setSelectedAdmins(prevState => {
      if (selected) return [...prevState, data];

      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };
  const selectAll = (selected: boolean, data: T.AdminTableDataSource) => {
    setSelectedAdmins(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const deselect = (id: MemberData['id'] | number) => {
    setSelectedAdmins(prevState => {
      const findIndex = prevState.findIndex(v => v.id === id);
      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };
  const deselectAll = () => setSelectedAdmins([]);

  const handleDeleteAdmin = async () => {
    if (!selectedAdmins.length) {
      message.warning({ key: 'not-selected-admins', content: '관리자를 선택해주세요.' });
      return;
    }

    for await (const admin of selectedAdmins) {
      await updateMember({
        path: { groupMemberId: admin.id },
        data: { roleIds: [] },
      });
    }

    setSelectedAdmins([]);
    refetch();
    message.success('관리자를 삭제하였습니다.');
  };

  const openCreateAdminModal = () => {
    dispatch(openModal({ name: 'createAdmins' }));
  };

  useEffect(() => {
    on('SUCCESS_UPDATE_ADMIN', refetch);
    on('SUCCESS_CREATE_ADMIN', refetch);
    return () => {
      off('SUCCESS_UPDATE_ADMIN', refetch);
      off('SUCCESS_CREATE_ADMIN', refetch);
    };
  }, []);

  return (
    <>
      <TableHeader
        buttons={[{ text: '삭제', buttonProps: { onClick: handleDeleteAdmin } }]}
        rightButtons={[
          { text: '관리자 추가', buttonProps: { type: 'primary', onClick: openCreateAdminModal } },
        ]}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{
          position: ['bottomCenter'],
          total: dataSource.length,
          showSizeChanger: false,
          onChange: setPage,
          pageSize: PAGE_SIZE,
        }}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedAdmins.map(v => v.key),
          onSelect: select,
          onSelectAll: selectAll,
        }}
        footer={() => (
          <TableTags
            selected={selectedAdmins.map(({ id, user }) => ({ key: id, name: user?.name || '' }))}
            deselect={deselect}
            deselectAll={deselectAll}
          />
        )}
      />
    </>
  );
}

export default AdminTable;
