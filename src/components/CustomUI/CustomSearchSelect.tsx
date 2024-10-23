import { useTedarikciModalData } from "@/store/useModalStore";
import { cn } from "@/utils";
import React from "react";
import Select from "react-select";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CustomSearchSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  React.ComponentPropsWithoutRef<typeof Select> & {
    title: string;
    onChange: any;
    newItem?: any;
    customOptions: any;
  }
>(({ className, title, customOptions, newItem, onChange, ...props }, ref) => {
  const basicOptions = customOptions || options;
  const newOptions = newItem ? [...basicOptions, newItem] : [...basicOptions];

  return (
    <div>
      <label className="mb-2 block w-full font-bold text-black">{title}</label>
      <Select
        onChange={onChange}
        ref={ref}
        options={newOptions}
        className={cn(className)}
        {...props}
      />
    </div>
  );
});
CustomSearchSelect.displayName = "CustomSearchSelect";

export { CustomSearchSelect };
