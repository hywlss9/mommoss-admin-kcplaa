import { useState } from 'react';

import type { BannerData } from '@components/Modals/BannerFormModal/type';

function useBannerData() {
  const [bannerData, setBannerData] = useState<BannerData>({
    image: '',
    imageAlt: '',
    link: '',
    file: null,
  });

  return { bannerData, setBannerData };
}

export default useBannerData;
