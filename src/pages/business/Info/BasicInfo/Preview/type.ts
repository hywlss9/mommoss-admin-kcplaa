import type { Group } from '@type/group';

interface BusinessInfoPreviewProps {
  info: Group;
}

type PreviewType = 'home' | 'identity';

export type { BusinessInfoPreviewProps, PreviewType };
