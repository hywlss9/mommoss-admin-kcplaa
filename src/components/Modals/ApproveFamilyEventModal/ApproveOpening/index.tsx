import { Form, Input, Radio } from 'antd';
import dayjs from 'dayjs';

import useIsDiligence from '@hooks/useIsDiligence';

import * as C from '@components/Common';
import type { ApproveFamilyEventModalProps } from '@components/Modals/ApproveFamilyEventModal/type';

function ApproveOpening({ event, radioOptions }: ApproveFamilyEventModalProps) {
  const { title, type, paymentMethod, date, address, groupMembers } = event;

  const isDiligence = useIsDiligence(groupMembers[0]);

  const applicant = groupMembers.find(({ requester }) => requester);
  const name = groupMembers.map(({ user, licenseCb, licenseNo }) => {
    return `${user?.name}(${licenseCb}기/${licenseNo})`;
  });

  return (
    <>
      <Form.Item label={<>{isDiligence && <C.CertifiedBadge />}신청자</>}>
        <Input value={applicant?.user?.name} disabled={true} />
      </Form.Item>
      <Form.Item label={'경조사 구분'}>
        <Radio.Group options={radioOptions} value={type} />
      </Form.Item>
      <Form.Item label={'경조 대상자 이름'}>
        <Input value={name.join(', ')} disabled={true} />
      </Form.Item>
      <Form.Item label={'경조명'}>
        <Input value={title} disabled={true} />
      </Form.Item>
      <Form.Item label={'경조비 지급방식'}>
        <Input value={paymentMethod} disabled={true} />
      </Form.Item>
      <Form.Item label={'개업 일시'}>
        <Input value={dayjs(date).format('YYYY.MM.DD HH:mm')} disabled={true} />
      </Form.Item>
      <Form.Item label={'사무소 주소'}>
        <Input value={address} disabled={true} />
      </Form.Item>
    </>
  );
}

export default ApproveOpening;
