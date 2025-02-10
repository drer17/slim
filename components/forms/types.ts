import { DialogWrapperProps } from "../core/other/dialog-wrapper";

export type FormKwargs<T> = {
  callback: (data: T) => void;
  defaults: T;
  disabled?: boolean;
};

export type FormProps<T> = DialogWrapperProps & FormKwargs<T>;
