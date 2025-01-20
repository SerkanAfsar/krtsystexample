"use client";

import React from "react";

const SadeUretimTalepleriContainer = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pırlanta Üretim Talepleri</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">İş Emri Id</th>
            <th className="border border-gray-300 px-4 py-2">Resim</th>
            <th className="border border-gray-300 px-4 py-2">Sade Kodu</th>
            <th className="border border-gray-300 px-4 py-2">Model Kodu</th>
            <th className="border border-gray-300 px-4 py-2">Model Türü</th>
            <th className="border border-gray-300 px-4 py-2">Altın ayarı</th>
            <th className="border border-gray-300 px-4 py-2">Sade Gramı</th>
            <th className="border border-gray-300 px-4 py-2">Has Gramı</th>
            <th className="border border-gray-300 px-4 py-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SadeUretimTalepleriContainer;
