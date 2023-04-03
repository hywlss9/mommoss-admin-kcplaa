import type { Dispatch, SetStateAction } from 'react';

import type { DataNode } from 'antd/lib/tree';

import type { Organization } from '@type/group';

interface OrganizationTreeProps {
  setSelectedOrganizationId: Dispatch<SetStateAction<any>>;
  height?: number;
}

type Children = DataNode & { parentId: Organization['parentId'] } & { children: Children[] };
type OrganizationToDataNode = DataNode & { parentId: Organization['parentId'] } & {
  children: Children[];
};

export type { OrganizationTreeProps, OrganizationToDataNode };
