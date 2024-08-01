import { ProductType } from "./types";

export type CustomProps = React.HTMLAttributes<HTMLInputElement> & {
  setSelectedValues: any;
  item: ProductType;
  inputAdetRefs: any;
  spanMaliyetRefs: any;
  indexNo: number;
  val: string;
  name: string;
  condition: boolean;
};
