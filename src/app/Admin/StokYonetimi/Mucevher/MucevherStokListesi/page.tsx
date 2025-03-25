"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";
import useGemProductData from "@/hooks/CustomDataHooks/useGetGemProductData";
import CustomErrorAlert from "@/components/CustomUI/Alerts/CustomErrorAlert";
import { MucevherListesiDataHeaders } from "@/types/Mucevher";
import CustomSelect from "@/components/CustomUI/CustomSelect";
import { MucevherYazdirmaList } from "@/utils/Mucevher.Utils";
import CustomModalPage from "@/components/CustomModals/CustomPageModal";
import React, { useRef, useState } from "react";
import { ProductType } from "@/types/types";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { cn, dolarFormat } from "@/utils";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function MucevherStokListesi() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null); 
  const [selectedType, setSelectedType] = useState<string>("");
  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef as React.RefObject<Element>,
  });

  const {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    setConfirmDelete,
    showConfirmDelete,
    setShowConfirmDelete,
    error,
    item,
    selectedItemsforPrint,
    isOpen,
    imgUrl,
    setIsOpen,
  } = useGemProductData("/Admin/StokYonetimi/Mucevher/MucevherEkle/");

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Mücevher Stok Listesi" />
      <CustomDeleteModal
        code={item?.productCode}
        showConfirmDelete={showConfirmDelete}
        setShowConfirmDelete={setShowConfirmDelete}
        modalTitle="Mücevheri Silmek İstediğinizden Emin misiniz?"
        modalDescription="Mücevher Kalıcı Olarak Silinecektir"
        setConfirmDelete={setConfirmDelete}
      />

      {error ? (
        <CustomErrorAlert title="Hata" description={error} />
      ) : (
        <div className="flex w-full flex-col gap-3">
          <CustomSelect
            item={{
              name: "name_sec",
              type: "select",
              options: MucevherYazdirmaList,
              required: false,
            }}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full"
            firstOptionText="Yazdırma Seçenekleri"
            outerClass="self-end w-60"
          />
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="block w-60 self-end rounded-md bg-primary p-3 font-bold text-white"
          >
            YAZDIR
          </button>

          <CustomModalPage
            title={`${selectedType} YAZDIRMA LİSTESİ`}
            modalDataValue={showModal}
            setModalDataValue={setShowModal}
            className="z-99999"
          >
            <>
              <button
                onClick={() => reactToPrintFn()}
                className="mb-5 block w-full rounded-md bg-primary p-3 text-center font-bold uppercase text-white"
              >
                YAZDIR
              </button>
              {selectedType && (
                <AltiliSecenekSection
                  ref={contentRef}
                  type={
                    selectedType as
                      | "6'lı Rapor"
                      | "24'lü Rapor"
                      | "Ana Maliyet"
                      | "P2"
                  }
                  selectedItemsforPrint={selectedItemsforPrint}
                />
              )}
              <button
                onClick={() => reactToPrintFn()}
                className="mt-5 block w-full rounded-md bg-primary p-3 text-center font-bold uppercase text-white"
              >
                YAZDIR
              </button>
            </>
          </CustomModalPage>

          {isOpen && (
            <Lightbox
              mainSrc={imgUrl as string}
              onCloseRequest={() => setIsOpen(false)}
            />
          )}
          <CustomDatatable
            totalPageCount={totalPageCount}
            columns={MucevherListesiDataHeaders}
            data={activeData}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      )}
    </DefaultLayout>
  );
}

const AltiliSecenekSection = React.forwardRef<
  HTMLDivElement,
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    selectedItemsforPrint: ProductType[];
    type: "6'lı Rapor" | "24'lü Rapor" | "Ana Maliyet" | "P2";
  }
>(({ selectedItemsforPrint, type, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      {...rest}
      className={cn(
        "!flex flex-wrap items-start justify-start",
        type == "6'lı Rapor" && "gap-6",
        type == "24'lü Rapor" && "gap-3",
      )}
    >
      {selectedItemsforPrint.map((item: ProductType, index: number) => {
        const etiketFiyati = Number(item.total_cost) * 4.55;
        const toptanSatis = Number(item.total_cost) * 1.26;
        const renkliTaslar = item?.product_inside?.filter(
          (a: any) => a.type == "ColoredStone",
        );
        const pirlantaTaslar = item?.product_inside?.filter(
          (a) => a.type == "Diamond",
        );
        return (
          <table
            key={index}
            className={cn(
              "table border-collapse flex-col text-center   ",
              type == "6'lı Rapor" && "w-60 text-sm [&_td]:p-2.5",
              type == "24'lü Rapor" && "h-60 w-30 text-xs [&_td]:p-1",
            )}
          >
            <tbody>
              {type == "6'lı Rapor" && (
                <tr>
                  <td className="border  border-slate-300  font-bold text-blue-500">
                    Atölye Maliyeti:{" "}
                    {dolarFormat(item.total_cost as number).replace("$", "")}
                  </td>
                </tr>
              )}

              <tr>
                <td className="border border-slate-300 font-bold">
                  Kod {" : "} {item.code}
                </td>
              </tr>
              <tr>
                <td
                  className={cn(
                    "border border-y-0 border-slate-300",
                    type == "6'lı Rapor" && "h-50",
                    type == "24'lü Rapor" && "h-30",
                  )}
                >
                  {item.image && (
                    <div className="flex h-full w-full items-center justify-center [&>img]:max-h-44  [&>img]:w-auto">
                      <Image
                        src={item.image as string}
                        width={400}
                        height={240}
                        alt={item.code as string}
                      />
                    </div>
                  )}
                </td>
              </tr>

              <tr>
                <td className="border border-slate-300  font-bold">
                  B.Gr {" :  "} {item?.properties?.simple}
                </td>
              </tr>

              <tr>
                <td className="h-10 border border-slate-300 text-xs">
                  {renkliTaslar?.map((item, index) => (
                    <span key={index} className="text-xs">
                      {item.product_code} {item.used_carat} {" - "}
                    </span>
                  ))}
                </td>
              </tr>

              <tr>
                <td className="h-10 border border-slate-300 text-xs">
                  {pirlantaTaslar?.map((item, index) => (
                    <span key={index} className="text-xs">
                      {item.product_code} {item.used_carat} {" - "}
                    </span>
                  ))}
                </td>
              </tr>
              {type == "6'lı Rapor" && (
                <>
                  <tr>
                    <td className="border border-slate-300 ">
                      Taş Toplamları {" : "}
                      <span className="font-bold">
                        {item.properties?.totalNumberOfStones} Adet{" "}
                        {Number(item.properties?.totalCarat)
                          .toFixed(2)
                          .replace(".", ",")}{" "}
                        Ct.
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-slate-300  font-bold text-green-600">
                      TOPTAN SATIŞ: {dolarFormat(toptanSatis).replace("$", "")}
                    </td>
                  </tr>
                </>
              )}

              <tr>
                <td className="border border-slate-300  font-bold text-red">
                  Etiket: {dolarFormat(etiketFiyati).replace("$", "")}
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
});
AltiliSecenekSection.displayName = "AltiliSecenekSection";
