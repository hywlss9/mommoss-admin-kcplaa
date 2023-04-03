import { useRef } from 'react';
import type { ChangeEvent, DragEvent } from 'react';

import { Button, message } from 'antd';

import Text from '@components/Text';

import * as S from './styled';
import type * as T from './type';

const UPLOAD_TEXT = '마우스로 파일을 끌어오거나 직접 선택해 주세요.';
const BUTTON_UPLOAD_TEXT = '파일 선택';

function FileUploader({
  isDropzone = true,
  text = UPLOAD_TEXT,
  buttonText = BUTTON_UPLOAD_TEXT,
  accept,
  setIsUpload,
  upload,
}: T.FileUploaderProps) {
  const dragCounterRef = useRef<number>(0);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const clickFileUpload = () => inputFileRef.current?.click();

  const blockEventBubbling = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleEnter = (e: DragEvent<HTMLDivElement>) => {
    blockEventBubbling(e);
    const items = e.dataTransfer.items;
    if (!items || items.length < 1) return false;

    dragCounterRef.current = dragCounterRef.current + 1;
  };

  const handleOut = (e: DragEvent<HTMLDivElement>) => {
    blockEventBubbling(e);

    dragCounterRef.current = dragCounterRef.current - 1;
    if (dragCounterRef.current === 0) setIsUpload && setIsUpload(false);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => blockEventBubbling(e);

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    blockEventBubbling(e);

    const files = e.dataTransfer.files;
    //TODO: accept로 바꿔야함
    const abledUploadExtArr = ['csv', 'xlsx'];

    dragCounterRef.current = dragCounterRef.current - 1;

    if (files.length !== 1) {
      message.error('파일은 한개만 업로드 할 수 있습니다.');
      return false;
    } else if (!abledUploadExtArr.includes(files[0].name.split('.').pop() || '')) {
      message.error('csv, xlsx 파일을 업로드해 주세요');
      return false;
    }

    if (dragCounterRef.current > 0) return;
    sucessUpload(files);
  };

  const changeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) sucessUpload(files);
  };

  const sucessUpload = (files: FileList) => {
    upload && upload(files);
    setIsUpload && setIsUpload(true);
  };

  if (isDropzone) {
    return (
      <S.FileUplaodBox
        onDragEnter={handleEnter}
        onDragLeave={handleOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}>
        <Text>{text}</Text>
        <input
          ref={inputFileRef}
          type='file'
          accept={accept?.join(',')}
          onChange={changeFileInput}
        />
        <Button onClick={clickFileUpload}>{buttonText}</Button>
      </S.FileUplaodBox>
    );
  }

  return (
    <S.FileUploadButtonBox>
      <input ref={inputFileRef} type='file' accept={accept?.join(',')} onChange={changeFileInput} />
      <Button onClick={clickFileUpload}>{buttonText}</Button>
    </S.FileUploadButtonBox>
  );
}

export default FileUploader;
