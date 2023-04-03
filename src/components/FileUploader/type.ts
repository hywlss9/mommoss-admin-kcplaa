import type { Dispatch, SetStateAction } from 'react';

interface FileUploaderProps {
  isDropzone?: boolean;
  text?: string;
  buttonText?: string;
  accept?: string[];
  setIsUpload?: Dispatch<SetStateAction<boolean>>;
  upload?: (files: FileList) => void;
}

export type { FileUploaderProps };
