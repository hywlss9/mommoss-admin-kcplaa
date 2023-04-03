import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { uploadPublicFile } from '@api/file';

import type * as T from './type';

function TextEditor({ value, onChange }: T.TextEditorProps) {
  const uploadAdapter = (loader: any) => {
    return {
      upload() {
        return new Promise(resolve => {
          loader.file.then(async (file: any) => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadPublicFile({ data: formData });

            resolve({ default: `/api/v1/files/public/${response}?preview=true` });
          });
        });
      },
    };
  };

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        extraPlugins: [uploadPlugin],
      }}
      onReady={(editor: any) => {
        console.log('editor ready', { editor });
        editor.data.set(value || '');
      }}
      onChange={async (event: any, editor: any) => {
        console.log({ event, editor }, editor.getData());
        const data: any = await editor.getData();

        await onChange(data);
      }}
    />
  );
}

export default TextEditor;
