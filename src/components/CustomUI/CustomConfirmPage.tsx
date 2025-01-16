import React from "react";

type ConfirmPropsType = {
  isOpen: boolean;
  status: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const CustomConfirmPage: React.FC<ConfirmPropsType> = ({ isOpen, status, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  let message = '';
  let buttonText = '';

  switch (status) {
    case 'RESERVED':
      message = 'Bu ürünü onaylanmya göndermek istediğinizden emin misiniz?';
      buttonText = 'Onayla';
      break;
    case 'Onay Bekliyor':
      message = 'Bu ürünü onaylamak istediğinizden emin misiniz?';
      buttonText = 'Onayla';
      break;
    case 'Onaylandı':
      message = 'Bu ürünü göndermek istediğinize emin misiniz?';
      buttonText = 'Tamam';
      break;
    default:
      message = 'Bilinmeyen bir durum';
      buttonText = 'Tamam';
  }

  return (
    <div className="fixed inset-0 z-999 flex h-full w-full items-center justify-center bg-black bg-opacity-80">
    <div className="flex h-[20%] w-[20%] animate-modalAnimation flex-col items-center justify-start gap-3 rounded-lg bg-white p-3 dark:bg-graydark relative">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="mt-2">{message}</p>
      </div>
  
      <div className="absolute bottom-4 right-4 flex gap-4">
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
