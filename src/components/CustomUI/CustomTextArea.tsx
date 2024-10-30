import { cn } from "@/utils";
import { ClassValue } from "clsx";
import * as React from "react";
import { ElementType } from "../../types/inputTypes";

type CustomTextAreaProps = React.HTMLAttributes<HTMLTextAreaElement> & {
  placeholder?: string;
  outerClass?: ClassValue | null;
  err?: string | null;
  item: ElementType;
};

const CustomTextArea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextAreaProps
>(({ className, onChange, onBlur, outerClass, item, err, ...props }, ref) => {
  const [val, setVal] = React.useState<string>();
  return (
    <div className={cn("w-full", outerClass && outerClass, className)}>
      {item.title && (
        <label className="mb-2.5 block  font-medium text-black dark:text-white">
          {item.title}
        </label>
      )}

      <textarea
        {...props}
        ref={ref}
        cols={item.cols}
        rows={item.rows}
        value={val}
        onChange={(e) => {
          setVal(e.target.value.toLocaleUpperCase());
          onChange && onChange(e);
        }}
        placeholder={item.placeholder || item.title || ""}
        className={cn(
          "w-full rounded-md border border-stone-400 bg-white px-4.5 py-3 uppercase text-black placeholder:capitalize focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary",
          err && "border-red",
          className,
        )}
      ></textarea>
      {err && (
        <span className="mt-2 block w-full text-left text-sm text-red">
          {err}
        </span>
      )}
    </div>
  );
});
CustomTextArea.displayName = "CustomTextArea";

export default CustomTextArea;
