import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Button, Input, Modal, message } from 'antd';
import type { InputRef } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import { createPushCategory } from '@api/push';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

function CreatePushCategoryModal() {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');

  const inputRef = useRef<InputRef>(null);

  const handleName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setName(value);

  const close = () => dispatch(closeModal('createPushCategory'));

  const create = async () => {
    if (!name) {
      message.warning('카테고리 이름을 입력해주세요.');
      return false;
    }

    const response = await createPushCategory({ data: { name } });

    if (getIsResponseFalse(response)) return false;

    message.success('알림메시지 카테고리가 추가되었습니다.');
    trigger('CREATED_PUSH_CATEGORY');
    close();

    return;
  };

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button type='primary' key='ok' onClick={create}>
      추가
    </Button>,
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Modal open={true} title='카테고리 추가' footer={footerBtns} onCancel={close}>
      <Input
        ref={inputRef}
        placeholder='알림메시지 카테고리 이름을 입력하세요'
        value={name}
        onChange={handleName}
        onPressEnter={create}
      />
    </Modal>
  );
}

export default CreatePushCategoryModal;
