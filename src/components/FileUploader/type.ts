import type { Dispatch, SetStateAction } from 'react';

interface FileUploaderProps {
  text?: string;
  buttonText?: string;
  accept?: string[];
  isUpload?: boolean;
  setIsUpload?: Dispatch<SetStateAction<boolean>>;
  upload?: (files: FileList) => void;
}

export type { FileUploaderProps };
