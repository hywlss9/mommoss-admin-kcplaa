import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import NoThumbnail from '@assets/images/no-thumbnail.png';

import * as S from './styled';
import type * as T from './type';

dayjs.extend(duration);

function Video({ url, title, thumbnailUrl }: T.VideoProps) {
  const openVideo = () => window.open(url);

  return (
    <S.Container onClick={openVideo}>
      <S.VideoBox>
        <img src={thumbnailUrl || NoThumbnail} alt='미리보기 이미지' />
      </S.VideoBox>
      <S.TitleBox>{title}</S.TitleBox>
    </S.Container>
  );
}

export default Video;
