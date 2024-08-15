"use client";
import { DeleteProductApiService } from "@/ApiServices/Products.ApiService";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { GetProductDatatableService } from "@/Services/Product.Services";
import { MucevherListData, MucevherListesiDataHeaders } from "@/types/Mucevher";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { ResponseResult } from "../../../../../../types/responseTypes";
import { ProductListType } from "../../../../../../types/types";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";

export default function MucevherStokListesi() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<
    MucevherListData[] | string | null
  >(null);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

  const updateData = useCallback(() => {
    setActiveData(null);
    GetProductDatatableService({
      order_by: null,
      page: activePage,
      type: "Gem",
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp?.success) {
        const data = resp.data as ProductListType;
        const dataOneResult: any = data.results.map((item) => {
          return {
            resim: item?.image,
            mucevherKodu: item?.code,
            model: null,
            sade: null,
            toplamKarat: null,
            toplamTasAdet: null,
            toplamIscilik: null,
            etiketFiyati: null,
            tedarikci: null,
            girisTarihi: null,
            ambar: null,
            islemler: islemlerArea({ id: item?.pk as number }),
          };
        });
        setActiveData(dataOneResult);
        setTotalPageCount(
          Math.ceil(
            data.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setActiveData((resp.error && resp.error[0]) || "Hata");
      }
    });
  }, []);

  useEffect(() => {
    updateData();
  }, [activePage, updateData]);

  const islemlerArea = useCallback(
    ({ id }: { id: number }) => {
      return (
        <div className="flex items-center justify-start  gap-6">
          <FaPencil
            className="cursor-pointer"
            onClick={
              () => alert("Test")
              // router.push(`/Admin/StokYonetimi/Pirlanta/PirlantaEkle/${id}`)
            }
          />
          <FaTrash
            className="cursor-pointer"
            onClick={async () => {
              await DeleteProductApiService({ id, callBack: updateData });
            }}
          />
        </div>
      );
    },
    [router, updateData],
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Mücevher Stok Listesi" />

      {activeData ? (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={MucevherListesiDataHeaders}
          dataOne={activeData}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          Yükleniyor...
        </div>
      )}
    </DefaultLayout>
  );
}
