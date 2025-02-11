"use client";
import CustomForm from "@/components/CustomUI/CustomForm";
import { AddStoneSections } from "@/utils/MockData";
import { AddDiamondType } from "../types/formTypes";
import { useCallback, useState, useEffect } from "react";
import { FormSectionType } from "../types/formTypes";
import { toast } from "react-toastify";

import usePirlantaCode, {
  PirlantaCodeItemType,
} from "@/hooks/CodeHooks/usePirlantaCode";
import {
  AddProductApiService,
  UpdateProductApiService,
} from "@/ApiServices/Products.ApiService";
import CustomModalPage from "@/components/CustomModals/CustomPageModal";
import TedarikciDetayContainer from "./TedarikciDetayContainer";
import { useTedarikciModalData } from "@/store/useModalStore";

const PirlantaDetayContainer = ({
  pirlantaItemData,
  isAdd,
}: {
  pirlantaItemData: (AddDiamondType & { code?: string }) | null;
  isAdd: boolean;
}) => {
  const diamondItem: AddDiamondType = pirlantaItemData ?? {};
  const [data, setData] = useState<AddDiamondType>(diamondItem);
  const [activeStep, setActiveStep] = useState<number>(0);
  const { tedarikciModal, setTedarikciModalOpen } = useTedarikciModalData();
  const [stoneSections, setStoneSections] =
    useState<FormSectionType[]>(AddStoneSections);
  const validateKaratSum = (
    karat1: string,
    karat2: string,
    karat3: string,
    carat: string,
  ) => {
    const karat1Value = Number(karat1?.replace(",", ".")) || 0;
    const karat2Value = Number(karat2?.replace(",", ".")) || 0;
    const karat3Value = Number(karat3?.replace(",", ".")) || 0;
    const caratValue = Number(carat) || 0;

    if (karat1Value + karat2Value + karat3Value > caratValue) {
      toast.error("Karatların toplamı, toplam karat değerinden büyük olamaz!", {
        position: "top-right",
      });
      return true;
    }
    return false;
  };

  const resultCallBack = useCallback(
    (value: any) => {
      const iskonto = Number(value?.iskonto || 0);
      const rapaportPrice =
        value.menstrual_status == "Sertifikalı" ? value?.rapaportPrice : 4700;

      if (value.menstrual_status == "Sertifikasız") {
        if (value.boy === "00" && value.pricePerCarat) {
          value.elek1 = "60-80";
          value.carpan1 = "1.10";
          value.elek2 = "80-100";
          value.carpan2 = "1.00";
          value.elek3 = "100-125";
          value.carpan3 = "0.92";
          if (
            validateKaratSum(
              value?.karat1,
              value?.karat2,
              value?.karat3,
              value?.carat,
            )
          ) {
            return;
          }
        } else if (value.boy === "0.01-0.03" && value.pricePerCarat) {
          value.elek1 = "130-140";
          value.carpan1 = "0.92";
          value.elek2 = "140-160";
          value.carpan2 = "1.00";
          value.elek3 = "160-165";
          value.carpan3 = "1.10";
          if (
            validateKaratSum(
              value?.karat1,
              value?.karat2,
              value?.karat3,
              value?.carat,
            )
          ) {
            return;
          }
        } else if (value.boy === "0.03-0.07" && value.pricePerCarat) {
          value.elek1 = "170-190";
          value.carpan1 = "0.92";
          value.elek2 = "190-220";
          value.carpan2 = "1.00";
          value.elek3 = "220-265";
          value.carpan3 = "1.10";
          if (
            validateKaratSum(
              value?.karat1,
              value?.karat2,
              value?.karat3,
              value?.carat,
            )
          ) {
            return;
          }
        } else if (value.boy === "0.08-0.13" && value.pricePerCarat) {
          value.elek1 = "270-290";
          value.carpan1 = "0.92";
          value.elek2 = "290-310";
          value.carpan2 = "1.00";
          value.elek3 = "310-320";
          value.carpan3 = "1.10";
          if (
            validateKaratSum(
              value?.karat1,
              value?.karat2,
              value?.karat3,
              value?.carat,
            )
          ) {
            return;
          }
        }
      }

      const pricePerCarat =
        value.menstrual_status == "Sertifikalı"
          ? (rapaportPrice * (100 - iskonto)) / 100
          : Number(value.pricePerCarat);

      const total_costOne = Number(pricePerCarat) * Number(value?.carat);

      const anaMaliyetPPC = (Number(pricePerCarat) * 1.1).toFixed(2);
      const total_maliyet = (
        Number(pricePerCarat) * Number(value?.carat)
      ).toFixed(2);
      const toplamKarat = Number(value?.carat);

      if (value?.karat1 && Number(pricePerCarat) != 0) {
        value.karat1 = value?.karat1.replace(",", ".");
        value.anaMaliyet1 = (
          Number(pricePerCarat) * Number(value?.carpan1)
        ).toFixed(2);
        const ppc1 = (Number(anaMaliyetPPC) * Number(value?.carpan1)).toFixed(
          2,
        );
        value.ppc1 = ppc1;
        value.uretimMaliyeti1 = (
          Number(ppc1) * Number(value?.karat1.replace(",", "."))
        ).toFixed(2);
        value.lot1 = "B";
        value.lot2 = "C";
        value.lot3 = "D";
      }
      if (value?.karat2 && Number(pricePerCarat) != 0) {
        value.karat2 = value?.karat2.replace(",", ".");
        value.anaMaliyet2 = (
          Number(pricePerCarat) * Number(value?.carpan2)
        ).toFixed(2);
        const ppc2 = (Number(anaMaliyetPPC) * Number(value?.carpan2)).toFixed(
          2,
        );
        value.ppc2 = ppc2;
        value.uretimMaliyeti2 = (
          Number(ppc2) * Number(value?.karat2.replace(",", "."))
        ).toFixed(2);
        value.lot1 = "B";
        value.lot2 = "C";
        value.lot3 = "D";
      }
      if (value?.karat3 && Number(pricePerCarat) != 0) {
        value.karat3 = value?.karat3.replace(",", ".");
        value.anaMaliyet3 = (
          Number(pricePerCarat) * Number(value?.carpan3)
        ).toFixed(2);
        const ppc3 = (Number(anaMaliyetPPC) * Number(value?.carpan3)).toFixed(
          2,
        );
        value.ppc3 = ppc3;
        value.uretimMaliyeti3 = (
          Number(ppc3) * Number(value?.karat3.replace(",", "."))
        ).toFixed(2);
        value.lot1 = "B";
        value.lot2 = "C";
        value.lot3 = "D";
      }

      const toplamUretimMaliyeti = (
        Number(value.uretimMaliyeti3) +
        Number(value.uretimMaliyeti2) +
        Number(value.uretimMaliyeti1)
      ).toFixed(2);
      const toplamLotMaliyet = (
        Number(value.ppc1) +
        Number(value.ppc2) +
        Number(value.ppc3)
      ).toFixed(2);

      const totalCoastResult =
        value.menstrual_status == "Sertifikalı"
          ? total_costOne.toFixed(2)
          : (Number(total_costOne) * 1.1).toFixed(2);

      //const poPrice = (Number(pricePerCarat) * Number(value.carat)).toFixed(2);
      return {
        ...value,
        pricePerCarat: Number(pricePerCarat),
        total_cost: Number(totalCoastResult),
        anaMaliyetPPC: Number(anaMaliyetPPC),
        total_maliyet: Number(total_maliyet),
        toplamKarat: toplamKarat,
        toplamUretimMaliyeti: Number(toplamUretimMaliyeti),
        toplamLotMaliyet: Number(toplamLotMaliyet),
        //poPrice: Number(poPrice),
      };
    },
    [data.pricePerCarat, data.menstrual_status, data.iskonto],
  );

  const item: PirlantaCodeItemType = {
    data_boy: data.boy,
    data_frommixedItem: data.frommixedItem,
    data_fromsingleormixed: data.fromsingleormixed,
    data_kesim: data.kesim,
    data_menstrual_status: data.menstrual_status,
    isAdd: isAdd,
    data_carat: data.carat,
  };
  const { diamondCode, extraOptions } = usePirlantaCode({ item });

  const pruductCode = isAdd ? diamondCode : pirlantaItemData?.code;

  const newData: AddDiamondType = AddStoneSections.reduce(
    (acc, next) => {
      const totalElems = [...next.elements, ...(next.extraElements ?? [])];
      const elems = totalElems.reduce((acc2, next2) => {
        const name = next2.name as keyof AddDiamondType;
        if (data[name] && name != "sertifikaDosyasi") {
          return {
            ...acc2,
            [name]: next2.type == "number" ? Number(data[name]) : data[name],
          };
        }
        return { ...acc2 };
      }, {});
      if (
        next.keyString === "product_certificate1" ||
        next.keyString === "product_certificate2"
      ) {
        return {
          ...acc,
          product_certificate: {
            ...((acc as any).product_certificate || {}),
            ...elems,
          },
        };
      }

      if (data.menstrual_status === "Sertifikalı") {
        if (next.keyString === "product_cost1") {
          return {
            ...acc,
            product_cost: { ...((acc as any).product_cost || {}), ...elems },
          };
        }
      } else if (data.menstrual_status === "Sertifikasız") {
        if (
          data.boy &&
          ["00", "0.01-0.03", "0.03-0.07", "0.08-0.13"].includes(data.boy)
        ) {
          if (next.keyString === "product_cost3") {
            return {
              ...acc,
              product_cost: { ...((acc as any).product_cost || {}), ...elems },
            };
          }
        } else {
          if (next.keyString === "product_cost2") {
            return {
              ...acc,
              product_cost: { ...((acc as any).product_cost || {}), ...elems },
            };
          }
        }
      }
      if (
        ["product_cost1", "product_cost2", "product_cost3"].includes(
          next.keyString,
        )
      ) {
        return acc;
      }
      return { ...acc, [next.keyString]: elems };
    },
    {
      menstrual_status:
        data.menstrual_status == "Sertifikalı" ? "Single" : "Mixed",
      total_cost: Number(data.total_cost?.toString().replace(",", ".")),
      type: "Diamond",
      buy_date: data.buy_date,
      code: pruductCode,
      supplier_id: Number(data.supplier_id),
      store_id: Number(data.store_id),
    },
  );

  useEffect(() => {
    if (data.menstrual_status === "Sertifikasız") {
      const updatedSections = [...stoneSections];
      if (
        data.boy &&
        ["00", "0.01-0.03", "0.03-0.07", "0.08-0.13"].includes(data.boy)
      ) {
        updatedSections.forEach((section, index) => {
          if (section.sectionTitle === "Pırlanta Fiyat Bilgileri") {
            updatedSections[index] = { ...section, groupNumber: 1 };
          }

          if (section.sectionTitle === "Pırlanta Fiyat Bilgileri Detay") {
            updatedSections[index] = { ...section, groupNumber: 0 };
          }
        });
      } else {
        updatedSections.forEach((section, index) => {
          if (section.sectionTitle === "Pırlanta Fiyat Bilgileri") {
            updatedSections[index] = { ...section, groupNumber: 0 };
          }

          if (section.sectionTitle === "Pırlanta Fiyat Bilgileri Detay") {
            updatedSections[index] = { ...section, groupNumber: 1 };
          }
        });
      }
      setStoneSections(updatedSections);
    }
  }, [data.boy, data.pricePerCarat]);

  const sectionLenght: number = 1;
  return (
    <>
      <CustomModalPage
        title="Yeni Tedarikçi Ekle"
        modalDataValue={tedarikciModal}
        setModalDataValue={setTedarikciModalOpen}
      >
        <TedarikciDetayContainer
          isRedirect={false}
          isAdd={true}
          tedarikciItemData={null}
        />
      </CustomModalPage>
      <CustomForm
        isAdd={isAdd}
        setData={setData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        sections={stoneSections.filter((a) => a.groupNumber == activeStep)}
        data={data}
        stepCount={sectionLenght}
        serviceFunction={isAdd ? AddProductApiService : UpdateProductApiService}
        filteredData={newData}
        productCode={pruductCode}
        extraOptions={extraOptions}
        resultCallBack={resultCallBack}
        redirectUrl="/Admin/StokYonetimi/Pirlanta/PirlantaListesi"
      />
    </>
  );
};

export default PirlantaDetayContainer;
