import React, { useEffect, useState } from "react";
import { GetWorkOrderPupils } from "@/Services/WorkOrder.Services";
import { SeciliUrunType, CirakType } from "@/components/IsEmirleri/UrunGruplariModul"

type ConfirmPropsType = {
  isOpen: boolean;
  item: SeciliUrunType; 
  items: SeciliUrunType[]; 
  onConfirm: (cirak?: CirakType) => void;
  onCancel: () => void;
};

const CustomConfirmPage: React.FC<ConfirmPropsType> = ({ isOpen, item, items, onConfirm, onCancel }) => {
  const [ciraklar, setCiraklar] = useState<CirakType[]>([]);
  const [selectedCirak, setSelectedCirak] = useState<CirakType | null>(null);

  useEffect(() => {
    if (item.status === 'Onaylandı') {
      const fetchCiraklar = async () => {
        try {
          const response = await GetWorkOrderPupils(); 
          if (response && response.success && response.data) {
            setCiraklar(response.data);
          }
          else if (response && !response.success) {
            console.error('Data fetch failed cirak list'); 
          }
          
        } catch (error) {
          console.error('Error fetching pupils:', error);
        }
      };
  
      fetchCiraklar(); 
    }
  }, [item.status]);

  const handleConfirm = () => {
    onConfirm(selectedCirak || undefined);
  };

  if (!isOpen) return null;
  let message: React.ReactNode;
  let buttonText = '';
  let cirakSecimi = null; 

  switch (item.status) {
    case 'Rezervli':
      message = (
        <>
          <strong>{item.code}</strong> kodlu ürünü onay beklemeye göndermek istediğinizden emin misiniz?
        </>
      );
      buttonText = 'Onayla';
      break;
    case 'Onay Bekliyor':
      message = (
        <>
          <strong>{item.code}</strong> kodlu ürünü onaylamak istediğinizden emin misiniz?
        </>
      );
      buttonText = 'Onayla';
      break;
    case 'Onaylandı':
      if (items.length > 1) {
        const codes = items.map(item => item.code).join(", ");
        message = (
          <>
            <strong>{codes}</strong> kodlu ürünleri üretim müdürüne göndermek istediğinize emin misiniz?
          </>
        );
        buttonText = 'Tamam';
      } else {
        message = (
          <>
            <strong>{item.code}</strong> kodlu ürünü üretim müdürüne göndermek istediğinize emin misiniz?
          </>
        );      
        buttonText = 'Tamam';
      }
      cirakSecimi = (
        <div className="w-3/4 mt-3 flex flex-col items-center justify-center">
        <label htmlFor="cirakSecimi" className="items-center text-sm font-medium text-gray-700">
            Lütfen göndereceğiniz çırağı seçiniz
          </label>
          <select className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          onChange={(e) => {
            const selected = ciraklar.find(c => c.id === Number(e.target.value));
            setSelectedCirak(selected || null);
          }}
        >
          {ciraklar.map((cirak) => (
            <option key={cirak.id} value={cirak.id}>
              {cirak.username} 
            </option>
          ))}
        </select>
        </div>
        );
      break;
      case 'Red Edildi':
        message = (
          <>
            <strong>{item.code}</strong> kodlu ürünü iptal etmek istediğinize emin misiniz?
          </>
        );
        buttonText = 'İptal Et';
        break;
        case 'Gönderildi':
          message = (
            <>
              <strong>{item.code}</strong> kodlu ürünü teslim aldığınıza emin misiniz??
            </>
          );
          buttonText = 'Onayla';
          break;
    default:
      message = 'Bilinmeyen bir durum';
      buttonText = 'Tamam';
  }

  return  (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black bg-opacity-80">
      <div className="flex flex-col items-center justify-between h-[30%] w-[30%] animate-modalAnimation rounded-lg bg-white p-3 dark:bg-graydark relative">
        <div className="flex flex-col items-center justify-center w-full">
          <p className="mt-2">{message}</p>
        </div>
        {cirakSecimi}
        <div className="flex gap-4 mt-auto">
          <button
            onClick={handleConfirm}
            className="btn px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {buttonText}
          </button>
          <button
            onClick={onCancel}
            className="btn px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Vazgeç
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirmPage;
