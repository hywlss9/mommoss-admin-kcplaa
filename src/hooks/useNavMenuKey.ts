import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

function useNavMenuKey<T>(defaultNavMenuKey: T) {
  const location = useLocation();

  const [navMenuKey, setNavMenuKey] = useState<T>(defaultNavMenuKey);

  useEffect(() => {
    const params = location.search
      .replace(/\?/, '')
      .split('&')
      .map(v => {
        const [key, value] = v.split('=');
        return { [key]: value };
      });

    const findMenu = params.find(v => Object.keys(v).includes('menu')) as { menu: T } | undefined;

    if (typeof findMenu !== 'undefined') {
      setNavMenuKey(findMenu.menu);
    }
  }, [location]);

  return navMenuKey;
}

export default useNavMenuKey;
