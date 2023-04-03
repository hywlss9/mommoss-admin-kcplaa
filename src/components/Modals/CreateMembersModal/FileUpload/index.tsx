import colors from '@constants/colors';

import FileUploader from '@components/FileUploader';
import NumberTitle from '@components/NumberTitle';
import Text from '@components/Text';

import * as S from '../styled';
import type * as T from './type';

function FileUpload({ isUpload, setIsUpload, upload }: T.FileUploadProps) {
  return (
    <>
      <NumberTitle number={2} title='파일 등록' />
      <S.Box>
        <Text color={colors.GRAY_ORIGIN_2}>
          샘플 파일을 다운로드 받아 추가할 구성원 데이터를 입력해 주세요.
        </Text>
        <S.LinkBox>
          <Text weight={500}>
            <a href={`${process.env.PUBLIC_URL}/sampleExcel.csv`} download='sampleExcel'>
              CSV 샘플 다운로드
            </a>
          </Text>
          <Text weight={500}>
            <a href={`${process.env.PUBLIC_URL}/sampleExcel.xlsx`} download='sampleExcel'>
              XLSX 샘플 다운로드
            </a>
          </Text>
        </S.LinkBox>
        <FileUploader
          isUpload={isUpload}
          accept={['.csv, .xlsx']}
          setIsUpload={setIsUpload}
          upload={upload}
        />
      </S.Box>
    </>
  );
}

export default FileUpload;
