"use client";
import {
  DeleteProductService,
  GetProductDatatableService,
} from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ProductResponseType } from "@/types/responseTypes";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import { toast } from "react-toastify";

interface Diamond {
  code?: string;
  kesim?: string;
  carat?: string;
  sertifika?: string;
  renk?: string;
  berraklik?: string;
  proposion?: string;
  polish?: string;
  symmetry?: string;
  fluorescence?: string;
  min?: string;
  max?: string;
  height?: string;
  sertifikaNo?: string;
  paraportFiyatı?: string;
  duzenle?: React.ReactNode;
  sil?: React.ReactNode;
}

const columns: Column<Diamond>[] = [
  {
    Header: "Pırlanta Kodu",
    accessor: "code",
  },
  {
    Header: "Kesim",
    accessor: "kesim",
  },
  {
    Header: "Karat",
    accessor: "carat",
  },
  {
    Header: "Sertifika",
    accessor: "sertifika",
  },
  {
    Header: "Renk",
    accessor: "renk",
  },
  {
    Header: "Berraklık",
    accessor: "berraklik",
  },
  {
    Header: "Proportion",
    accessor: "proposion",
  },
  {
    Header: "Polish",
    accessor: "polish",
  },
  {
    Header: "Symmetry",
    accessor: "symmetry",
  },
  {
    Header: "Floruence",
    accessor: "fluorescence",
  },
  {
    Header: "Min",
    accessor: "min",
  },
  {
    Header: "Max",
    accessor: "max",
  },
  {
    Header: "Height",
    accessor: "height",
  },
  {
    Header: "SertifikaNo",
    accessor: "sertifikaNo",
  },
  {
    Header: "ParaportFiyatı",
    accessor: "paraportFiyatı",
  },
  {
    Header: "Duzenle",
    accessor: "duzenle",
  },
  {
    Header: "Sil",
    accessor: "sil",
  },
];

export default function PirlantaListesi() {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<Diamond[] | string | null>(null);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

  const sertificateUrl = useCallback((item: any) => {
    if (item?.product_certificate?.sertifika == "GIA") {
      return (
        <Link
          target="_blank"
          href={`https://www.gia.edu/report-check?reportno=${item?.product_certificate?.sertifikaNo}`}
        >
          GIA
        </Link>
      );
    } else if (item?.product_certificate?.sertifika == "HRD") {
      return (
        <Link
          target="_blank"
          href={`https://my.hrdantwerp.com/?record_number=${item?.product_certificate?.sertifikaNo}`}
        >
          HRD
        </Link>
      );
    }
    return item?.product_certificate?.sertifika;
  }, []);

  const duzenleButton = useCallback((item: any) => {
    return (
      <Link
        className="btn rounded-md bg-yellow-600 p-4 text-center text-white"
        href={`/Admin/StokYonetimi/Pirlanta/PirlantaEkle/${item.pk}`}
      >
        Güncelle
      </Link>
    );
  }, []);

  const silButton = useCallback(async (item: any) => {
    const id = item.pk as Number;
    return (
      <div
        onClick={async () => {
          const result = await DeleteProductService({ id });
          if (result.result) {
            toast.success("Ürün Silindi", { position: "top-right" });
            updateData();
          } else {
            toast.error(result.message || "Hata", { position: "top-right" });
            return;
          }
        }}
        className="btn cursor-pointer rounded-md bg-danger p-3 text-center text-white"
      >
        Sil
      </div>
    );
  }, []);

  const updateData = useCallback(() => {
    setActiveData(null);
    GetProductDatatableService({
      order_by: null,
      page: activePage,
      type: "Diamond",
    }).then((resp: ProductResponseType) => {
      if (resp.result) {
        const dataOneResult: Diamond[] = resp.payload.results.map((item) => {
          return {
            berraklik: item?.properties?.berraklik,
            carat: item?.properties.carat,
            code: item?.code,
            fluorescence: item?.product_certificate?.fluorescence,
            kesim: item?.properties?.kesim,
            max: item?.product_certificate?.max,
            min: item?.product_certificate?.min,
            polish: item?.product_certificate?.polish,
            proposion: item?.product_certificate?.propotion,
            sertifika: sertificateUrl(item),
            sertifikaNo: item?.product_certificate?.sertifikaNo,
            renk: item?.properties?.renk,
            symmetry: item?.product_certificate?.symmetry,
            paraportFiyatı: undefined,
            height: item?.product_certificate?.height,
            duzenle: duzenleButton(item),
            sil: silButton(item),
          };
        });
        setActiveData(dataOneResult);
        setTotalPageCount(
          Math.ceil(
            resp.payload.count /
              Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setActiveData(resp.message || "Hata");
      }
    });
  }, []);

  useEffect(() => {
    updateData();
  }, [activePage, sertificateUrl, updateData]);

  if (activeData == "Hata") {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Pırlanta Stok Listesi" />
        <div className="flex h-full w-full items-center justify-center">
          Hata.
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pırlanta Stok Listesi" />
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
