import type { BannerData, BannerDataKey } from '../type';

interface FormProps {
  type: 'create' | 'update';
  formData: BannerData;
  onChange: (name: BannerDataKey, value: any) => void;
}

export type { FormProps };
