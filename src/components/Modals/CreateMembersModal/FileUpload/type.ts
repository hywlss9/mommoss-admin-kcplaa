import type { Dispatch, SetStateAction } from 'react';

interface FileUploadProps {
  isUpload: boolean;
  setIsUpload: Dispatch<SetStateAction<boolean>>;
  upload: (files: FileList) => void;
}

export type { FileUploadProps };
