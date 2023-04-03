import { useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';

import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';

import getImageUriFromId from '@utils/getImageUriFromId';

import { FORM_ITEM_LABEL_STYLE } from '@constants/form';

import * as C from '@components/Common';
import FileUploader from '@components/FileUploader';
import RequireDot from '@components/RequireDot';
import Text from '@components/Text';

import type { BannerDataKey } from '../type';
import type * as T from './type';

function BannerForm({ formData, onChange }: T.FormProps) {
  const imageDataUrlRef = useRef<string>('');

  const handleFormData = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    onChange(name as BannerDataKey, value);
  };

  const selectImage = (files: FileList) => {
    const file = files[0];
    onChange('file', file);
  };

  const handleDate = (_: any, dateString: string) => {
    onChange('endAt', dateString ? dayjs(dateString).toISOString() : undefined);
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageDataUrlRef.current);
    };
  }, []);

  return (
    <Form layout='vertical' colon={false}>
      <RequireDot.Desc />
      <Form.Item
        label={
          <Text {...FORM_ITEM_LABEL_STYLE}>
            <RequireDot />
            이름
          </Text>
        }>
        <Input
          placeholder='배너명을 입력하세요.'
          name='imageAlt'
          value={formData.imageAlt}
          onChange={handleFormData}
        />
      </Form.Item>
      <Form.Item
        label={
          <Text {...FORM_ITEM_LABEL_STYLE}>
            <RequireDot />
            이미지
          </Text>
        }>
        <C.FormRowBox align='flex-start'>
          {(() => {
            const { image, file } = formData;

            if (!image && !file) return <p>파일을 선택해주세요.</p>;

            const src = () => {
              if (image) {
                return getImageUriFromId({ uuid: image, type: 'public', preview: true });
              }
              if (file) {
                const url = URL.createObjectURL(file);
                imageDataUrlRef.current = url;
                return url;
              }
            };

            return (
              <div>
                <C.BannerImg src={src()} />
              </div>
            );
          })()}
          <FileUploader
            isDropzone={false}
            accept={['.png', '.jpg', '.jpeg', '.gif']}
            upload={selectImage}
          />
        </C.FormRowBox>
      </Form.Item>
      <Form.Item
        label={
          <Text {...FORM_ITEM_LABEL_STYLE}>
            <RequireDot />
            이동 링크
          </Text>
        }>
        <Input
          placeholder='이동 링크를 입력하세요.'
          name='link'
          value={formData.link}
          onChange={handleFormData}
        />
      </Form.Item>
      <Form.Item label={<Text {...FORM_ITEM_LABEL_STYLE}>만료일</Text>}>
        <DatePicker
          format='YYYY-MM-DD HH:mm'
          placeholder='만료일을 선택해주세요.'
          showTime={{ format: 'HH:mm' }}
          showNow={false}
          showHour={true}
          showMinute={true}
          style={{ display: 'block' }}
          {...(formData.endAt && { defaultValue: dayjs(formData.endAt) })}
          onChange={handleDate}
        />
      </Form.Item>
    </Form>
  );
}

export default BannerForm;
