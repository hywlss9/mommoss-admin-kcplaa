import { useState } from 'react';

import colors from '@constants/colors';

import Preview from '@components/Preview';

import Home from './Home';
import Identity from './Identity';
import type * as T from './type';

function BusinessInfoPreview({ info }: T.BusinessInfoPreviewProps) {
  const [previewType, setPreviewType] = useState<T.PreviewType>('home');

  const handlePreviewType = ({ key }: any) => setPreviewType(key);

  return (
    <Preview
      backgroundColor={colors.WHITE}
      menu={{
        items: [
          { key: 'home', label: '홈 화면' },
          { key: 'identity', label: '신분증' },
        ],
        selectedKey: previewType,
        onSelect: handlePreviewType,
      }}
      notPhone={previewType === 'identity'}>
      {previewType === 'home' && <Home info={info} />}
      {previewType === 'identity' && <Identity info={info} />}
    </Preview>
  );
}

export default BusinessInfoPreview;
