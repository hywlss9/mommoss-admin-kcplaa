import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Button, Divider, Form, Input, Select, Switch, message } from 'antd';
import update from 'immutability-helper';
import { useNavigate } from 'react-router-dom';

import useGetSurveys from '@hooks/queries/survey/useGetSurveys';

import { uploadGroupFile } from '@api/file';
import { createNotice } from '@api/notice/createNotice';

import * as C from '@components/Common';
import TextEditor from '@components/TextEditor';

import { ReactComponent as Trash } from '@assets/icons/trash.svg';

import type { NoticeCategory, WriteNoticeData } from '@type/notice';

import MessageCategorySelect from './MessageCategorySelect';
import * as S from './styled';
import type * as T from './type';

function WriteNoticeForm({
  notice: _notice,
  setNotice: _setNotice,
  isSubmitButton = true,
}: T.WriteNoticeFormProps) {
  const navigate = useNavigate();

  const { data: surveys } = useGetSurveys();

  const [notice, setNotice] = useState<WriteNoticeData>(_notice as WriteNoticeData);
  const [isSurvey, setIsSurvey] = useState<boolean>(typeof _notice?.surveyId === 'number');

  const fileUploadInputRef = useRef<HTMLInputElement>(null);

  const [form] = Form.useForm();

  const setNoticeCategory = (category: NoticeCategory) => {
    setNotice(prevState => ({ ...prevState, categoryId: category.id }));
  };

  const handleNotice = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
    setNotice(prevState => ({ ...prevState, [name]: value }));

  const handleWriter = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setNotice(prevState => ({ ...prevState, authorName: value }));
  };

  const handleContent = (content: any) => setNotice(prevState => ({ ...prevState, content }));

  const openUpload = () => {
    if (!fileUploadInputRef.current) return;

    fileUploadInputRef.current.click();
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    console.log({ e, inputFiles });
    if (!inputFiles?.length) return;

    const { length } = inputFiles;

    const files: WriteNoticeData['files'] = notice.files ?? [];
    const fileIds: WriteNoticeData['fileIds'] = notice.fileIds ?? [];
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

    setNotice(prevState => ({ ...prevState, files, fileIds }));
  };

  const handleIsSurvey = (checked: boolean) => setIsSurvey(checked);

  const handleSurvey = (surveyId: number) => {
    setNotice(prevState => ({ ...prevState, surveyId }));
  };

  const submit = async () => {
    const { title, content, summary, categoryId, surveyId, authorName, fileIds } = notice;

    if (!content) {
      message.warning('공지 내용을 입력해주세요.');
      return false;
    }

    console.log({ notice });
    await createNotice({
      data: { title, content, summary, categoryId, surveyId, authorName, fileIds, visible: true },
    });

    message.success('공지가 생성되었습니다.');
    navigate(`/service/notice?menu=list`);
  };

  useEffect(() => {
    if (!notice) return;
    console.log({ notice });
    const { title, summary, content, authorName } = notice;

    form.setFieldValue('title', title);
    form.setFieldValue('authorName', authorName);
    form.setFieldValue('summary', summary);
    form.setFieldValue('content', content);
    _setNotice && _setNotice(notice);
  }, [notice]);

  useEffect(() => {
    if (!isSurvey) setNotice(prevState => ({ ...prevState, surveyId: undefined }));
  }, [isSurvey]);

  return (
    <Form form={form} colon={false} labelCol={{ span: 5 }} labelAlign='left' onFinish={submit}>
      <MessageCategorySelect categoryId={notice?.categoryId} setCategory={setNoticeCategory} />

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
      {notice?.files && (
        <S.FileListBox>
          {notice.files.map(({ name }, index) => {
            const removeFile = () => {
              setNotice(prevState =>
                update(prevState, {
                  files: {
                    $splice: [[index, 1]],
                  },
                  fileIds: {
                    $splice: [[index, 1]],
                  },
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
            <Select value={notice.surveyId} onSelect={handleSurvey}>
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

      {isSubmitButton && (
        <>
          <Divider type='horizontal' />
          <Form.Item className='align-right'>
            <Button type='primary' htmlType='submit'>
              작성완료
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
}

export default WriteNoticeForm;
