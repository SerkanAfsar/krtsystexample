import { CustomMoneyInput2 } from "@/components/CustomUI/CustomMoneyInput2";
import CustomSelect from "@/components/CustomUI/CustomSelect";

import { useCallback } from "react";

export default function SatisDetayIade({
  fields,
  append,
  remove,
  register,
  setValue,
}: {
  fields?: any;
  append: any;
  remove: any;
  register: any;
  setValue: any;
}) {
  const isShow = useCallback(
    (indexNo: number | undefined): boolean => {
      if ((!indexNo && !fields.length) || fields.length - 1 == indexNo)
        return true;
      return false;
    },
    [fields],
  );

  return (
    <div className="flex flex-col gap-5 rounded-md bg-white p-6">
      <h2 className="block w-full text-left text-xl font-bold text-[#000]">
        İade Bilgileri
      </h2>
      <div className="flex w-full flex-col gap-3 rounded-md bg-white">
        <div className="grid w-full grid-cols-4 gap-3 font-bold text-black">
          <div>İade Yöntemi</div>
          <div>İade Tutar</div>
          <div></div>
          <div>İşlemler</div>
        </div>
        {fields.map((item: any, index: number) => (
          <div
            key={item.id}
            className="grid w-full grid-cols-4 gap-3  text-black"
          >
            <div>
              <CustomSelect
                {...register(`refund_details.${index}.payment_type`)}
                firstOptionText="İade Yöntemi Seçiniz"
                disabled={item.isExist}
                item={{
                  name: `refund_details.${index}.payment_type`,
                  required: true,
                  type: "select",
                  options: [
                    {
                      titleVal: "Nakit",
                      valueVal: "Nakit",
                    },
                    {
                      titleVal: "Kredi Kartı",
                      valueVal: "Kredi Kartı",
                    },
                  ],
                }}
              />
            </div>
            <div>
              <CustomMoneyInput2
                item={{
                  name: `refund_details.${index}.payment_price`,
                  required: true,
                  placeholder: "İade Tutar",
                  type: "money",
                  isChanging: true,
                  rightIcon: "$",
                }}
                disabled={item.isExist}
                {...register(`refund_details.${index}.payment_price`, {
                  valueAsNumber: true,
                })}
                setFormValues={setValue}
                value={item.payment_price}
              />
            </div>
            <div></div>
            {isShow(index) ? (
              <div className="col-span-1 flex justify-between gap-3">
                {!item.isExist && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className=" rounded-md bg-red p-3 px-4 font-bold text-white"
                  >
                    Sil
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    append({ payment_type: "", payment_price: null })
                  }
                  className="flex-1 rounded-md bg-primary p-2 text-white"
                >
                  İade Al
                </button>
              </div>
            ) : (
              !item.isExist && (
                <div className="col-span-1">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="h-full rounded-md bg-red p-3 px-4 font-bold text-white"
                  >
                    Sil
                  </button>
                </div>
              )
            )}
          </div>
        ))}
        {isShow(undefined) && (
          <div className="grid w-full grid-cols-4 gap-3  text-black">
            <div className="col-span-3"></div>
            <button
              type="button"
              onClick={() => append({ payment_type: "", payment_price: null })}
              className="col-span-1 rounded-md bg-primary p-3 font-bold text-white"
            >
              İade Al
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
