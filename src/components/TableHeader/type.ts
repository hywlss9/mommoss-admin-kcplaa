import type { ButtonProps } from 'antd';
import type { SearchProps } from 'antd/lib/input';

interface Button {
  text: string;
  border?: boolean;
  buttonProps?: ButtonProps;
}

interface TableHeaderProps {
  buttons?: Button[];
  searchInput?: boolean;
  inputProps?: SearchProps;
  rightButtons?: Omit<Button, 'border'>[];
}

export type { TableHeaderProps };
