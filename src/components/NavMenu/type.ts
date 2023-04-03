import type { MenuProps } from 'antd';

import type { MenuRightButton } from '@components/MenuRightButtons/type';

interface MenuItem {
  key: string;
  label: string;
  badge?: number;
}

interface NavMenuProps extends MenuProps {
  items: MenuItem[];
  defaultKey: MenuItem['key'];
  navUrl?: string;
  rightButtons?: MenuRightButton[];
}

export type { NavMenuProps };
