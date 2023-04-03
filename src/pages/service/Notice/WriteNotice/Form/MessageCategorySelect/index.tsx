import { useMemo, useState } from 'react';

import { AutoComplete, Button, Form } from 'antd';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useGetNoticeCategories from '@hooks/queries/notice/useGetNoticeCategories';

import * as C from '@components/Common';

import type { NoticeCategory } from '@type/notice';

import type * as T from './type';

function MessageCategorySelect({ categoryId, setCategory: _setCategory }: T.MessageTypeProps) {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string | undefined>();

  const { data: noticeCategories } = useGetNoticeCategories({
    q: typeof searchValue === 'string' && searchValue.length < 2 ? undefined : searchValue,
  });

  const categoryName: string = useMemo(() => {
    return noticeCategories.find(category => category && category.id === categoryId)?.name || '';
  }, [categoryId, noticeCategories]);

  const select = (id: string) => {
    if (!noticeCategories) return;

    console.log({ id });
    const findData = noticeCategories.find(v => v.id === (Number(id) as NoticeCategory['id']));
    if (!findData) return;

    _setCategory(findData);
    setSearchValue(findData.name);
  };

  const openEditNoticeCatogoryModal = () => dispatch(openModal({ name: 'editNoticeCategory' }));

  if (!noticeCategories) return <></>;

  return (
    <>
      <Form.Item label='카테고리' className='formContainer_not-left-margin'>
        <C.FormRowBox>
          {/* TODO: 알림메시지 타입 불러오기 api 연결해야함 */}
          <AutoComplete
            placeholder='카테고리를 선택하세요'
            options={noticeCategories.map(({ id, name }) => ({ value: id, label: name }))}
            defaultValue={categoryName}
            value={searchValue}
            onChange={setSearchValue}
            onSelect={select}
          />
          <Button onClick={openEditNoticeCatogoryModal}>편집</Button>
        </C.FormRowBox>
      </Form.Item>
    </>
  );
}

export default MessageCategorySelect;
