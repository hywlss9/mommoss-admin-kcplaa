import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Input, Modal, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import useGetAssociation from '@hooks/queries/group/useGetAssociation';

import { deleteAssociation } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { off, on } from '@utils/globalEvents';

import Text from '@components/Text';

import { ReactComponent as Trash } from '@assets/icons/trash.svg';

import type { AssociationTableData, AssociationTableDataSource } from '@type/group';

import * as S from './styled';
import type * as T from './type';

const PAGE_SIZE: number = 8;

function AssociationGroupTable({
  selectAssociationId,
  isMoveSelection,
  moveGroupSelect,
}: T.AssociationGroupTableProps) {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const {
    data: association,
    isLoading,
    refetch,
  } = useGetAssociation({ page, q: searchValue, limit: PAGE_SIZE });

  const columns: ColumnsType<AssociationTableData> = [
    {
      dataIndex: 'name',
      title: '그룹명',
      render: (_, { id, name }) => {
        const select = () => selectAssociationId(id);

        const handleDeleteAssociationModal = (e: MouseEvent) => {
          e.stopPropagation();
          openDeleteAssociationModal(id, name);
        };

        return (
          <S.GroupTitleBox onClick={select}>
            <Text cursor='pointer'>{name}</Text>
            <Trash onClick={handleDeleteAssociationModal} />
          </S.GroupTitleBox>
        );
      },
    },
  ];

  const dataSource: AssociationTableDataSource = useMemo(() => {
    return association.map(v => ({ ...v, key: v.id }));
  }, [association]);

  const searchOrg = (value: string) => {
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

  const openDeleteAssociationModal = (id: number, name: string) => {
    Modal.confirm({
      title: `[${name}] 회원 그룹을 삭제하시겠습니까?`,
      okText: '삭제',
      cancelText: '취소',
      onOk: async () => {
        const response = await deleteAssociation({ path: { teamId: id } });

        if (getIsResponseFalse(response)) return false;

        selectAssociationId(undefined);
        refetch();

        message.success(
          <>
            <strong>{name}</strong> 회원 그룹이 삭제되었습니다.
          </>,
        );
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    on('SUCCESS_CREATE_ASSOCIATION', refetch);
    return () => {
      off('SUCCESS_CREATE_ASSOCIATION', refetch);
    };
  }, []);

  return (
    <S.Container>
      <Input.Search placeholder='발송 그룹 검색' onChange={resetSearchValue} onSearch={searchOrg} />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          position: ['bottomCenter'],
          total: dataSource.length,
          showSizeChanger: false,
          onChange: setPage,
        }}
        {...(isMoveSelection && {
          rowSelection: {
            type: 'radio',
            onSelect: moveGroupSelect,
          },
        })}
      />
    </S.Container>
  );
}

export default AssociationGroupTable;
