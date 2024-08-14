"use client";
import { GetProductDatatableService } from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IRenkliTasType } from "../../../../../../types/formTypes";
import { ResponseResult } from "../../../../../../types/responseTypes";
import { ProductListType } from "../../../../../../types/types";

import { useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import { DeleteProductApiService } from "@/ApiServices/Products.ApiService";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const columns: Column<IRenkliTasType & { code: string }>[] = [
  {
    Header: "Renkli Taş Kodu",
    accessor: "code",
  },
  {
    Header: "Renkli Taş",
    accessor: "renkliTas",
  },
  {
    Header: "Karat",
    accessor: "carat",
  },
  {
    Header: "Renk",
    accessor: "renk",
  },
  {
    Header: "Kesim",
    accessor: "kesim",
  },
  {
    Header: "Menşei",
    accessor: "mensei",
  },
  {
    Header: "Treatment",
    accessor: "treatment",
  },
  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];

export default function RenkliTasStokListesi() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<
    IRenkliTasType[] | string | null
  >(null);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

  const updateData = useCallback(() => {
    setActiveData(null);
    GetProductDatatableService({
      order_by: null,
      page: activePage,
      type: "ColoredStone",
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp?.success) {
        const data = resp.data as ProductListType;
        const dataOneResult: any = data.results.map((item) => {
          return {
            code: item.code,
            renkliTas: `${item?.properties?.renkliTas}`,
            carat: item?.properties?.carat,
            renk: item?.properties?.renk,
            kesim: item?.properties?.kesim,
            mensei: item?.properties?.mensei,
            treatment: item?.properties?.treatment,
            islemler: islemlerArea({ id: item.pk as number }),
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
  }, [activePage]);

  const islemlerArea = useCallback(
    ({ id }: { id: number }) => {
      return (
        <div className="flex items-center justify-start  gap-6">
          <FaPencil
            className="cursor-pointer"
            onClick={() =>
              router.push(`/Admin/StokYonetimi/RenkliTas/RenkliTasEkle/${id}`)
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

  useEffect(() => {
    updateData();
  }, [activePage, updateData]);

  if (activeData == "Hata") {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Sade Stok Listesi" />
        <div className="flex h-full w-full items-center justify-center">
          Hata.
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Renkli Taş Stok Listesi" />
      {activeData ? (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={columns}
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
