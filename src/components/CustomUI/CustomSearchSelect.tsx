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
  }
>(({ className, title, onChange, ...props }, ref) => {
  return (
    <div>
      <label className="mb-2 block w-full font-bold text-black">{title}</label>
      <Select
        onChange={onChange}
        ref={ref}
        options={props.options || options}
        className={cn(className)}
        {...props}
      />
    </div>
  );
});
CustomSearchSelect.displayName = "CustomSearchSelect";

export { CustomSearchSelect };
