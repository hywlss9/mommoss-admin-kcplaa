import type { PropsWithChildren } from 'react';

interface MenuItem {
  key: any;
  label: string;
}

interface PreviewProps extends PropsWithChildren {
  backgroundColor?: string;
  menu?: {
    items: MenuItem[];
    selectedKey?: MenuItem['key'];
    onSelect?: (e: any) => void;
  };
  notPhone?: boolean;
}

export type { PreviewProps };
