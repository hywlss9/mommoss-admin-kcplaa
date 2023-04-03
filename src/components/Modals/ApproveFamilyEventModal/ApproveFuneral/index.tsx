import { Divider, Form, Input, Radio, Select } from 'antd';
import dayjs from 'dayjs';

import type { ApproveFamilyEventModalProps } from '@components/Modals/ApproveFamilyEventModal/type';

const applicantRadioOptions = [
  {
    disabled: true,
    label: '본인 등록',
    value: 'me',
  },
  {
    disabled: false,
    label: '대리등록',
    value: 'proxy',
  },
];

function ApproveFuneral({ event, radioOptions }: ApproveFamilyEventModalProps) {
  const {
    title,
    type,
    targetName,
    targetType,
    paymentMethod,
    date,
    address,
    groupMembers,
    requestBySelf,
    requestorName,
    requestorRelation,
    requestorPhone,
  } = event;

  const applicant = groupMembers.find(({ requester }) => requester);

  return (
    <>
      {requestBySelf ? (
        <Form.Item label={'신청자'}>
          <Input value={applicant?.user?.name} disabled={true} />
        </Form.Item>
      ) : (
        <>
          <Form.Item label={'신청자 구분'}>
            <Radio.Group options={applicantRadioOptions} value={'proxy'} />
          </Form.Item>
          <Form.Item label={'신청자'}>
            <Input value={requestorName || '-'} disabled={true} />
          </Form.Item>
          <Form.Item label={'대상자와의 관계'}>
            <Input value={requestorRelation || '-'} disabled={true} />
          </Form.Item>
          <Form.Item label={'연락처'}>
            <Input value={requestorPhone || '-'} disabled={true} />
          </Form.Item>
          <Divider />
        </>
      )}

      <Form.Item label={'경조사 구분'}>
        <Radio.Group options={radioOptions} value={type} />
      </Form.Item>
      <Form.Item label={'경조 대상자 선택'}>
        <Select value={targetType} disabled={true} />
      </Form.Item>
      <Form.Item label={'경조명'}>
        <Input value={title} disabled={true} />
      </Form.Item>
      <Form.Item label={'경조비 지급방식'}>
        <Input value={paymentMethod} disabled={true} />
      </Form.Item>
      <Form.Item label={'고인명'}>
        <Input value={targetName} disabled={true} />
      </Form.Item>
      <Form.Item label={'발인 일시'}>
        <Input value={dayjs(date).format('YYYY.MM.DD HH:mm')} disabled={true} />
      </Form.Item>
      <Form.Item label={'빈소명 및 주소'}>
        <Input value={address} disabled={true} />
      </Form.Item>
    </>
  );
}

export default ApproveFuneral;
