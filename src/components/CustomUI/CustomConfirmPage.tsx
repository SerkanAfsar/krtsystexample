import React, { useEffect, useState } from "react";
import { GetWorkOrderPupils, GetUsersByUserGroups } from "@/Services/WorkOrder.Services";
import { SeciliUrunType, UserType } from "@/components/IsEmirleri/UrunGruplariModul"

type ConfirmPropsType = {
  isOpen: boolean;
  item: SeciliUrunType; 
  items: SeciliUrunType[]; 
  title: string; 
  onConfirm: (cirak?: UserType, targetLocation?: UserType, items?: SeciliUrunType[]) => void;
  onCancel: () => void;
};
const CustomConfirmPage: React.FC<ConfirmPropsType> = ({ isOpen, item, items, title, onConfirm, onCancel }) => {
  const [ciraklar, setCiraklar] = useState<UserType[]>([]);
  const [selectedCirak, setSelectedCirak] = useState<UserType | null>(null);
  const [atolye, setAtolye] = useState<number | null>(4);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const groupIdsMap: { [key: string]: number } = {
    "Pırlanta": 8,
    "Sade": 1,
    "Renkli Taş": 7,
    "default": 0
  };
  const statusGroupMap: { [key: string]: number } = {
    'Onaylandı': 2,
    'Üretim Onayladı': atolye || 4,
    'Geri Gönderildi': groupIdsMap[title] || groupIdsMap['default']
  };
 
  useEffect(() => {
    if (item.status === 'Onaylandı' || item.status === 'Üretim Onayladı' || item.status === 'Geri Gönderildi') {
      const fetchData = async () => {
        if (item.status === 'Onaylandı' || item.status === 'Üretim Onayladı' || item.status === 'Geri Gönderildi') {
          if (!selectedCirak) {
            const pupils = await GetWorkOrderPupils();
            if (pupils?.success) {
              setCiraklar(pupils.data);
              setSelectedCirak(pupils.data[0] || null);
            }
          }
        }
        const groupId = statusGroupMap[item.status];
        if (groupId !== undefined) {
          const targets = await GetUsersByUserGroups({ group_ids: [groupId] });
          setUsers(targets);
          setSelectedUser(targets[0] || null);
        }
      };
    
      fetchData();
    }
  }, [item.status, atolye]);


  const renderCirakSecimi = () => (
    <div className="w-3/4 mt-3 flex flex-col items-center justify-center">
      <label htmlFor="cirakSecimi" className="items-center text-sm font-medium text-gray-700">
        Göndereceğiniz çırağı seçiniz
      </label>
      <select
        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
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

  const renderUserSelection = () => (
    <div className="w-3/4 mt-3 flex flex-col items-center justify-center">
      <label htmlFor="userSelection" className="text-sm font-medium text-gray-700">
      Gönderilecek Kişiyi Seçiniz
      </label>
      <select
        id="userSelection"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        onChange={(e) => {
          const selected = users.find(c => c.id === Number(e.target.value));
          setSelectedUser(selected || null);
        }}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
    </div>
  );

  const renderWorkshopSelection = () => (
    <div className="w-3/4 mt-3 flex flex-col items-center justify-center">
      <label className="text-sm font-medium text-gray-700">Gideceği Atölyeyi Seçiniz</label>
      <select
        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        value={atolye || 4}
        onChange={(e) => setAtolye(Number(e.target.value))}
      >
        <option value={4}>Mıhlayıcı</option>
        <option value={5}>Cilacı</option>
        <option value={1}>Sadekar</option>
      </select>
    </div>
  );

  const handleConfirm = () => {
    onConfirm(selectedCirak || undefined, selectedUser || undefined, items ? items : undefined);
  };

  if (!isOpen) return null;
  let message: React.ReactNode;
  let buttonText = '';
  let cirakSecimi = null; 
  let targetLocationSecimi = null; 

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
        buttonText = 'Gönder';
      } else {
        message = (
          <>
            <strong>{item.code}</strong> kodlu ürünü üretim müdürüne göndermek istediğinize emin misiniz?
          </>
        );      
        buttonText = 'Gönder';
      }
      cirakSecimi = renderCirakSecimi()
      targetLocationSecimi = renderUserSelection(); 
      break;
      case 'Üretim Onayladı':
        if (items.length > 1) {
          const codes = items.map(item => item.code).join(", ");
          message = (
            <>
              <strong>{codes}</strong> kodlu ürünleri göndermek istediğinize emin misiniz?
            </>
          );
          buttonText = 'Gönder';
        } else {
          message = (
            <>
              <strong>{item.code}</strong> kodlu ürünü göndermek istediğinize emin misiniz?
            </>
          );      
          buttonText = 'Gönder';
        }
        cirakSecimi = renderCirakSecimi()
        targetLocationSecimi = (
          <div className="w-full flex flex-col items-center justify-center">
          {renderWorkshopSelection()} 
          {renderUserSelection()} 
        </div>
        );
        break;
      case 'Red Edildi':
        message = (
          <>
            <strong>{item.code}</strong> kodlu ürünü iptal etmek istediğinize emin misiniz?
          </>
        );
        buttonText = 'Evet';
        break;
      case 'Gönderildi':
        message = (
          <>
            <strong>{item.code}</strong> kodlu ürünü teslim aldığınıza emin misiniz?
          </>
        );
        buttonText = 'Onayla';
        break;
      case 'Geri Gönderildi':
        message = (
          <>
            <strong>{item.code}</strong> kodlu ürünü geri göndermek istediğinize emin misiniz?
          </>
        );
        buttonText = 'Evet';
        cirakSecimi = renderCirakSecimi()
        targetLocationSecimi = renderUserSelection()
        break;
    default:
      message = 'Bilinmeyen bir durum';
      buttonText = 'Tamam';
  }

  return  (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
  <div className="flex flex-col items-center justify-center w-full max-w-md p-4 bg-white rounded-lg shadow-md">
    <p className="text-center">{message}</p>
    {cirakSecimi && <div className="flex justify-center mt-2 w-full">{cirakSecimi}</div>}
    {targetLocationSecimi && <div className="flex justify-center mt-2 w-full">{targetLocationSecimi}</div>}
    <div className="flex gap-2 mt-4 w-full">
    <button onClick={onCancel} className="flex-1 bg-blue-500 text-white py-2 rounded-md">
        Vazgeç
      </button>
      <button onClick={handleConfirm} className="flex-1 bg-blue-500 text-white py-2 rounded-md">
        {buttonText}
      </button>
    </div>
  </div>
</div>
  );
};

export default CustomConfirmPage;
