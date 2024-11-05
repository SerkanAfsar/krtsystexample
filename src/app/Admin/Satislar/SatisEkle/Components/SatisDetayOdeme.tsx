import { CustomMoneyInput } from "@/components/CustomUI/CustomMoneyInput";
import CustomSelect from "@/components/CustomUI/CustomSelect";
import { SalePayment } from "@/types/Satis";
import { useCallback } from "react";

export default function SatisDetayOdeme({
  fields,
  append,
  remove,
  register,
  toplamOdenenTutar,
  toplamKalanTutar,
  toplamMaliyet,
  onSubmit,
}: {
  fields?: any;
  append: any;
  remove: any;
  register: any;
  setValue: any;
  toplamOdenenTutar: number;
  toplamKalanTutar: string;
  toplamMaliyet: number;
  onSubmit: any;
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
    <div className="flex w-full flex-col gap-3 rounded-md bg-white p-6">
      <div className="grid w-full grid-cols-4 gap-3 font-bold text-black">
        <div>Ödeme Yöntemi</div>
        <div>Ödenen Tutar</div>
        <div></div>
        <div>İşlemler</div>
      </div>
      {fields.map((item: SalePayment, index: number) => (
        <div
          key={`${index.toString()}_${item.payment_price}_${item.payment_type}`}
          className="grid w-full grid-cols-4 gap-3  text-black"
        >
          <div>
            <CustomSelect
              {...register(`payments.${index}.payment_type`)}
              firstOptionText="Ödeme Yöntemi Seçiniz"
              item={{
                name: `payments.${index}.payment_type`,
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
            <CustomMoneyInput
              item={{
                name: `payments.${index}.payment_price`,
                required: true,
                placeholder: "Ödenen Tutar",
                type: "money",
                isChanging: true,
                rightIcon: "$",
              }}
              {...register(`payments.${index}.payment_price`)}
              value={item.payment_price?.toString()}
            />
          </div>
          <div></div>
          {isShow(index) ? (
            <div className="col-span-1 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => remove(index)}
                className=" rounded-md bg-red p-3 px-4 font-bold text-white"
              >
                Sil
              </button>
              <button
                type="button"
                onClick={() =>
                  append({ payment_type: "", payment_price: null })
                }
                className="flex-1 rounded-md bg-primary p-2 text-white"
              >
                Ödeme Al
              </button>
            </div>
          ) : (
            <div className="col-span-1">
              <button
                type="button"
                onClick={() => remove(index)}
                className="h-full rounded-md bg-red p-3 px-4 font-bold text-white"
              >
                Sil
              </button>
            </div>
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
            Ödeme Al
          </button>
        </div>
      )}
      <div className="mt-3 grid w-full grid-cols-4 gap-3 text-black">
        <div></div>
        <div>
          <CustomMoneyInput
            item={{
              title: "Toplam Ödenen Tutar",
              name: "total_payment",
              required: false,
              type: "money",
              rightIcon: "$",
              isConstant: true,
            }}
            {...register("total_payment")}
            value={toplamOdenenTutar}
            isConstant={true}
            disabled={true}
          />
        </div>
        <div>
          <CustomMoneyInput
            item={{
              title: "Toplam Kalan Tutar",
              name: "total_notpayed",
              required: false,
              type: "money",
              rightIcon: "$",
              isConstant: true,
            }}
            isConstant={true}
            {...register("total_notpayed")}
            value={toplamKalanTutar.toString()}
            disabled={true}
          />
        </div>
        <div>
          <CustomMoneyInput
            item={{
              title: "TOPLAM ",
              name: "total_maliyet",
              required: false,
              type: "money",
              rightIcon: "$",
              isConstant: true,
            }}
            isConstant={true}
            {...register("total_maliyet")}
            value={toplamMaliyet.toString()}
            disabled={true}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={async () => await onSubmit()}
        className="mt-3 w-[260px] self-end rounded-md bg-primary p-3 font-bold text-white"
      >
        Satış Kaydet
      </button>
    </div>
  );
}
