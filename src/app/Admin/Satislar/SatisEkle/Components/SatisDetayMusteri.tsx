import CustomModalPage from "@/components/CustomModals/CustomPageModal";
import { useTedarikciModalData } from "@/store/useModalStore";
import { CustomSearchSelect } from "@/components/CustomUI/CustomSearchSelect";
import MusteriDetayContainer from "@/Containers/MusteriDetayContainer";
import CustomInput from "@/components/CustomUI/CustomInput";
import { useEffect, useState } from "react";
import { MusteriType } from "../../../../../types/types";
import { GetMusteriService } from "@/Services/Customer.Service";
import { ResponseResult } from "../../../../../types/responseTypes";
import { CustomSearchSelectType } from "../../Containers/SatisEkleDetayContainer";

export default function SatisDetayMusteri({
  customers,
  setValue,
  isEdit = false,
  selectedVal,
}: {
  customers: CustomSearchSelectType[];
  setValue: any;
  isEdit?: boolean;
  selectedVal?: CustomSearchSelectType;
}) {
  const { setMusteriModalData, musteriModalData } = useTedarikciModalData();
  const [customerDetail, setCustomerDetail] = useState<MusteriType>({});
  const [customerId, setCustomerId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (customerId) {
      GetMusteriService({ id: customerId as number })
        .then((resp: ResponseResult<MusteriType>) => {
          if (resp.success) {
            setCustomerDetail(resp.data as MusteriType);
          } else {
            console.log(resp.error);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [customerId]);

  return (
    <>
      <CustomModalPage
        title="Yeni Müşteri Ekle"
        modalDataValue={musteriModalData}
        setModalDataValue={setMusteriModalData}
      >
        <MusteriDetayContainer
          isRedirect={false}
          isAdd={true}
          musteriItemData={null}
        />
      </CustomModalPage>
      <div className="flex flex-col gap-5 rounded-md bg-white p-6">
        <h2 className="block w-full text-left text-xl font-bold text-[#000]">
          Müşteri Bilgileri
        </h2>
        <div className="flex gap-3">
          <CustomSearchSelect
            placeholder="Müşteri Seçiniz"
            title="Müşteri Seçiniz"
            isClearable={true}
            customOptions={customers}
            value={selectedVal}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                height: "49px",
              }),
            }}
            className="!border-stone-400"
            noOptionsMessage={() => "Bulunamadı..."}
            onChange={(item: any) => {
              if (item?.value == 9999) {
                setCustomerId(undefined);
                setMusteriModalData();
              } else {
                setCustomerId(item ? item.value : undefined);
                setValue("customer_id", item ? item.value : undefined);
              }
            }}
            newItem={{ label: "Yeni Müşteri Ekle", value: 9999 }}
            isDisabled={isEdit}
          />
          <CustomInput
            item={{
              name: "customer_phone",
              required: false,
              disabled: true,
              type: "text",
              title: "Müşteri Telefonu",
              placeholder: "Müşteri Telefonu",
            }}
            disabled={true}
            value={customerDetail.phone}
          />
          <CustomInput
            item={{
              name: "customer_email",
              required: false,
              type: "email",
              title: "Müşteri E-Posta",
              placeholder: "Müşteri E-Posta",
            }}
            disabled={true}
            value={customerDetail.e_mail}
          />
        </div>
      </div>
    </>
  );
}
