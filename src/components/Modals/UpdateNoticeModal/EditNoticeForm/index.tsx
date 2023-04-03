import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Select, Spin, Switch, message } from 'antd';
import update from 'immutability-helper';

import useGetSurveys from '@hooks/queries/survey/useGetSurveys';

import { uploadGroupFile } from '@api/file';
import { getNoticeDetail, updateNotice } from '@api/notice';

import getIsResponseFalse from '@utils/getIsResponseFalse';

import * as C from '@components/Common';
import TextEditor from '@components/TextEditor';

import MessageCategorySelect from '@pages/service/Notice/WriteNotice/Form/MessageCategorySelect';
import * as S from '@pages/service/Notice/WriteNotice/Form/styled';

import { ReactComponent as Trash } from '@assets/icons/trash.svg';

import type { Notice, NoticeCategory, WriteNoticeData } from '@type/notice';

import type * as T from './type';

function EditNoticeForm({ noticeId, close }: T.EditNoticeFormProps) {
  const { data: surveys } = useGetSurveys();

  const [notice, setNotice] = useState<Notice>();
  const [editedNotice, setEditedNotice] = useState<WriteNoticeData>({
    title: '',
    content: '',
    visible: true,
  });
  const [isSurvey, setIsSurvey] = useState<boolean>(false);

  const fileUploadInputRef = useRef<HTMLInputElement>(null);

  const [form] = Form.useForm();

  const setNoticeCategory = (category: NoticeCategory) => {
    setEditedNotice(prevState => ({ ...prevState, categoryId: category.id }));
  };

  const handleNotice = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
    setEditedNotice(prevState => ({ ...prevState, [name]: value }));

  const handleWriter = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setEditedNotice(prevState => ({ ...prevState, authorName: value }));
  };

  const handleContent = (content: any) => setEditedNotice(prevState => ({ ...prevState, content }));

  const openUpload = () => {
    if (!fileUploadInputRef.current) return;

    fileUploadInputRef.current.click();
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    console.log({ e, inputFiles });
    if (!inputFiles?.length) return;

    const { length } = inputFiles;

    const files: WriteNoticeData['files'] = editedNotice.files ?? [];
    const fileIds: WriteNoticeData['fileIds'] = editedNotice.fileIds ?? [];
    const uploadedFiles = Array.from({ length }).map((_, index) => {
      return inputFiles[index];
    });

    files.push(...uploadedFiles);

    console.log({ files });

    for await (const file of uploadedFiles) {
      const formData = new FormData();
      formData.append('file', file);

      await uploadGroupFile({ data: formData }).then(id => fileIds.push(id));
    }

    console.log({ fileIds });

    setEditedNotice(prevState => ({ ...prevState, files, fileIds }));
  };

  const handleIsSurvey = (checked: boolean) => setIsSurvey(checked);

  const handleSurvey = (surveyId: number) => {
    setEditedNotice(prevState => ({ ...prevState, surveyId }));
  };

  const submit = async () => {
    const { title, content, summary, categoryId, surveyId, authorName, fileIds } = editedNotice;

    console.log({ editedNotice });
    await updateNotice({
      path: { noticeId },
      data: { title, content, summary, categoryId, surveyId, authorName, fileIds },
    });

    message.success('공지가 수정되었습니다.');
    close();
  };

  const getNotice = async () => {
    const response = await getNoticeDetail({ path: { noticeId } });
    console.log({ response });
    if (getIsResponseFalse(response)) {
      message.error('공지를 불러오는데 실패했습니다.');
      close();
    }

    const { title, content, categoryId, summary, authorName, attachedFiles, survey } = response;

    form.setFieldValue('title', title);
    form.setFieldValue('authorName', authorName);
    form.setFieldValue('summary', summary);
    form.setFieldValue('content', content);

    setIsSurvey(survey !== null);
    setNotice(response);
    setEditedNotice({
      title,
      content,
      fileIds: attachedFiles.map(file => file.uuid),
      files: attachedFiles,
      visible: true,
      ...(survey ? { surveyId: survey.id } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(summary ? { summary } : {}),
      ...(authorName ? { authorName } : {}),
    });
  };

  useEffect(() => {
    getNotice();
  }, [noticeId]);

  useEffect(() => {
    if (!isSurvey) setEditedNotice(prevState => ({ ...prevState, surveyId: undefined }));
  }, [isSurvey]);

  if (!notice) {
    return <Spin tip='로딩중...' indicator={<LoadingOutlined spin={true} />} />;
  }

  return (
    <Form form={form} colon={false} labelCol={{ span: 5 }} labelAlign='left' onFinish={submit}>
      <MessageCategorySelect
        categoryId={notice?.categoryId as number | undefined}
        setCategory={setNoticeCategory}
      />

      <Form.Item label='공지제목' name='title'>
        <Input name='title' placeholder='제목을 입력하세요.' onChange={handleNotice} />
      </Form.Item>
      <Form.Item label='발송자명' name='authorName'>
        <Input name='authorName' placeholder='발송자명을 입력하세요.' onChange={handleWriter} />
      </Form.Item>
      <Form.Item label='내용요약' name='summary'>
        <Input
          name='summary'
          placeholder='공지내용을 요약하여 입력하세요.'
          onChange={handleNotice}
        />
      </Form.Item>

      <Divider type='horizontal' />

      <Form.Item label='공지내용' name='content' className='column-form-item'>
        <TextEditor value={notice.content} onChange={handleContent} />
      </Form.Item>
      <Form.Item label='첨부파일' className='align-right'>
        <Button onClick={openUpload}>파일 첨부하기</Button>
        <input
          type='file'
          multiple={true}
          ref={fileUploadInputRef}
          style={{ display: 'none', opacity: 0, visibility: 'hidden' }}
          onChange={handleFileUpload}
        />
      </Form.Item>
      {editedNotice.files && (
        <S.FileListBox>
          {editedNotice.files.map(({ name }, index) => {
            const removeFile = () => {
              setNotice(prevState =>
                update(prevState, {
                  attachedFiles: {
                    $splice: [[index, 1]],
                  },
                  // fileIds: {
                  //   $splice: [[index, 1]],
                  // },
                }),
              );
            };

            return (
              <S.FileItem key={index}>
                <span>{name}</span>
                <Trash onClick={removeFile} />
              </S.FileItem>
            );
          })}
        </S.FileListBox>
      )}

      <Divider type='horizontal' />

      <Form.Item label='설문포함' className='align-right'>
        <Switch checked={isSurvey} onChange={handleIsSurvey} />
      </Form.Item>
      {isSurvey && (
        <Form.Item label='설문선택'>
          <C.FormRowBox>
            <Select
              defaultValue={editedNotice.surveyId}
              value={editedNotice.surveyId}
              onSelect={handleSurvey}>
              {surveys &&
                surveys.map(({ id, title }) => {
                  return (
                    <Select.Option key={id} value={id}>
                      {title}
                    </Select.Option>
                  );
                })}
            </Select>
            {/* <Button>새 설문 만들기</Button> */}
          </C.FormRowBox>
        </Form.Item>
      )}
      <Divider type='horizontal' />
      <Form.Item className='align-right'>
        <Button type='primary' htmlType='submit'>
          수정
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditNoticeForm;
