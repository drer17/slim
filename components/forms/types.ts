import { Slug } from "@/lib/definitions/response";
import { DialogWrapperProps } from "../core/other/dialog-wrapper";

export type FormKwargs<T> = {
  callback?: (data: T) => void;
  preCallback?: (data: T) => Slug;
  defaults?: T;
  disabled?: boolean;
  slug?: Slug;
};

export type FormProps<T> = DialogWrapperProps & FormKwargs<T>;

export enum FormDialog {
  ASSET_LIABILITY,
  ASSET_LIABILITY_TYPE,
  OBLIGATION,
  ENTITY,
  TRANSACTION,
  TRANSACTION_CATEGORY,
  VALUATION,
  OCCURRENCE,
  OBLIGATION_RULE,
  ATTRIBUTE,
}
