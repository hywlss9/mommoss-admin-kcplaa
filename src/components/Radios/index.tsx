import { Radio } from 'antd';

import type * as T from './type';

function Radios({ options, value, type = 'default', onChange, ...props }: T.RadiosProps) {
  return (
    <Radio.Group
      {...props}
      {...(type === 'button' && { className: 'ant-radio-button-group' })}
      optionType={type}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

export default Radios;
