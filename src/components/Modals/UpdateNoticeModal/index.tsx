import { useEffect, useState } from 'react';

import { Modal } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import type { WriteNoticeData } from '@type/notice';

import EditNoticeForm from './EditNoticeForm';
import type * as T from './type';

function UpdateNoticeModal({ notice }: T.UpdateNoticeModalProps) {
  const dispatch = useDispatch();

  const [writeNoticeData, setWriteNoticeData] = useState<WriteNoticeData>();

  const close = () => dispatch(closeModal('updateNotice'));

  useEffect(() => {
    const result: WriteNoticeData = {
      title: notice.title,
      content: notice.content,
      visible: true,
      ...(notice.summary && { summary: notice.summary }),
      ...(notice.categoryId && { categoryId: notice.categoryId }),
      ...(notice.attachedFiles && { fileIds: notice.attachedFiles.map(file => file.uuid) }),
      ...(notice.authorName && { authorName: notice.authorName }),
    };
    console.log({ result });
    setWriteNoticeData(result);
  }, [notice]);

  return (
    <Modal
      open={true}
      title='공지 수정'
      footer={null}
      width='800px'
      bodyStyle={{
        overflowY: 'auto',
        width: 'calc(100% + 15px)',
        maxHeight: '600px',
        paddingTop: 0,
        paddingRight: '15px',
      }}
      onCancel={close}>
      {writeNoticeData && notice && (
        //TODO: 파일 관련 Notice type
        <EditNoticeForm noticeId={notice.id} close={close} />
      )}
    </Modal>
  );
}

export default UpdateNoticeModal;
