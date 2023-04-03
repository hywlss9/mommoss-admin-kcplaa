import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import { postVideo } from '@api/videos/postVideo';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import colors from '@constants/colors';

import Text from '@components/Text';

import NoPreview from '@assets/images/no-preview.png';

import type { CreateVideoData } from '@type/video';

const REQUIRE_DOT_MARGIN_RIGHT = { marginRight: '2px' };

const YOUTUBE_VIDEO_URL = 'https://www.youtube.com/watch?v=';

function CreateVideoModal() {
  const dispatch = useDispatch();

  const [videoInfo, setVideoInfo] = useState<CreateVideoData>({
    title: '',
    url: '',
    visible: true,
  });

  const thumbnailValue: string = useMemo(() => {
    const isUrl = videoInfo.url.includes(YOUTUBE_VIDEO_URL);
    return isUrl ? videoInfo.url.replace(YOUTUBE_VIDEO_URL, '') : '';
  }, [videoInfo.url]);

  const create = async () => {
    const { title, visible, url } = videoInfo;
    if (!title) {
      message.warning('동영상제목을 입력해주세요.');
      return;
    } else if (!url) {
      message.warning('연결 링크를 입력해주세요.');
      return;
    }

    let thumbnailUrl = '';
    if (thumbnailValue) thumbnailUrl = `https://i.ytimg.com/vi/${thumbnailValue}/maxresdefault.jpg`;

    const response = await postVideo({
      data: { title, visible, url, thumbnailUrl },
    });

    if (getIsResponseFalse(response)) return false;

    message.success('동영상이 추가되었습니다.');
    trigger('SUCCESS_CREATE_VIDEO');
    close();
  };

  const selectStatus = (value: boolean) => {
    setVideoInfo(prevState => ({ ...prevState, visible: value }));
  };

  const handleVideoInfo = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    setVideoInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const close = () => dispatch(closeModal('createVideo'));

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='send' type='primary' onClick={create}>
      추가
    </Button>,
  ];

  return (
    <Modal open={true} title='동영상 업로드' footer={footerBtns} width='800px' onCancel={close}>
      <Form layout='horizontal' colon={false} labelCol={{ span: 4 }} labelAlign='left'>
        <Text size={12} weight={500} color={colors.GRAY_STRONG_1}>
          <Text block={false} size={12} color={colors.RED_ORIGIN} style={REQUIRE_DOT_MARGIN_RIGHT}>
            *
          </Text>
          필수 항목
        </Text>
        <Form.Item
          label={
            <>
              <Text
                block={false}
                size={12}
                color={colors.RED_ORIGIN}
                style={REQUIRE_DOT_MARGIN_RIGHT}>
                *
              </Text>
              동영상제목
            </>
          }>
          <Input name='title' placeholder='동영상 제목을 입력하세요.' onChange={handleVideoInfo} />
        </Form.Item>
        <Form.Item
          label={
            <>
              <Text
                block={false}
                size={12}
                color={colors.RED_ORIGIN}
                style={REQUIRE_DOT_MARGIN_RIGHT}>
                *
              </Text>
              상태
            </>
          }>
          <Select
            onSelect={selectStatus}
            defaultValue={true}
            options={[
              { value: true, label: '공개' },
              { value: false, label: '비공개' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={
            <>
              <Text
                block={false}
                size={12}
                color={colors.RED_ORIGIN}
                style={REQUIRE_DOT_MARGIN_RIGHT}>
                *
              </Text>
              연결 링크
            </>
          }>
          <Input name='url' placeholder='URL을 입력하세요.' onChange={handleVideoInfo} />
        </Form.Item>
        <Form.Item label={'미리보기'}>
          {thumbnailValue ? (
            <embed
              width='380'
              height='215'
              src={`https://www.youtube.com/embed/${thumbnailValue}`}
              title='YouTube video preview'
            />
          ) : (
            <img src={NoPreview} width='380' height='215' alt='미리보기 이미지' />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateVideoModal;
