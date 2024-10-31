import CustomModalPage from "@/components/CustomModals/CustomPageModal";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import CustomInput from "@/components/CustomUI/CustomInput";
import { CustomMoneyInput } from "@/components/CustomUI/CustomMoneyInput";
import useGetSatisProductData from "@/hooks/SatisHooks/useGetSatisProductData";
import { SaleProductType } from "@/types/Satis";
import { SatisModalHeader } from "@/types/types";
import { useState } from "react";

export default function SatisDetayUrunler({
  fields,
  append,
  remove,
  register,
  toplamTutar,
  toplamMaliyet,
  products,
}: {
  fields?: any;
  append: any;
  remove: any;
  register: any;
  toplamTutar: number;
  toplamMaliyet: number;
  products: SaleProductType[];
}) {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const { activeData, activePage, totalPageCount, setActivePage, error } =
    useGetSatisProductData({
      append,
      remove,
    });

  return (
    <>
      <CustomModalPage
        title="Ürün Ekle"
        modalDataValue={modalOpened}
        setModalDataValue={setModalOpened}
      >
        {error ? (
          <div>{error}</div>
        ) : (
          <CustomDatatable
            totalPageCount={totalPageCount}
            columns={SatisModalHeader}
            data={activeData}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        )}
      </CustomModalPage>
      <div className="block w-full bg-white p-6">
        <div className="mb-3 grid w-full grid-cols-4 gap-3 font-bold text-black">
          <div>Ürün Kodu</div>
          <div>Ürün Tipi</div>
          <div>Maliyet</div>
          <div>Ürün Satış Fiyatı</div>
        </div>

        {fields.map((item: SaleProductType, index: number) => {
          const err =
            products[index].sales_price &&
            Number(
              products[index].sales_price
                .toString()
                .replace(".", "")
                .replace(",", "."),
            ) <
              Number(
                products[index].total_cost
                  ?.toString()
                  .replace(".", "")
                  .replace(",", "."),
              );

          return (
            <div
              key={`${item.product_id}_${index}`}
              className="mb-3 grid w-full grid-cols-4 gap-3 font-bold text-black"
            >
              <CustomInput
                item={{
                  disabled: true,
                  name: "txt_urunkodu",
                  required: false,
                  placeholder: "Ürün Kodu",
                  type: "text",
                }}
                disabled={true}
                value={item.code}
              />
              <CustomInput
                item={{
                  disabled: true,
                  name: "txt_uruntipi",
                  required: false,
                  placeholder: "Ürün Tipi",
                  type: "text",
                }}
                disabled={true}
                value={item.type}
              />

              <CustomMoneyInput
                item={{
                  disabled: true,
                  name: "txt_maliyet",
                  required: false,
                  placeholder: "Ürün Maliyeti",
                  type: "money",
                  rightIcon: "$",
                }}
                disabled={true}
                value={item.total_cost}
              />
              <div className="flex w-full gap-3">
                <CustomMoneyInput
                  item={{
                    name: `products.${index}.sales_price`,
                    required: true,
                    placeholder: "Ürün Maliyeti",
                    type: "money",
                    isChanging: true,
                    rightIcon: "$",
                  }}
                  {...register(`products.${index}.sales_price`)}
                  value={item.sales_price?.toString()}
                  err={err ? "Satış Fiyatı Malitetin Altında!" : null}
                />

                <button
                  className="flex items-center justify-center self-start rounded-md bg-red p-3 font-bold text-white"
                  onClick={() => remove(index)}
                >
                  Sil
                </button>
              </div>
            </div>
          );
        })}

        <div className="block w-full bg-white">
          <div className="mb-3 grid w-full grid-cols-4 gap-3  font-bold text-black">
            <div className="col-start-3 col-end-4 w-full justify-start self-end">
              <CustomMoneyInput
                item={{
                  title: "Toplam Tutar",
                  name: "total_deneme",
                  type: "money",
                  required: false,
                  isConstant: true,
                  disabled: true,
                  rightIcon: "$",
                }}
                value={toplamTutar.toString()}
                disabled={true}
              />
            </div>
            <div className="col-start-4 col-end-5 w-full justify-start self-end">
              <CustomMoneyInput
                item={{
                  title: "Toplam Satış Fiyatı",
                  name: "total_deneme",
                  type: "money",
                  required: false,
                  isConstant: true,
                  disabled: true,
                  rightIcon: "$",
                }}
                value={toplamMaliyet.toString()}
                disabled={true}
              />
            </div>
            <div
              className="col-start-4 col-end-5  flex h-fit w-full cursor-pointer items-center justify-center self-end rounded-md bg-primary p-3 text-white"
              onClick={() => setModalOpened(true)}
            >
              Ekle
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
