import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Form, Input, Select } from 'antd';
import type { RadioChangeEvent } from 'antd';

import useGetNotices from '@hooks/queries/notice/useGetNotices';
import useGetSurveys from '@hooks/queries/survey/useGetSurveys';

import NumberTitle from '@components/NumberTitle';
import Radios from '@components/Radios';

import type * as T from './type';

const MESSAGE_RADIOS: { label: string; value: T.PushType }[] = [
  { label: '공지', value: 'notice' },
  { label: '설문', value: 'survey' },
  { label: '링크', value: 'link' },
];

const requireRule = [{ required: true, message: '내용을 입력해주세요.' }];

function Push({ setPush }: T.PushProps) {
  const { data: notices, refetch: noticeRefetch, fetchNextPage: fetchNextNotice } = useGetNotices();
  const { data: surveys, refetch: surveyRefetch, fetchNextPage: fetchNextSurvey } = useGetSurveys();

  const [messageType, setMessageType] = useState<T.PushType>('notice');
  const [linkValue, setLinkValue] = useState<string>('');

  const handleMessageType = ({ target: { value } }: RadioChangeEvent) => setMessageType(value);

  const openSelectNotice = (open: boolean) => {
    if (!open) return false;
    noticeRefetch();
  };

  const openSelectSurvey = async (open: boolean) => {
    if (!open) return false;
    surveyRefetch();
  };

  const handleMessage = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPush(prevState => ({ ...prevState, [name]: value }));
  };

  const setNoticeId = (noticeId: number) => {
    setPush(prevState => ({ ...prevState, noticeId, surveyId: undefined }));
  };

  const setSurveyId = (surveyId: number) => {
    setPush(prevState => ({ ...prevState, surveyId, noticeId: undefined }));
  };

  const handleLink = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setLinkValue(value);

  useEffect(() => {
    setPush(prevState => ({
      ...prevState,
      noticeId: undefined,
      surveyId: undefined,
      link: '',
    }));
  }, [messageType]);

  useEffect(() => {
    setPush(prevState => ({
      ...prevState,
      noticeId: undefined,
      surveyId: undefined,
      link: linkValue,
    }));
  }, [linkValue]);

  return (
    <>
      <NumberTitle number={1} title='메시지' />
      <Radios
        options={MESSAGE_RADIOS}
        type='button'
        size='large'
        value={messageType}
        onChange={handleMessageType}
      />
      {messageType === 'notice' && notices && (
        <Form.Item label='공지 선택'>
          <Select
            allowClear={true}
            listHeight={200}
            onDropdownVisibleChange={openSelectNotice}
            onSelect={setNoticeId}
            onPopupScroll={({ currentTarget: { scrollTop, scrollHeight, clientHeight } }) => {
              if (scrollHeight === clientHeight + scrollTop) fetchNextNotice();
            }}>
            {notices.map(({ id, title }) => {
              return (
                <Select.Option key={id} value={id}>
                  {title}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
      {messageType === 'survey' && surveys && (
        <Form.Item label='설문 선택'>
          <Select
            allowClear={true}
            listHeight={200}
            onDropdownVisibleChange={openSelectSurvey}
            onSelect={setSurveyId}
            onPopupScroll={({ currentTarget: { scrollTop, scrollHeight, clientHeight } }) => {
              if (scrollHeight === clientHeight + scrollTop) fetchNextSurvey();
            }}>
            {surveys.map(({ id, title }) => {
              return <Select.Option value={id}>{title}</Select.Option>;
            })}
          </Select>
        </Form.Item>
      )}
      {messageType === 'link' && (
        <Form.Item label='링크 입력'>
          <Input value={linkValue} onChange={handleLink} />
        </Form.Item>
      )}
      <Form.Item label='알림 제목' name='title' rules={requireRule}>
        <Input name='title' onChange={handleMessage} />
      </Form.Item>
      <Form.Item label='알림 내용' name='message'>
        <Input.TextArea name='message' autoSize={true} onChange={handleMessage} />
      </Form.Item>
    </>
  );
}

export default Push;
