import { SwitchProps } from '../../Switch/SwitchTypes';
import { BaseInputProps } from '../FormTypes';

export type FormSwitchProps = Omit<BaseInputProps, 'width'> &
  Omit<SwitchProps, 'label' | 'labelPos'>;
