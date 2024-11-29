import CustomModalPage from "@/components/CustomModals/CustomPageModal";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import CustomInput from "@/components/CustomUI/CustomInput";
import { CustomMoneyInput } from "@/components/CustomUI/CustomMoneyInput";
import useGetSatisProductData from "@/hooks/SatisHooks/useGetSatisProductData";
import { SaleProductType } from "@/types/Satis";
import { SatisModalHeader } from "@/types/types";
import { cn } from "@/utils";
import { useState } from "react";

export default function SatisDetayUrunler({
  fields,
  append,
  remove,
  register,
  toplamTutar,
  toplamMaliyet,
  products,
  toplamKarat,
  isEdit = false,
  setEditIadeProductIdList,
  editIadeProductIdList,
  refundedProductIdList,
}: {
  fields?: any;
  append: any;
  remove: any;
  register: any;
  toplamTutar: number;
  toplamMaliyet: number;
  products: SaleProductType[];
  toplamKarat: number;
  isEdit?: boolean;
  setEditIadeProductIdList?: any;
  editIadeProductIdList?: number[];
  refundedProductIdList?: number[];
}) {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const filterList: any = [
    { title: "Mücevher", value: "Gem" },
    { title: "Renkli Taş", value: "ColoredStone" },
    { title: "Pırlanta", value: "Diamond" },
  ];
  const [selectedFilter, setSelectedFilter] = useState<any>({
    title: "Mücevher",
    value: "Gem",
  });
  const {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    error,
    setSelectedIds,
  } = useGetSatisProductData({
    append,
    remove,
    type: selectedFilter.value || "Gem",
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
            filterList={filterList}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        )}
      </CustomModalPage>
      <div className="flex flex-col gap-5 rounded-md bg-white p-6">
        <h2 className="block w-full text-left text-xl font-bold text-[#000]">
          Ürün Bilgileri
        </h2>
        <div className="block w-full rounded-md bg-white">
          <div className="mb-3 grid w-full grid-cols-11 gap-3 font-bold text-black">
            <div className="col-span-2">Ürün Kodu</div>
            <div className="col-span-1">Ürün Tipi</div>
            <div className="col-span-1">Karat</div>
            <div className="col-span-2">Maliyet</div>
            <div className="col-span-2">Etiket Fiyatı</div>
            <div className="col-span-3">Ürün Satış Fiyatı</div>
          </div>

          {fields.map((item: SaleProductType, index: number) => {
            const { sales_price, total_cost, product_id } = products[index];
            const isInIade =
              isEdit &&
              editIadeProductIdList?.find((a) => a == product_id) != null;

            const isDisabed =
              refundedProductIdList &&
              refundedProductIdList?.findIndex((a) => a == product_id) > -1;

            const err =
              sales_price &&
              Number(
                sales_price.toString().replace(".", "").replace(",", "."),
              ) < Number(total_cost);

            return (
              <div
                key={`${item.product_id}_${index}`}
                className="grid w-full grid-cols-11 gap-3 border-b border-x-graydark py-5 font-bold text-black"
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
                  className={"col-span-2"}
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
                  className={cn(
                    "col-span-1 self-start !rounded-md !text-white",
                    item.type == "Renkli Taş"
                      ? "!bg-red"
                      : item.type == "Pırlanta"
                        ? "!bg-blue-700"
                        : "!bg-green-600",
                  )}
                  disabled={true}
                  value={item.type}
                />
                <CustomInput
                  item={{
                    disabled: true,
                    name: "used_carat",
                    required: true,
                    placeholder: "Karat Değeri",
                    type: "number",
                    min: 0,
                  }}
                  min={0}
                  {...register(`products.${index}.used_carat`, {
                    valueAsNumber: true,
                  })}
                  className="col-span-1"
                  disabled={item.type == "Mücevher" || isEdit}
                />

                <CustomMoneyInput
                  item={{
                    disabled: true,
                    name: "txt_maliyet",
                    required: false,
                    placeholder: "Satış Fiyatı",
                    type: "money",
                    rightIcon: "$",
                  }}
                  className={"col-span-2"}
                  disabled={true}
                  value={item.total_cost?.toFixed(2)}
                />
                <CustomMoneyInput
                  item={{
                    disabled: true,
                    name: "txt_etiketFiyati",
                    required: false,
                    placeholder: "Etiket Fiyatı",
                    type: "money",
                    rightIcon: "$",
                  }}
                  className={"col-span-2"}
                  disabled={true}
                  value={Number((item.total_cost as number) * 4.55).toFixed(2)}
                />
                <div className="col-span-3 flex w-full gap-3">
                  <CustomMoneyInput
                    item={{
                      name: `products.${index}.sales_price`,
                      required: true,
                      placeholder: "Satış Fiyatı",
                      type: "money",
                      isChanging: true,
                      rightIcon: "$",
                    }}
                    {...register(`products.${index}.sales_price`)}
                    value={item.sales_price}
                    err={err ? "Satış Fiyatı Malitetin Altında!" : null}
                    disabled={isEdit}
                  />
                  {!isEdit ? (
                    <button
                      className="flex items-center justify-center self-start rounded-md bg-red p-3 font-bold text-white"
                      onClick={() => {
                        setSelectedIds((prev: any) =>
                          prev.filter(
                            (a: number) => a != Number(item.product_id),
                          ),
                        );
                        remove(index);
                      }}
                    >
                      Sil
                    </button>
                  ) : isInIade ? (
                    <button
                      disabled={isDisabed}
                      className="flex w-40 items-center justify-center self-start rounded-md bg-warning p-3 font-normal text-white"
                      onClick={() =>
                        setEditIadeProductIdList((prev: number[]) =>
                          prev.filter((a) => a != product_id),
                        )
                      }
                    >
                      {isDisabed ? "İade Edilmiş" : "Geri Al"}
                    </button>
                  ) : (
                    <button
                      className="flex w-40 items-center justify-center self-start rounded-md bg-red p-3 font-normal text-white"
                      onClick={() => {
                        setEditIadeProductIdList((prev: number[]) => [
                          ...prev,
                          product_id,
                        ]);
                      }}
                    >
                      İade Et
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <div className="block w-full bg-white">
            <div className="mb-3 grid w-full grid-cols-11 gap-3 py-5  font-bold text-black">
              <CustomInput
                item={{
                  disabled: true,
                  name: "toplam_karat",
                  required: true,
                  placeholder: "Karat Değeri",
                  type: "number",
                  min: 0,
                  title: "Toplam Karat",
                }}
                min={0}
                className={"col-start-4 col-end-5"}
                value={toplamKarat}
                disabled={true}
              />
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
                className={"col-start-5 col-end-7"}
                value={toplamTutar.toFixed(2)}
                disabled={true}
              />
              <CustomMoneyInput
                item={{
                  title: "Toplam Etiket Fiyatı",
                  name: "total_etiketFiyati",
                  type: "money",
                  required: false,
                  isConstant: true,
                  disabled: true,
                  rightIcon: "$",
                }}
                className={"col-start-7 col-end-9"}
                value={Number(Number(toplamTutar) * 4.55).toFixed(2)}
                disabled={true}
              />
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
                className={"col-start-9 col-end-12"}
                value={toplamMaliyet.toFixed(2)}
                disabled={true}
              />
              {!isEdit && (
                <div
                  className="col-start-9 col-end-12  flex h-fit w-full cursor-pointer items-center justify-center self-end rounded-md bg-primary p-3 text-white"
                  onClick={() => setModalOpened(true)}
                >
                  Ekle
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
