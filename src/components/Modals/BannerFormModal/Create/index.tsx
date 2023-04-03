import { Button, Modal, message } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import useBannerData from '@hooks/useBannerData';

import { createBanner } from '@api/banner';
import { uploadPublicFile } from '@api/file';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import BannerForm from '../Form';

function CreateBannerModal() {
  const dispatch = useDispatch();

  const close = () => dispatch(closeModal('createBanner'));

  const { bannerData, setBannerData } = useBannerData();

  const handleFormData = (name: string, value: any) => {
    setBannerData(prevState => ({ ...prevState, [name]: value }));
  };

  const create = async () => {
    const { imageAlt, link, file, endAt } = bannerData;
    console.log({ bannerData });

    if (!imageAlt || !file || !link) {
      message.warning('필수 항목을 모두 입력해주세요.');
      return false;
    }

    const protocolRegex = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
    if (!link.match(protocolRegex)) {
      message.warning('링크 주소 앞에 프로토콜(http://, https://)를 붙여주세요');
      return false;
    }

    const formData = new FormData();
    formData.append('file', bannerData.file as any);

    const imageUrl = await uploadPublicFile({ data: formData });
    if (getIsResponseFalse(imageUrl)) {
      message.warning('배너 이미지를 업로드하는데 실패하였습니다.');
      return false;
    }

    const response = await createBanner({
      data: { imageAlt, link, endAt, image: imageUrl as string, startAt: new Date().toString() },
    });

    if (getIsResponseFalse(response)) {
      message.warning('배너 추가를 실패하였습니다. 다시 시도해주세요.');
      return false;
    }

    message.success('배너가 추가되었습니다.');
    trigger('CREATED_BANNER');
    close();
  };

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button type='primary' key='ok' onClick={create}>
      생성
    </Button>,
  ];

  return (
    <Modal open={true} title='배너 정보' footer={footerBtns} width='800px' onCancel={close}>
      <BannerForm type='create' formData={bannerData} onChange={handleFormData} />
    </Modal>
  );
}

export default CreateBannerModal;
