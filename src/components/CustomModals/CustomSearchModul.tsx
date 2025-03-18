import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import {
  PirlantaBerraklikData,
  PirlantaBoyKodlari,
  PirlantaKesimKodlariData,
  PirlantaRenkData,
} from "@/data/Pirlanta.data";
import {
  RenkliTasListesiData,
  RenkliTasListesiKesimData,
  RenkliTasRenkListesi,
} from "@/data/RenkliTas.data";
import {
  AltinAyarData,
  AltinRengiData,
  SadeModelTurleri,
} from "@/data/Sade.data";


type SearchParams = {
  menstrual_status?: string;
  buy_date_after?: string;
  buy_date_before?: string;
  code?: string;
  properties_key?: string;
  properties_value?: string;
  total_cost_min?: number;
  total_cost_max?: number;
  remaining_count_min?: number;
  remaining_count_max?: number;
};

type Props = {
  onSearch: (params: SearchParams) => void;
  product: string;
};

const coloredProperties = [
  { value: "renk", label: "Renk" },
  { value: "carat", label: "Karat" },
  { value: "kesim", label: "Kesim" },
  { value: "renkliTas", label: "Renkli Tas" },
];

const diamondProperties = [
  { value: "boy", label: "Boy" },
  { value: "renk", label: "Renk" },
  { value: "carat", label: "Karat" },
  { value: "kesim", label: "Kesim" },
  { value: "berraklik", label: "Berraklik" }
];

const sadeProperties = [
  { value: "ayar", label: "Ayar" },
  { value: "modelTuru", label: "Model Turu" },
  { value: "altinRengi", label: "Altin Rengi" },
 // { value: "gram", label: "Gram" },
  { value: "modelKodu", label: "Model Kodu" },
];

export default function CustomSearchModul({ onSearch, product  }: Props) {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [propertyOptions, setPropertyOptions] = useState<any[]>([]);
  const stoneProperties = product === "diamond" 
  ? diamondProperties 
  : product === "coloredStone" 
  ? coloredProperties 
  : sadeProperties;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "properties_key") {
      switch (value) {
        case "boy":
          setPropertyOptions(
            PirlantaBoyKodlari.map((item) => ({
              value: item.valueVal,
              label: item.titleVal
            }))
          );
          break;
        case "renk":
          if (product === "diamond") {
            setPropertyOptions(
              PirlantaRenkData.map((item) => ({
                value: item.valueVal,
                label: item.titleVal,
              }))
            );
          } else if (product === "coloredStone") {
            setPropertyOptions(
              RenkliTasRenkListesi.map((item) => ({
                value: item.valueVal,
                label: item.titleVal,
              }))
            );
          }
          break;
        case "kesim":
          if (product === "diamond") {
            setPropertyOptions(
              PirlantaKesimKodlariData.map((item) => ({
                value: item.valueVal,
                label: item.titleVal,
              }))
            );
          } else if (product === "coloredStone") {
            setPropertyOptions(
              RenkliTasListesiKesimData.map((item) => ({
                value: item.valueVal,
                label: item.titleVal,
              }))
            );
          }
          break;
        case "berraklik":
          setPropertyOptions(
            PirlantaBerraklikData.map((item) => ({
              value: item.valueVal,
              label: item.titleVal
            }))
          );
          break;
        case "renkliTas":
          setPropertyOptions(
            RenkliTasListesiData.map((item) => ({
              value: item.valueVal,
              label: item.titleVal,
            }))
          );
          break
        case "ayar":
          setPropertyOptions(
            AltinAyarData.map((item) => ({
              value: item.valueVal,
              label: item.titleVal,
            }))
          );
          break
        case "modelTuru":
          setPropertyOptions(
            SadeModelTurleri.map((item) => ({
              value: item.valueVal,
              label: item.titleVal,
            }))
          );
          break
        case "altinRengi":
          setPropertyOptions(
            AltinRengiData.map((item) => ({
              value: item.valueVal,
              label: item.titleVal,
            }))
          );
          break
        case "carat":
          setPropertyOptions([]);  
          break;
       /*case "gram":
          setPropertyOptions([]);  
          break;*/
        case "modelKodu":
          setPropertyOptions([]);  
          break;
        default:
          setPropertyOptions([]);
          break;
      }
    }

    setSearchParams((prev) => ({
      ...prev,
      [name]: value ? value : "",
    }));
  };

  const handleDateChange = (date: Date | null, field: string) => {
    const formattedDate = date ? date.toISOString().split('T')[0] : ""; 
    setSearchParams((prev) => ({
      ...prev,
      [field]: formattedDate,
    }));
  };


  const handleSearch = () => {
    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value && value.toString().trim() !== "")
    ) as SearchParams;

    onSearch(filteredParams);
  };

  return (
    <div className="p-6 mb-10 bg-white shadow-md rounded-lg space-y-4">
      <div className="flex space-x-4 items-end">
        <div className="flex-1">
          <label className="block py-2 ext-sm font-medium">Ürün Kodu</label>
          <input
            type="text"
            name="code"
            placeholder="Ürün kodu girin"
            value={searchParams.code || ""}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block py-2 text-sm font-medium">Sertifika Durumu</label>
          <select
            name="menstrual_status"
            value={searchParams.menstrual_status || ""}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          >
            <option value="">Hepsi</option>
            <option value="Single">Sertifikalı</option>
            <option value="Mixed">Sertifikasız</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block py-2 text-sm font-medium">Key</label>
          <select
            name="properties_key"
            value={searchParams?.properties_key || ""}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          >
            <option value="">Seçiniz</option>
            {stoneProperties.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block py-2 text-sm font-medium">Value</label>
          {(searchParams?.properties_key === "carat" || searchParams?.properties_key === "modelKodu") ? (
            <input
              type="text"
              name="properties_value"
              placeholder="Value"
              value={searchParams?.properties_value || ""}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          ) : (
            <select
              name="properties_value"
              value={searchParams?.properties_value || ""}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            >
              <option value="">Seçiniz</option>
              {propertyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block py-2 text-sm font-medium">Alış Tarihi - Başlangıç</label>
          <DatePicker
            name="buy_date_after"
            value={searchParams?.buy_date_after || ""}
            format="dd.MM.yyyy"
            onChange={(value: any) => handleDateChange(value, "buy_date_after")}
            className="h-8 w-full"
          />
        </div>
        <div>
          <label className="block py-2 text-sm font-medium">Alış Tarihi - Bitiş</label>
          <DatePicker
            name="buy_date_before"
            value={searchParams?.buy_date_before || ""}
            format="dd.MM.yyyy"
            onChange={(value: any) => handleDateChange(value, "buy_date_before")}
            className="h-8 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block py-2 text-sm font-medium">Maliyet (Min)</label>
          <div className="flex items-center border rounded w-full">
          <input
            type="number"
            name="total_cost_min"
            placeholder="Minimum maliyet"
            value={searchParams?.total_cost_min || ""}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <span className="px-2 text-black font-bold">$</span>
        </div>
        </div>
        <div>
          <label className="block py-2 text-sm font-medium">Maliyet (Max)</label>
          <div className="flex items-center border rounded w-full">
          <input
            type="number"
            name="total_cost_max"
            placeholder="Maksimum maliyet"
            value={searchParams?.total_cost_max || ""}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <span className="px-2 text-black font-bold">$</span>
        </div>
        </div>
      </div>

    

      <button
        onClick={handleSearch}
        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ara
      </button>
    </div>
  );
}
