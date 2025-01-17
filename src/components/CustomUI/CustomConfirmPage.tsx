import React from "react";

type SeciliUrunType = {
  [key: string]: string | number;
};

type ConfirmPropsType = {
  isOpen: boolean;
  item: SeciliUrunType; 
  onConfirm: () => void;
  onCancel: () => void;
};

const CustomConfirmPage: React.FC<ConfirmPropsType> = ({ isOpen, item, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  console.log(item)
  let message = '';
  let buttonText = '';
  let cirakSecimi = null; 

  switch (item.status) {
    case 'RESERVED':
      message =  `${item.code} kodlu ürünü onay beklemeye göndermek istediğinizden emin misiniz?`;
      buttonText = 'Onayla';
      break;
    case 'Onay Bekliyor':
      message = `${item.code} kodlu ürünü onaylamak istediğinizden emin misiniz?`;
      buttonText = 'Onayla';
      break;
    case 'Onaylandı':
      message = `${item.code} kodlu ürünü üretim müdürüne göndermek istediğinize emin misiniz?`;
      buttonText = 'Tamam';
      cirakSecimi = (
        <div className="w-3/4 mt-3 flex flex-col items-center justify-center">
        <label htmlFor="cirakSecimi" className="items-center text-sm font-medium text-gray-700">
            Lütfen göndereceğiniz çırağı seçiniz
          </label>
          <select
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
          </select>
        </div>
        );
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
            onClick={onConfirm}
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
