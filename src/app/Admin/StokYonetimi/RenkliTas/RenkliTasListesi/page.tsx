"use client";
import {
  DeleteProductService,
  GetProductDatatableService,
} from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IRenkliTasType, ISadeType } from "../../../../../../types/formTypes";
import { ResponseResult } from "../../../../../../types/responseTypes";
import { ProductListType, ProductType } from "../../../../../../types/types";
import { RenkliTasListesiData } from "@/utils";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import { toast } from "react-toastify";

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
    Header: "Düzenle",
    accessor: "duzenle",
  },
  {
    Header: "Sil",
    accessor: "sil",
  },
];

export default function RenkliTasStokListesi() {
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
      if (resp.success) {
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
            duzenle: duzenleButton(item),
            sil: silButton(item),
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

  const duzenleButton = useCallback((item: any) => {
    return (
      <Link
        className="btn rounded-md bg-yellow-600 p-3 text-white"
        href={`/Admin/StokYonetimi/RenkliTas/RenkliTasEkle/${item.pk}`}
      >
        Güncelle
      </Link>
    );
  }, []);

  const silButton = useCallback(
    async (item: any) => {
      const id = item.pk as Number;
      return (
        <div
          onClick={async () => {
            const result = await DeleteProductService({ id });
            if (result.success) {
              toast.success("Ürün Silindi", { position: "top-right" });
              updateData();
            } else {
              toast.error((result.error && result.error[0]) || "Hata", {
                position: "top-right",
              });
              return;
            }
          }}
          className="btn cursor-pointer rounded-md bg-danger p-3 text-center text-white"
        >
          Sil
        </div>
      );
    },
    [updateData],
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
