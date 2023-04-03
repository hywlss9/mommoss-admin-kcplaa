import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

import { Button, Input, Modal, message } from 'antd';
import type { InputRef } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import { createNoticeCategory } from '@api/notice';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

function CreateNoticeCategoryModal() {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');

  const inputRef = useRef<InputRef>(null);

  const handleName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setName(value);

  const close = () => dispatch(closeModal('createNoticeCategory'));

  const create = async (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    if ((e as KeyboardEvent)?.nativeEvent?.isComposing) return;

    const response = await createNoticeCategory({ data: { name } });

    if (getIsResponseFalse(response)) {
      message.error('공지 카테고리 추가에 실패했습니다. 다시 시도해주세요.');
      return false;
    }

    message.success('공지 카테고리가 추가되었습니다.');
    trigger('CREATED_NOTICE_CATEGORY');
    close();
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
        placeholder='공지 카테고리 이름을 입력하세요'
        value={name}
        onChange={handleName}
        onPressEnter={create}
      />
    </Modal>
  );
}

export default CreateNoticeCategoryModal;
