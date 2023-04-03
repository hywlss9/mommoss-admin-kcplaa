import { useMemo, useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';

import useGetNoticeCategories from '@hooks/queries/notice/useGetNoticeCategories';

import FileExtIcon from '@components/FileExtIcon';

import { ReactComponent as Arrow } from '@assets/icons/arrow.svg';

import * as S from './styled';
import type * as T from './type';

function NoticeDetail({
  notice: { title, authorName, content, categoryId, files },
}: T.NoticeDetailProps) {
  const { data: noticeCategories } = useGetNoticeCategories();

  const [isFileShow, setIsFileShow] = useState<boolean>(false);

  const categoryName = useMemo(() => {
    return noticeCategories?.find(category => category.id === categoryId)?.name;
  }, [categoryId, noticeCategories]);

  const toggleFileShow = () => {
    setIsFileShow(prevState => !prevState);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <span>{categoryName && `[${categoryName}] `}</span>
          {title}
        </S.Title>
        <S.SenderInfoBox>
          <S.ProfileImageBox>
            <S.ProfileImage />
          </S.ProfileImageBox>
          <S.SendInfoBox>
            <S.Sender>{authorName}</S.Sender>
            <S.Date>{dayjs(new Date()).format('YYYY.MM.DD HH:mm')}</S.Date>
          </S.SendInfoBox>
        </S.SenderInfoBox>
      </S.Header>
      <S.FileBox>
        {files && (
          <>
            <S.FileBtnBox>
              <strong onClick={toggleFileShow}>
                <Arrow className={classNames({ isShow: isFileShow })} />
                첨부파일 {files.length}개
              </strong>
              <span>모두저장</span>
              <span>미리보기</span>
            </S.FileBtnBox>
            {isFileShow &&
              files.map(({ name }, index) => (
                <S.FileItem key={index}>
                  <FileExtIcon text={name} />
                  {name}
                </S.FileItem>
              ))}
          </>
        )}
      </S.FileBox>
      <S.Content dangerouslySetInnerHTML={{ __html: content }} />
      {/* TODO: 설문 추가해야함 */}
    </S.Container>
  );
}

export default NoticeDetail;
