import type { CheckboxOptionType, RadioChangeEvent, RadioGroupProps } from 'antd';

interface RadiosProps extends RadioGroupProps {
  options: CheckboxOptionType[];
  type?: 'default' | 'button';
  onChange?: (e: RadioChangeEvent) => void;
}

export type { RadiosProps };
