import { useEffect, useState } from 'react';

import { message } from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import { getPushDetail } from '@api/push';

import getIsResponseFalse from '@utils/getIsResponseFalse';

import colors from '@constants/colors';

import type { GetPushesResponseItem } from '@pages/service/Push/Situation/type';

import * as S from './styled';
import type * as T from './type';

function PushDetail({ pushId }: T.PushDetailProps) {
  const dispatch = useDispatch();

  const [push, setPush] = useState<GetPushesResponseItem>();

  useEffect(() => {
    const getPush = async () => {
      const response = await getPushDetail({ path: { notificationId: pushId } });

      if (getIsResponseFalse(response)) {
        message.error('알림 메시지 정보를 가져오는데 실패했습니다.');
        return false;
      }
      console.log({ response });
      setPush(response);
    };

    getPush();
  }, [pushId]);

  if (!push) {
    return <div>정보를 가져오는중 입니다.</div>;
  }

  // const { total, success, fail, date } = push;
  const { createdAt, sendAt, results } = push;

  if (!results) {
    return <div>발송 정보가 없습니다.</div>;
  }

  const total = results.length;
  const successLength = results.filter(result => result.status === 'success').length;
  const pendingLength = results.filter(result => result.status === 'pending').length;
  const rejectedLength = results.filter(result => result.status === 'rejected').length;
  const errorLength = results.filter(result => result.status === 'error').length;

  const isSendAt = sendAt && dayjs(sendAt).isAfter(dayjs(new Date()));

  return (
    <S.SendInfoBox>
      <S.SendInfoTitle>메시지 발송정보</S.SendInfoTitle>
      <S.Item>
        <S.ItemTitle>전체발송</S.ItemTitle>
        <S.ItemValue>{total}</S.ItemValue>
      </S.Item>
      <S.Item>
        <S.ItemTitle>발송성공</S.ItemTitle>
        <S.ItemValue>{successLength}</S.ItemValue>
      </S.Item>
      <S.Item>
        <S.ItemTitle>발송중</S.ItemTitle>
        <S.ItemValue>{pendingLength}</S.ItemValue>
      </S.Item>
      <S.Item>
        <S.ItemTitle>수신거부</S.ItemTitle>
        <S.ItemValue>{rejectedLength}</S.ItemValue>
      </S.Item>
      <S.Item>
        <S.ItemTitle>발송실패</S.ItemTitle>
        <S.ItemValue
          color={colors.RED_ORIGIN}
          onClick={() => {
            //TODO: server swagger model 만들어지면 추가
            dispatch(openModal({ name: 'failedPushList', props: { pushDetail: push } }));
          }}>
          <S.UnderLineText>{rejectedLength + errorLength}</S.UnderLineText>
        </S.ItemValue>
      </S.Item>
      {/* //TODO: 서버 기다려야함 */}
      {/* <S.Item>
        <S.ItemTitle>수신확인</S.ItemTitle>
        <S.ItemValue>{total}</S.ItemValue>
      </S.Item>
      <S.Item>
        <S.ItemTitle>읽음확인</S.ItemTitle>
        <S.ItemValue>{total}</S.ItemValue>
      </S.Item> */}
      <S.Item>
        <S.ItemTitle>발송일자</S.ItemTitle>
        <S.ItemValue>{dayjs(isSendAt ? sendAt : createdAt).format('YY-MM-DD HH:mm')}</S.ItemValue>
      </S.Item>
    </S.SendInfoBox>
  );
}

export default PushDetail;
