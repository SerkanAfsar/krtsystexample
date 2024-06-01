export type ElementType = {
  type:
    | "text"
    | "password"
    | "email"
    | "select"
    | "datepicker"
    | "customButtonGroup"
    | "number";
  title?: string;
  name: string;
  placeholder?: string | null;
  options?: CustomOptionType[] | null;
  required: boolean;
  requiredMessage?: string;
  span?: number;
  disabled?: boolean;
  relativeTo?: string;
  rightIcon?: string;
  value?: string;
  isCurrency?: boolean;
  checkBoxList?: string[];
  checkBoxSetValueItem?: string;
  pattern?: string;
  simgeturu?: "caratType";
  visibleRelative?: string;
  colStart?: string;
  colEnd?: string;
  spesificRelatedItem?: string;
  icon?: React.ReactNode;
};

export type CustomOptionType = {
  titleVal: string;
  valueVal: string;
  extraValue?: string;
};

export type LoginType = {
  email: string;
  password: string;
};
