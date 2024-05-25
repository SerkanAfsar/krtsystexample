export type ElementType = {
  type: "text" | "password" | "email" | "select";
  title: string;
  name: string;
  placeholder?: string | null;
  options?: CustomOptionType[] | null;
  required: boolean;
  requiredMessage?: string;
};

export type CustomOptionType = {
  titleVal: string;
  valueVal: string;
};

export type LoginType = {
  email: string;
  password: string;
};
