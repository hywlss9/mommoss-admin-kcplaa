import { DatePicker, Form, InputNumber, Switch } from 'antd';
import dayjs from 'dayjs';

import type * as T from './type';

function SurveySetting({
  surveySetting: { editable, secure, maxResponses, startedAt, finishedAt },
  setSurveySetting,
}: T.SurveySettingProps) {
  const handleEditable = (editable: boolean) =>
    setSurveySetting(prevState => ({ ...prevState, editable }));

  const handleSecure = (secure: boolean) =>
    setSurveySetting(prevState => ({ ...prevState, secure }));

  const handleDate = (_: any, dateArr: string[]) => {
    const [startedAt, finishedAt] = dateArr;
    setSurveySetting(prevState => ({ ...prevState, startedAt, finishedAt }));
  };

  const handleMaxResponse = (count: number | null) => {
    if (typeof count !== 'number' || count < 0) {
      setSurveySetting(prevState => ({ ...prevState, maxResponses: undefined }));
      return;
    }
    setSurveySetting(prevState => ({ ...prevState, maxResponses: count }));
  };

  return (
    <Form colon={false} labelCol={{ span: 7 }} labelAlign='left'>
      <Form.Item label='제출 후 수정 여부' className='align-right'>
        <Switch checked={editable} onChange={handleEditable} />
      </Form.Item>
      <Form.Item label='본인인증 여부' className='align-right'>
        <Switch checked={secure} onChange={handleSecure} />
      </Form.Item>
      <Form.Item label='투표 기간 설정' className='align-right'>
        <DatePicker.RangePicker
          format='YYYY-MM-DD HH:mm'
          showTime={{ format: 'HH:mm' }}
          showNow={false}
          value={[dayjs(startedAt), dayjs(finishedAt)]}
          placeholder={['시작일', '종료일']}
          onChange={handleDate}
        />
      </Form.Item>
      <Form.Item label='최대 응답 수' className='align-right'>
        <InputNumber
          value={typeof maxResponses === 'number' ? maxResponses : null}
          onChange={handleMaxResponse}
        />
      </Form.Item>
    </Form>
  );
}

export default SurveySetting;
