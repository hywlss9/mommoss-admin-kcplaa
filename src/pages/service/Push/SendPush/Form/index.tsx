import { useEffect, useState } from 'react';

import { Button, Divider, Form, Space, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { openModal } from '@reduce/modals';

import { getNoticeDetail } from '@api/notice';
import { postPush } from '@api/push';
import { getSurveyDetail } from '@api/survey';

import getIsResponseFalse from '@utils/getIsResponseFalse';

import type { AssociationMembersDataSource } from '@pages/address-book/AssociationMembers/Table/type';

import type { PushCategory, SendPushData } from '@type/push';

import Push from './Push';
import PushCategorySelect from './PushCategorySelect';
import Reservation from './Reservation';
import TargetSelect from './TargetSelect';
import * as S from './styled';
import type * as T from './type';

function SendPushForm({ push: _push, setPush: _setPush }: T.SendMessageFormProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [push, setPush] = useState<SendPushData>({
    title: _push?.title ?? '',
    link: _push?.link ?? '',
    groupMemberIds: _push?.groupMemberIds ?? [],
    teamIds: _push?.teamIds ?? [],
    categoryId: _push?.categoryId ?? -1,
    payload: _push?.payload ?? {},
  });
  //TODO: redux 분리 생각해봐야함
  const [selectedMembers, setSelectedMembers] = useState<AssociationMembersDataSource>([]);
  const [selectedGroups, setSelectedGroups] = useState<T.Target[]>([]);

  const setPushCategory = (pushCategory: PushCategory) => {
    setPush(prevState => ({ ...prevState, categoryId: pushCategory.id }));
  };

  const [form] = Form.useForm();

  const openTestSendModal = () => {
    if (push.categoryId < 0) {
      message.warning({
        key: 'required-push-category',
        content: '알림메시지 타입을 선택해주세요.',
      });
      return;
    } else if (!push.title) {
      message.warning({
        key: 'required-push-title',
        content: '알림메시지 제목을 입력해주세요.',
      });
      return;
    }

    dispatch(openModal({ name: 'pushTestSend', props: { push, selectedGroups, selectedMembers } }));
  };

  const submit = async () => {
    if (push.categoryId < 0) {
      message.warning({
        key: 'required-pushCategory',
        content: '알림메시지 타입을 선택해주세요.',
      });
      return;
    }

    const groupMemberIds: number[] = selectedMembers
      .map(({ user }) => user?.groupMembers[0].id)
      .filter(v => typeof v === 'number') as number[];

    console.log({ ...push, ...(selectedMembers && { groupMemberIds }) });

    const response = await postPush({
      data: { ...push, ...(selectedMembers && { groupMemberIds }) },
    });

    if (getIsResponseFalse(response)) return false;

    message.success(
      push.sendAt ? '알림메시지 예약 발송이 저장되었습니다.' : '알림메시지가 전송되었습니다.',
    );

    navigate('/service/push?menu=situation');
  };

  useEffect(() => {
    const setPushDataFromNotice = async () => {
      if (typeof push.noticeId === 'undefined') return;
      const notice = await getNoticeDetail({ path: { noticeId: push.noticeId } });

      if (!notice) {
        message.error('공지사항을 불러오는데 실패했습니다.');
        return;
      }

      const { id, title, summary, content } = notice;

      form.setFieldValue('title', title);
      form.setFieldValue('message', summary || content || '');

      setPush(prevState => ({
        ...prevState,
        title,
        message: summary || content || '',
        link: `/notice/${id}`,
      }));
    };

    setPushDataFromNotice();
  }, [push.noticeId]);

  useEffect(() => {
    const setPushDataFromSurvey = async () => {
      if (typeof push.surveyId === 'undefined') return;
      const survey = await getSurveyDetail({ path: { surveyId: push.surveyId } });

      if (!survey) return;
      const { id, title, description } = survey;

      form.setFieldValue('title', title);
      form.setFieldValue('message', description || '');

      setPush(prevState => ({
        ...prevState,
        title,
        message: description || '',
        link: `/survey/${id}`,
      }));
    };

    setPushDataFromSurvey();
  }, [push.surveyId]);

  // form 외부의 data를 set 해줌
  useEffect(() => {
    _setPush && _setPush(push);
  }, [push]);

  return (
    <Form form={form} colon={false} labelCol={{ span: 6 }} labelAlign='left' onFinish={submit}>
      <PushCategorySelect setPushCategory={setPushCategory} />

      <Push setPush={setPush} />

      <TargetSelect
        member={{ selectedMembers, setSelectedMembers }}
        group={{ selectedGroups, setSelectedGroups }}
      />

      <Reservation setPush={setPush} />

      <Divider />
      <Form.Item>
        <S.SendButtonBox>
          <Space>
            <Button
              htmlType='button'
              name='test'
              className='text-submit'
              onClick={openTestSendModal}>
              테스트 발송
            </Button>
            <Button type='primary' htmlType='submit' className='submit'>
              발송
            </Button>
          </Space>
        </S.SendButtonBox>
      </Form.Item>
    </Form>
  );
}

export default SendPushForm;
