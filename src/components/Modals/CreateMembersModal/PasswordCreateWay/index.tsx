import { useEffect, useState } from 'react';

import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

import colors from '@constants/colors';

import NumberTitle from '@components/NumberTitle';
import Text from '@components/Text';

import { Box } from '../styled';
import type * as T from './type';

const RadioOptions = [
  { label: '자동으로 생성', value: 0 },
  { label: '관리자가 등록', value: 1 },
];
function PasswordCreateWay({ type, setType }: T.PasswrodCreateWayProps) {
  const [value, setValue] = useState<number>(0);

  const handleRadioValue = ({ target: { value } }: RadioChangeEvent) => {
    switch (value) {
      case 0: {
        setType('auto');
        return;
      }
      case 1: {
        setType('manual');
        return;
      }
    }
  };

  useEffect(() => {
    switch (type) {
      case 'auto': {
        setValue(0);
        return;
      }
      case 'manual': {
        setValue(1);
        return;
      }
    }
  }, [type]);

  return (
    <>
      <NumberTitle number={1} title='비밀번호 생성 방식' />
      <Box>
        <Text color={colors.GRAY_ORIGIN_2}>
          비밀번호를 어떤 방식으로 생성할 것인지 선택해 주세요.
        </Text>
        <Radio.Group options={RadioOptions} defaultValue={value} onChange={handleRadioValue} />
      </Box>
    </>
  );
}

export default PasswordCreateWay;
