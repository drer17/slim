import { Slug } from "@/lib/definitions/response";
import { DialogWrapperProps } from "../core/other/dialog-wrapper";

export type FormKwargs<T> = {
  callback?: (data: T) => void;
  defaults?: T;
  disabled?: boolean;
  slug?: Slug;
};

export type FormProps<T> = DialogWrapperProps & FormKwargs<T>;

export enum FormDialog {
  ASSET_LIABILITY,
  OBLIGATION,
  ENTITY,
  TRANSACTION,
  VALUATION,
  OCCURRENCE,
  OBLIGATION_RULE,
}
