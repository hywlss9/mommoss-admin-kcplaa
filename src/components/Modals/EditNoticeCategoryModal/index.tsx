import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Modal, Table, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import { closeModal, openModal } from '@reduce/modals';

import useGetNoticeCategories from '@hooks/queries/notice/useGetNoticeCategories';

import { deleteNoticeCategory } from '@api/notice';

import { off, on } from '@utils/globalEvents';

import TableHeader from '@components/TableHeader';
import Text from '@components/Text';

import { ReactComponent as Trash } from '@assets/icons/trash.svg';

import type { AntdTableDataSource } from '@type/antd-table';
import type { NoticeCategory } from '@type/notice';

import * as S from './styled';

function EditNoticeCategoryModal() {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory[]>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const { data: noticeCategories, isLoading, refetch } = useGetNoticeCategories({ q: searchValue });

  const columns: ColumnsType<NoticeCategory> = useMemo(() => {
    return [
      {
        key: 'name',
        title: '카테고리명',
        dataIndex: 'name',
        render: (text: string, { id }: NoticeCategory) => {
          const handleDeleteCategory = async () => {
            try {
              await deleteNoticeCategory({ path: { noticeCategoryId: id } });

              message.success('공지 카테고리가 삭제되었습니다.');
              refetch();
            } catch (error) {
              console.log({ error });
            }
          };

          return (
            <S.RowBox>
              <Text>{text}</Text>
              <S.ButtonBox>
                <button onClick={handleDeleteCategory}>
                  <Trash />
                </button>
              </S.ButtonBox>
            </S.RowBox>
          );
        },
      },
    ];
  }, [noticeCategories]);

  const dataSource: AntdTableDataSource<NoticeCategory> = useMemo(() => {
    return noticeCategories.map(v => ({ ...v, key: v.id }));
  }, [noticeCategories]);

  const select = (data: NoticeCategory, selected: boolean) => {
    setSelectedCategory(prevState => {
      if (selected) return [...prevState, data];

      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const selectAll = (selected: boolean, data: NoticeCategory[]) => {
    setSelectedCategory(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const handleCheckedDelete = async () => {
    if (!selectedCategory.length) {
      message.warning({ key: 'not-selected-category', content: '카테코리를 선택해주세요.' });
      return;
    }
    console.log({ selectedCategory });

    for await (const category of selectedCategory) {
      try {
        await deleteNoticeCategory({ path: { noticeCategoryId: category.id } });
      } catch (error) {
        console.log({ error });
      }
    }

    message.success('삭제되었습니다.');
    refetch();
  };

  const handleSearchText = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!value) setSearchValue(undefined);
  };

  const search = (value: string) => {
    if (value.length < 2) {
      message.info('검색어는 2글자 이상이어야 합니다.');
      return false;
    }

    setSearchValue(value.length > 1 ? value : undefined);
  };

  const close = () => dispatch(closeModal('createNoticeCategory'));

  const openCreateNoticeCategoryModal = () => dispatch(openModal({ name: 'createNoticeCategory' }));

  useEffect(() => {
    on('CREATED_NOTICE_CATEGORY', refetch);

    return () => {
      off('CREATED_NOTICE_CATEGORY', refetch);
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
          { text: '삭제', buttonProps: { name: 'delete', onClick: handleCheckedDelete } },
          { text: '추가', buttonProps: { name: 'create', onClick: openCreateNoticeCategoryModal } },
        ]}
        searchInput={true}
        inputProps={{
          placeholder: '카테고리명 검색',
          onChange: handleSearchText,
          onSearch: search,
        }}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={false}
        sticky={true}
        scroll={{ y: 460 }}
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

export default EditNoticeCategoryModal;
