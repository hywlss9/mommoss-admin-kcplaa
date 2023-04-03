import { useMemo } from 'react';

import dayjs from 'dayjs';

import useGetNoticeCategories from '@hooks/queries/notice/useGetNoticeCategories';

import * as S from './styled';
import type * as T from './type';

function NoticeList({ notice: { categoryId, title, summary, files } }: T.NoticeListProps) {
  const { data: noticeCategories } = useGetNoticeCategories();

  const categoryName = useMemo(() => {
    return noticeCategories?.find(category => category.id === categoryId)?.name;
  }, [categoryId, noticeCategories]);

  return (
    <S.NoticeBox>
      <S.NoticeHeader>
        <S.NoticeTitle>
          {categoryName && `[${categoryName}] `}
          {title}
        </S.NoticeTitle>
        <S.NoticeDate>{dayjs(new Date()).format('HH:mm')}</S.NoticeDate>
      </S.NoticeHeader>
      <S.NoticeText>{summary}</S.NoticeText>
      {files && (
        <S.FileItem>
          <span>{files[0].name}</span>
          {files.length > 1 && `+${files.length - 1}`}
        </S.FileItem>
      )}
    </S.NoticeBox>
  );
}

export default NoticeList;
