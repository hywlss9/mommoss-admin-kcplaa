import { path } from '@constants/path';

interface GetImageUriFromId {
  uuid: string;
  type: 'group' | 'user' | 'public';
  converted?: boolean;
  preview?: boolean;
}

function isPreview(preview: boolean) {
  return preview ? '?preview=true' : '';
}

function isConverted(converted?: boolean) {
  return converted ? '?converted=true' : '';
}

const DEFAULT_URL = `${path.api}/api/v1/files`;

function getImageUriFromId({ uuid, type, converted, preview = false }: GetImageUriFromId): string {
  if (!type) return '';

  return `${DEFAULT_URL}/${type}/${uuid}${isPreview(preview)}${isConverted(converted)}`;
}

export default getImageUriFromId;
