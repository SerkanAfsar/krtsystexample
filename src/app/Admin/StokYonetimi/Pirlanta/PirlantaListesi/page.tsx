"use client";
import { GetProductDatatableService } from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ResponseResult } from "../../../../../../types/responseTypes";
import { ProductListType } from "../../../../../../types/types";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import { DeleteProductApiService } from "@/ApiServices/Products.ApiService";

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
  islemler?: React.ReactNode;
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
    Header: "Rapaport Fiyatı",
    accessor: "paraportFiyatı",
  },
  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];

export default function PirlantaListesi() {
  const router = useRouter();
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

  const updateData = useCallback(() => {
    setActiveData(null);
    GetProductDatatableService({
      order_by: null,
      page: activePage,
      type: "Diamond",
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp?.success) {
        const data = resp.data as ProductListType;
        const dataOneResult: any = data.results.map((item) => {
          return {
            berraklik: item?.properties?.berraklik,
            carat: item?.properties?.carat,
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

  const islemlerArea = useCallback(
    ({ id }: { id: number }) => {
      return (
        <div className="flex items-center justify-start  gap-6">
          <FaPencil
            className="cursor-pointer"
            onClick={() =>
              router.push(`/Admin/StokYonetimi/Pirlanta/PirlantaEkle/${id}`)
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
