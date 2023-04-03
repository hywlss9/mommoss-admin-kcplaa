import { useState } from 'react';

import { AutoComplete, Button, Divider, Form } from 'antd';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useGetPushCategories from '@hooks/queries/push/useGetPushCategories';

import * as C from '@components/Common';

import type { PushCategory } from '@type/push';

import type * as T from './type';

//TODO: 이름 MessageTypeSelect로 변경
function PushCategorySelect({ setPushCategory }: T.PushCategorySelectProps) {
  const dispatch = useDispatch();

  const { data: pushCategories } = useGetPushCategories();

  const [searchValue, setSearchValue] = useState<string>('');

  const select = (id: string) => {
    if (!pushCategories) return;

    const findData = pushCategories.find(v => v.id === (Number(id) as PushCategory['id']));
    console.log({ id, findData });
    if (!findData) return;

    setPushCategory(findData);
    setSearchValue(findData.name);
  };

  const openEditCategoryModal = () => {
    dispatch(openModal({ name: 'editCategory' }));
  };

  if (!pushCategories) return <></>;

  return (
    <>
      <Form.Item label='알림메시지 타입' className='formContainer_not-left-margin'>
        <C.FormRowBox>
          {/* TODO: 알림메시지 타입 불러오기 api 연결해야함 */}
          <AutoComplete
            placeholder='알림메시지 타입을 선택하세요'
            options={pushCategories
              .filter(({ unused, name }) => !unused && name.includes(searchValue))
              .map(({ id, name }) => ({ value: id, label: name }))}
            value={searchValue}
            onChange={setSearchValue}
            onSelect={select}
          />
          <Button onClick={openEditCategoryModal}>편집</Button>
        </C.FormRowBox>
      </Form.Item>
      <Divider />
    </>
  );
}

export default PushCategorySelect;
