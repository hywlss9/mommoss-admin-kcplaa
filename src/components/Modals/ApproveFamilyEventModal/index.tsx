import { useEffect, useMemo } from 'react';

import { Button, Form, Input, Modal, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';

import { closeModal, openModal } from '@reduce/modals';

import { updateFamilyEvent } from '@api/event';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import ApproveFuneral from './ApproveFuneral';
import ApproveOpening from './ApproveOpening';
import ApproveWedding from './ApproveWedding';
import * as S from './styled';
import type * as T from './type';

const options = [
  { label: '결혼', value: 'wedding' },
  { label: '부고', value: 'funeral' },
  { label: '개업', value: 'opening' },
];

function ApproveFamilyEventModal({ event }: T.ApproveFamilyEventModalProps) {
  const { type, contacts, remarks, paymentAccount, approveStatus, id, rejectReason } = event;

  const dispatch = useDispatch();

  const radioOptions: T.radioOptions[] = useMemo(() => {
    return options.map(prev => ({ ...prev, disabled: prev.value !== type }));
  }, []);

  const close = () => dispatch(closeModal('approveFamilyEvent'));

  const approved = async () => {
    const response = await updateFamilyEvent({ path: { eventId: id }, data: { approved: true } });

    if (getIsResponseFalse(response)) return;

    message.success('승인 되었습니다.');
    trigger('SUCCESS_UPDATE_FAMILY_EVENT');
    close();
  };

  const rejected = async () => {
    openRejectedFamilyEventModal(id);
  };

  const openRejectedFamilyEventModal = (id: number) =>
    dispatch(openModal({ name: 'rejectedFamilyEvent', props: { id } }));

  const openShowRejectReasonModal = (rejectReason: string) =>
    dispatch(openModal({ name: 'showRejectReason', props: { rejectReason } }));

  const pendingFooterBtns = [
    <Button key='cancel' onClick={rejected}>
      반려
    </Button>,
    <Button key='send' type='primary' onClick={approved}>
      승인
    </Button>,
  ];
  const footerBtn = [
    <Button key='ok' style={{ width: '70px' }} type='primary' onClick={close}>
      확인
    </Button>,
  ];

  useEffect(() => {
    if (approveStatus === 'rejected' && rejectReason) openShowRejectReasonModal(rejectReason);
  }, []);

  return (
    <Modal
      open={true}
      bodyStyle={{ overflowY: 'auto', maxHeight: '550px' }}
      footer={approveStatus === 'pending' ? pendingFooterBtns : footerBtn}
      title='경조사 승인처리'
      width='800px'
      onCancel={close}>
      <Form layout='horizontal' colon={false} labelCol={{ span: 4 }} labelAlign='left'>
        <S.Container>
          {(() => {
            switch (type) {
              case 'wedding': {
                return <ApproveWedding event={event} radioOptions={radioOptions} />;
              }
              case 'funeral': {
                return <ApproveFuneral event={event} radioOptions={radioOptions} />;
              }
              case 'opening': {
                return <ApproveOpening event={event} radioOptions={radioOptions} />;
              }
            }
          })()}

          {contacts.map(({ phone, name }, index) => {
            return (
              <Form.Item key={index} label={'연락처' + (index + 1)}>
                <Input value={`${phone} (${name})`} disabled={true} />
              </Form.Item>
            );
          })}
          <Form.Item label={'비고'}>
            <TextArea
              autoSize={{ minRows: 3, maxRows: 6 }}
              value={remarks || '-'}
              disabled={true}
            />
          </Form.Item>
          <Form.Item label={'마음 전하실 곳'}>
            <Input value={paymentAccount} disabled={true} />
          </Form.Item>
        </S.Container>
      </Form>
    </Modal>
  );
}

export default ApproveFamilyEventModal;
