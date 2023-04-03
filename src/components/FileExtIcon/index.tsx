import { useEffect, useState } from 'react';

import * as S from './styled';

function FileExtIcon({ text }: { text: string }) {
  const [ext, setExt] = useState<string>('');

  useEffect(() => {
    setExt(text.split('.').pop()?.toUpperCase() || '');
  }, [text]);

  return <S.FileExtIcon>{ext}</S.FileExtIcon>;
}

export default FileExtIcon;
