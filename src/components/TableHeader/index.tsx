import { Fragment } from 'react';

import { Button, Divider, Input } from 'antd';

import * as S from './styled';
import type * as T from './type';

function TableHeader({ buttons, searchInput, inputProps, rightButtons }: T.TableHeaderProps) {
  return (
    <S.Header>
      <S.HeaderButtonBox>
        {buttons &&
          buttons.map(({ text, border, buttonProps }, index) => {
            return (
              <Fragment key={index}>
                <Button type='link' {...buttonProps}>
                  {text}
                </Button>
                {border && <Divider type='vertical' />}
              </Fragment>
            );
          })}
      </S.HeaderButtonBox>
      {rightButtons && (
        <S.RightButtonBox>
          {rightButtons.map(({ text, buttonProps }, index) => {
            return (
              <Button key={index} {...buttonProps}>
                {text}
              </Button>
            );
          })}
        </S.RightButtonBox>
      )}
      {searchInput && <Input.Search {...inputProps} />}
    </S.Header>
  );
}

export default TableHeader;
