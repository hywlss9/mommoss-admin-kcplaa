import { Button, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import Text from '@components/Text';

import type * as T from './type';

function ShowRejectReasonModal({ rejectReason }: T.ShowRejectReasonModalProps) {
  const dispatch = useDispatch();

  const close = () => dispatch(closeModal('showRejectReason'));

  const footerBtns = [
    <Button key='close' type='primary' onClick={close} style={{ width: '70px' }}>
      확인
    </Button>,
  ];

  return (
    <Modal open={true} centered={true} footer={footerBtns} width='440px' onCancel={close}>
      <Form layout='vertical' colon={false}>
        <Form.Item>
          <Text weight={500} style={{ marginBottom: '10px' }}>
            반려사유
          </Text>
          <Input name='reject' value={rejectReason} disabled={true} style={{ color: '#202020' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default ShowRejectReasonModal;
