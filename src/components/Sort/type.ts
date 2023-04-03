import type { PropsWithChildren } from 'react';

interface SortProps extends PropsWithChildren<any> {
  title: string;
  dir: 'desc' | 'asc' | undefined;
}

export type { SortProps };
