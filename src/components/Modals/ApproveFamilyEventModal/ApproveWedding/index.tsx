import { Form, Input, Radio, Select } from 'antd';
import dayjs from 'dayjs';

import useIsDiligence from '@hooks/useIsDiligence';

import * as C from '@components/Common';
import type { ApproveFamilyEventModalProps } from '@components/Modals/ApproveFamilyEventModal/type';

function ApproveWedding({ event, radioOptions }: ApproveFamilyEventModalProps) {
  const { title, type, targetName, targetType, paymentMethod, date, address, groupMembers } = event;

  const isDiligence = useIsDiligence(groupMembers[0]);

  const applicant = groupMembers.find(({ requester, user }) => requester && user?.name);

  return (
    <>
      <Form.Item label={<>{isDiligence && <C.CertifiedBadge />}신청자</>}>
        <Input value={applicant?.user?.name} disabled={true} />
      </Form.Item>
      <Form.Item label={'경조사 구분'}>
        <Radio.Group options={radioOptions} value={type} />
      </Form.Item>
      <Form.Item label={'경조 대상자 선택'}>
        <Select value={targetType} disabled={true} />
      </Form.Item>
      <Form.Item label={'경조 대상자 이름'}>
        <Input value={targetName} disabled={true} />
      </Form.Item>
      <Form.Item label={'경조명'}>
        <Input value={title} disabled={true} />
      </Form.Item>
      <Form.Item label={'경조비 지급방식'}>
        <Input value={paymentMethod} disabled={true} />
      </Form.Item>
      <Form.Item label={'결혼식 일시'}>
        <Input value={dayjs(date).format('YYYY.MM.DD HH:mm')} disabled={true} />
      </Form.Item>
      <Form.Item label={'결혼식장명 및 주소'}>
        <Input value={address} disabled={true} />
      </Form.Item>
    </>
  );
}

export default ApproveWedding;
