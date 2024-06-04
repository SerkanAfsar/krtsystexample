import { FormSectionType } from "@/types/formTypes";
import FormElementItem from "./FormElementItem";
import { ClassValue } from "clsx";
import { cn } from "@/utils";

export default function SectionFormItem({
  section,
  data,
  register,
  setValue,
  setError,
  errors,
  productCode,
}: {
  section: FormSectionType;
  data: any;
  register: any;
  setValue: any;
  errors: any;
  setError: any;
  productCode?: string | null;
}) {
  return (
    <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className=" border-b border-stroke pb-4  dark:border-strokedark">
        <div className="flex w-full items-center justify-between">
          <h3 className="p-4 text-lg font-medium text-black dark:text-white">
            {section?.sectionTitle}
          </h3>
          <b className="mr-4 text-black">{productCode && productCode}</b>
        </div>
        <hr />

        <div
          className={cn(
            "grid gap-6 p-4",
            section.colsLenght
              ? `grid-cols-${section.colsLenght}`
              : "grid-cols-12",
          )}
        >
          {section?.elements.map((item, index) => (
            <FormElementItem
              register={register}
              setValue={setValue}
              errors={errors}
              key={item.name}
              item={item}
              data={data}
              setError={setError}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
