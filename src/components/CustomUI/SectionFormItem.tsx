import { FormSectionType } from "@/types/formTypes";
import FormElementItem from "./FormElementItem";
import { ClassValue } from "clsx";
import { cn } from "@/utils";

export default function SectionFormItem({
  section,
  data,
  register,
  setValue,
  errors,
}: {
  section: FormSectionType;
  data: any;
  register: any;
  setValue: any;
  errors: any;
}) {
  return (
    <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke pb-4  dark:border-strokedark">
        <h3 className="p-4 text-lg font-medium text-black dark:text-white">
          {section?.sectionTitle}
        </h3>
        <hr />

        <div className={"grid grid-cols-12 gap-6 p-4"}>
          {section?.elements.map((item, index) => (
            <FormElementItem
              register={register}
              setValue={setValue}
              errors={errors}
              key={item.name}
              item={item}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
