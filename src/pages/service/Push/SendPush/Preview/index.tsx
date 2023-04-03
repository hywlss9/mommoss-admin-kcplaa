import dayjs from 'dayjs';

import Preview from '@components/Preview';

import Kcplaa from '@assets/icons/kcplaa.png';

import type { SendPushData } from '@type/push';

import * as S from './styled';

interface SendPushPreviewProps {
  push: SendPushData;
}

function SendPushPreview({ push }: SendPushPreviewProps) {
  const { title, message } = push;

  return (
    <Preview>
      <S.PushContainer>
        <S.PushDetailBox>
          <S.PushDetailTitleBox>
            <img src={Kcplaa} alt='한국노무사회로고' className='preview-logo' />
            한국공인노무사회
          </S.PushDetailTitleBox>
          {/* {date ? dayjs(date).format('MM-DD HH:mm') : '지금'} */}
        </S.PushDetailBox>
        <S.Title>{title}</S.Title>
        <S.Content>{message}</S.Content>
      </S.PushContainer>
    </Preview>
  );
}

export default SendPushPreview;
