import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

import { Button, Form, Input, Modal, message } from 'antd';
import type { InputRef } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import { createAssociation } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

function CreateAssociationModal() {
  const dispatch = useDispatch();

  const [groupName, setGroupName] = useState<string>('');

  const inputRef = useRef<InputRef>(null);

  const handleGroupName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setGroupName(value);

  const create = async (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    if ((e as KeyboardEvent)?.nativeEvent?.isComposing) return;

    if (!groupName) {
      message.warning({ key: 'EMPTY_REQUIRE', content: '그룹명을 입력해주세요.' });
      return false;
    }

    const response = await createAssociation({ data: { name: groupName } });

    if (getIsResponseFalse(response)) return false;

    message.success('회원 그룹이 생성되었습니다.');
    trigger('SUCCESS_CREATE_ASSOCIATION');
    close();
  };

  const close = () => dispatch(closeModal('createAssociation'));

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='send' type='primary' onClick={create}>
      추가
    </Button>,
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Modal open={true} title='그룹 추가' footer={footerBtns} width='800px' onCancel={close}>
      <Form layout='horizontal' colon={false} labelCol={{ span: 2 }} labelAlign='left'>
        <Form.Item label='그룹명' style={{ padding: 0 }}>
          <Input
            ref={inputRef}
            placeholder='그룹명을 입력하세요'
            onChange={handleGroupName}
            onPressEnter={create}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateAssociationModal;
