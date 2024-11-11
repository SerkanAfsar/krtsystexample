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
import { useRef, useState } from "react";
import { ProductType } from "@/types/types";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";

export default function MucevherStokListesi() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const reactToPrintFn = useReactToPrint({ contentRef });

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
            {selectedType == MucevherYazdirmaList[0].valueVal && (
              <>
                <button
                  onClick={() => reactToPrintFn()}
                  className="mb-5 block w-full rounded-md bg-primary p-3 text-center font-bold uppercase text-white"
                >
                  YAZDIR
                </button>
                <div
                  ref={contentRef}
                  className="flex flex-wrap items-start justify-start gap-6"
                >
                  {selectedItemsforPrint.map(
                    (item: ProductType, index: number) => {
                      const etiketFiyati = Number(item.total_cost) * 4.55;
                      const toptanSatis = Number(item.total_cost) * 1.26;
                      return (
                        <table
                          key={index}
                          className=" table w-60 border-collapse flex-col text-center  text-sm"
                        >
                          <tbody className="[&>td]:p-3">
                            <tr>
                              <td className="flex h-50 justify-center border border-slate-300 p-3 text-center font-bold">
                                {item.image && (
                                  <Image
                                    src={item.image as string}
                                    width={400}
                                    height={240}
                                    alt={item.code as string}
                                    style={{ height: "160px", width: "auto" }}
                                  />
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-bold">
                                Kod {" :  "} {item.code}
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-bold">
                                B.Gr {" :  "} {item?.properties?.simple}
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3">
                                DIOMAND & STONES {" :  "}
                              </td>
                            </tr>

                            <tr>
                              <td className="border border-slate-300 p-3">
                                Taş Toplamları {" : "}
                                <span className="font-bold">
                                  {item.properties?.totalNumberOfStones} Adet{" "}
                                  {item.properties?.totalCarat} Ct.
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 bg-yellow-300 p-3 font-bold text-red">
                                ETİKET:{" "}
                                {new Intl.NumberFormat("us-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(etiketFiyati)}{" "}
                                $
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-bold text-green-600">
                                TOPTAN SATIŞ:{" "}
                                {new Intl.NumberFormat("us-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(toptanSatis)}{" "}
                                $
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-bold text-blue-500">
                                Atölye Maliyeti:{" "}
                                {new Intl.NumberFormat("us-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(Number(item.total_cost))}{" "}
                                $
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      );
                    },
                  )}
                </div>
                <button
                  onClick={() => reactToPrintFn()}
                  className="mt-5 block w-full rounded-md bg-primary p-3 text-center font-bold uppercase text-white"
                >
                  YAZDIR
                </button>
              </>
            )}
          </CustomModalPage>
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
