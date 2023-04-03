import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

import { Button, Form, Input, Modal, message } from 'antd';
import type { InputRef } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import { createOrganization } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import type * as T from './type';

function CreateOrganizationModal({ parentId }: T.CreateOrganizationModalProps) {
  const dispatch = useDispatch();

  const [orgName, setOrgName] = useState<string>('');

  const inputRef = useRef<InputRef>(null);

  const handleGroupName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setOrgName(value);

  const create = async (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    if ((e as KeyboardEvent)?.nativeEvent?.isComposing) return;

    if (!orgName) {
      message.warning({ key: 'EMPTY_REQUIRE', content: '조직명을 입력해주세요.' });
      return false;
    }

    const response = await createOrganization({ data: { parentId, name: orgName } });

    if (getIsResponseFalse(response)) return false;

    message.success('조직이 생성되었습니다.');
    trigger('SUCCESS_CREATE_ORGANIZATION');
    close();
  };

  const close = () => dispatch(closeModal('createOrganization'));

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
    <Modal open={true} title='하위 조직 추가' footer={footerBtns} width='800px' onCancel={close}>
      <Form layout='horizontal' colon={false} labelCol={{ span: 2 }} labelAlign='left'>
        <Form.Item label='조직명' style={{ padding: 0 }}>
          <Input
            ref={inputRef}
            placeholder='조직명을 입력하세요'
            onChange={handleGroupName}
            onPressEnter={create}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateOrganizationModal;
