import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';

import { Modal, Switch, Table, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import { closeModal, openModal } from '@reduce/modals';

import useGetPushCategories from '@hooks/queries/push/useGetPushCategories';

import { updatePushCategory } from '@api/push/updatePushCategory';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { off, on } from '@utils/globalEvents';

import TableHeader from '@components/TableHeader';
import Text from '@components/Text';

import type { AntdTableDataSource } from '@type/antd-table';
import type { PushCategory } from '@type/push';

import * as S from './styled';

const columns: ColumnsType<PushCategory> = [{ title: '카테고리명', dataIndex: 'name' }];

function EditPushCategoryModal() {
  const dispatch = useDispatch();

  const { data: pushCategoris, isLoading, refetch } = useGetPushCategories();

  const [selectedCategory, setSelectedCategory] = useState<PushCategory[]>([]);

  const dataSource: AntdTableDataSource<PushCategory> = useMemo(() => {
    return pushCategoris.map(v => ({ ...v, key: v.id }));
  }, [pushCategoris]);

  const editColumns = useMemo(() => {
    return columns.map(data => {
      return {
        ...data,
        render: (_: any, { id, name, unused, default: isDefault }: PushCategory) => {
          const toggleIsBlock = async () => {
            const response = await updatePushCategory({
              path: { categoryId: id },
              data: { unused: !unused },
            });

            if (getIsResponseFalse(response)) {
              message.error('카테고리 상태 변경에 실패했습니다. 다시 시도해주세요.');
              return false;
            }

            message.success(
              <>
                <strong>{name}</strong> 카테고리가 <strong>{unused ? '활성화' : '비활성화'}</strong>{' '}
                되었습니다.
              </>,
            );
            refetch();
          };

          return (
            <S.Row>
              <Text>{name}</Text>
              {!isDefault && <Switch checked={!unused} onChange={toggleIsBlock} />}
            </S.Row>
          );
        },
      };
    });
  }, [pushCategoris]);

  const select = (data: PushCategory, selected: boolean) => {
    console.log({ data, selected });
    setSelectedCategory(prevState => {
      if (selected) return [...prevState, data];

      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const selectAll = (selected: boolean, data: PushCategory[]) => {
    setSelectedCategory(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const openCreateNoticeCategoryModal = () => dispatch(openModal({ name: 'createPushCategory' }));

  const handleCheckedIsBlock = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!selectedCategory.length) {
      message.warning({ key: 'not-selected-category', content: '카테코리를 선택해주세요.' });
      return;
    }

    const unused = e.currentTarget.name === 'disabled';

    for await (const category of selectedCategory) {
      const { id, name, default: isDefault } = category;

      if (isDefault) {
        message.success(
          <>
            <strong>{name}</strong> 카테고리는 수정할 수 없는 기본 카테고리 입니다.
          </>,
        );
        continue;
      }

      await updatePushCategory({ path: { categoryId: id }, data: { unused } });

      message.success(
        <>
          <strong>{name}</strong> 카테고리가 <strong>{unused ? '비활성화' : '활성화'}</strong>{' '}
          되었습니다.
        </>,
      );
    }

    refetch();
  };

  const close = () => dispatch(closeModal('editCategory'));

  useEffect(() => {
    on('CREATED_PUSH_CATEGORY', refetch);

    return () => {
      off('CREATED_PUSH_CATEGORY', refetch);
    };
  }, []);

  return (
    <Modal
      open={true}
      className='is-content-header'
      title='카테고리 편집'
      width='800px'
      footer={null}
      onCancel={close}>
      <TableHeader
        buttons={[
          { text: '활성화', buttonProps: { name: 'abled', onClick: handleCheckedIsBlock } },
          { text: '비활성화', buttonProps: { name: 'disabled', onClick: handleCheckedIsBlock } },
        ]}
        rightButtons={[{ text: '생성', buttonProps: { onClick: openCreateNoticeCategoryModal } }]}
      />
      <Table
        columns={editColumns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={false}
        sticky={true}
        scroll={{ y: 400 }}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedCategory.map(v => v.id),
          onSelect: select,
          onSelectAll: selectAll,
        }}
      />
    </Modal>
  );
}

export default EditPushCategoryModal;
