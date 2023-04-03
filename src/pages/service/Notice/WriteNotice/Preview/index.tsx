import { useState } from 'react';

import { Menu } from 'antd';

import colors from '@constants/colors';

import Preview from '@components/Preview';

import NoticeDetail from './NoticeDetail';
import NoticeList from './NoticeList';
import * as S from './styled';
import type * as T from './type';

function WriteNoticePreview({ notice }: T.WriteNoticePreviewProps) {
  const [previewType, setPreviewType] = useState<T.PreviewMenu>('list');
  const [noticeListType, setNoticeListType] = useState<T.PreviewNoticeMenu>('all');

  const handlePrevType = ({ key }: any) => setPreviewType(key);

  const handleNoticeListType = ({ key }: any) => setNoticeListType(key);

  return (
    <Preview
      backgroundColor={colors.WHITE}
      menu={{
        items: [
          { key: 'list', label: '공지 목록' },
          { key: 'view', label: '공지 내용' },
        ],
        selectedKey: previewType,
        onSelect: handlePrevType,
      }}>
      {notice && (
        <S.Container type={previewType}>
          {previewType === 'list' && (
            <>
              <Menu
                mode='horizontal'
                selectedKeys={[noticeListType]}
                onSelect={handleNoticeListType}>
                <Menu.Item key='all'>전체</Menu.Item>
                <Menu.Item key='unread'>안읽음</Menu.Item>
              </Menu>
              <NoticeList notice={notice} />
            </>
          )}
          {previewType === 'view' && <NoticeDetail notice={notice} />}
        </S.Container>
      )}
    </Preview>
  );
}

export default WriteNoticePreview;
