import type { ButtonProps } from 'antd';

interface MenuRightButton extends ButtonProps {
  text: string;
}

interface MenuRightButtonsProps {
  buttons: MenuRightButton[];
}

export type { MenuRightButton, MenuRightButtonsProps };
