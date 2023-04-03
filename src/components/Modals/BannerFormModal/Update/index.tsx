import { useEffect, useState } from 'react';

import { Button, Modal, message } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import useBannerData from '@hooks/useBannerData';

import { getBanner, updateBanner } from '@api/banner';
import { uploadPublicFile } from '@api/file';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import BannerForm from '../Form';
import type * as T from './type';

function UpdateBannerModal({ bannerId }: T.UpdateBannerModalProps) {
  const dispatch = useDispatch();

  const close = () => dispatch(closeModal('updateBanner'));

  const { bannerData, setBannerData } = useBannerData();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const handleFormData = (name: string, value: any) => {
    setBannerData(prevState => ({ ...prevState, [name]: value }));
  };

  const update = async () => {
    const { imageAlt, image, link, endAt, file } = bannerData;
    console.log({ bannerData });

    if (!imageAlt || (!file && !image) || !link) {
      message.warning('필수 항목을 모두 입력해주세요.');
      return false;
    }

    const protocolRegex = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
    if (!link.match(protocolRegex)) {
      message.warning('링크 주소 앞에 프로토콜(http://, https://)를 붙여주세요');
      return false;
    }

    let imageUrl = image;
    if (bannerData.file) {
      const formData = new FormData();
      formData.append('file', bannerData.file as any);

      imageUrl = (await uploadPublicFile({ data: formData })) as string;
      if (getIsResponseFalse(imageUrl)) {
        message.warning('배너 이미지를 업로드하는데 실패하였습니다.');
        return false;
      }
    }

    const response = await updateBanner({
      path: { groupBannerId: bannerId },
      data: {
        imageAlt,
        link,
        endAt,
        ...(image && { image: imageUrl }),
      },
    });

    if (getIsResponseFalse(response)) {
      message.warning('배너 추가를 실패하였습니다. 다시 시도해주세요.');
      return false;
    }

    message.success('배너가 수정되었습니다.');
    trigger('UPDATED_BANNER');
    close();
  };

  useEffect(() => {
    const getBannerData = async () => {
      const response = await getBanner({ path: { groupBannerId: bannerId } });

      if (getIsResponseFalse(response)) {
        message.warning('배너 정보를 불러오지 못했습니다. 다시 시도해주세요.');
        return false;
      }

      console.log({ response });

      const { image, imageAlt, link, endAt } = response;
      setBannerData({
        image,
        imageAlt,
        link,
        endAt: typeof endAt === 'string' ? endAt : undefined,
        file: null,
      });
      setIsLoading(false);
    };

    getBannerData();
  }, [bannerId]);

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button type='primary' key='ok' onClick={update}>
      수정
    </Button>,
  ];

  return (
    <Modal open={true} title='배너 정보' footer={footerBtns} width='800px' onCancel={close}>
      {isLoading ? (
        '로딩 중...'
      ) : (
        <BannerForm type='update' formData={bannerData} onChange={handleFormData} />
      )}
    </Modal>
  );
}

export default UpdateBannerModal;
