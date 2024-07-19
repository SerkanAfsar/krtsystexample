import UrunGruplariModul, {
  UrunGruplariModulType,
} from "@/components/IsEmirleri/UrunGruplariModul";
import { ModalHeaders, ModalSadeHeaders } from "../../types/types";

import usePirlantaModalData from "@/hooks/ModalDataHooks/usePirlantaModalData";
import useRenkliTasModalData from "@/hooks/ModalDataHooks/useRenkliTasModalData";
import useSadeModalData from "@/hooks/ModalDataHooks/useSadeModalData";

const UrunGruplari: UrunGruplariModulType[] = [
  {
    buttonText: "Sade Ekle ",
    headerColumns: ["Maden", "Renk", "Gram", "Has", "Model", "Maliyet"],
    title: "Sade",
    modalHeaderColumns: ModalSadeHeaders,
    tableFunction: useSadeModalData,
  },
  {
    buttonText: "Renkli Taş Ekle",
    headerColumns: ["Kesim", "Karat", "Berraklık", "Renk", "Adet", "Maliyet"],
    title: "Renkli Taş ",
    modalHeaderColumns: ModalHeaders,
    tableFunction: useRenkliTasModalData,
  },
  {
    buttonText: "Pırlanta Ekle",
    headerColumns: ["Kesim", "Karat", "Berraklık", "Renk", "Adet", "Maliyet"],
    title: "Pırlanta ",
    modalHeaderColumns: ModalHeaders,
    tableFunction: usePirlantaModalData,
  },
];

export default function IsEmriContainer() {
  return (
    <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className=" border-b border-stroke pb-4  dark:border-strokedark">
        <div className="flex w-full items-center justify-between">
          <h3 className="p-4 text-lg font-medium text-black dark:text-white">
            İş Emri Bilgileri
          </h3>
          <b className="mr-4 text-black"></b>
        </div>
        <hr />
        <div className="flex flex-col gap-16 p-3">
          {UrunGruplari.map((item, index) => (
            <UrunGruplariModul item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
