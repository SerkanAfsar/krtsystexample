import UrunGruplariModul, {
  UrunGruplariModulType,
} from "@/components/IsEmirleri/UrunGruplariModul";
import { ModalHeaders, ModalPirlantaDataHeader } from "../../types/types";
import usePirlanModalData from "@/hooks/usePirlantaModalData";
import useRenkliTasModalData from "@/hooks/useRenkliTasModalData";

const UrunGruplari: UrunGruplariModulType[] = [
  {
    buttonText: "Sade Ekle ",
    headerColumns: ["Maden", "Renk", "Gram", "Has", "Model", "Maliyet"],
    title: "Sade",
    // modalHeaderColumns: ModalPirlantaDataHeader,
    // tableFunction: usePirlanModalData,
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
    tableFunction: usePirlanModalData,
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
