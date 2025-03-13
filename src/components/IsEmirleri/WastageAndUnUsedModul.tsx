  type productItem = {
    id: number;
    code: string;
    productType: string;
    fireAdet?: number;
    fireKarat?: number;
    kullanılmayanKarat?: number;
    location: string;
    status: string;
    price: string;
  };
  
  export default function WastageAndUnUsedModul({
    type
    }: {
    type?: string;
    }) {
    
      const getWastageData = (): productItem[] => {return [];};
      const getUnusedData = (): productItem[] => {return [];};
      const data = type === "waste" ? getWastageData() : getUnusedData();

    
      return (
        <div className="overflow-x-auto p-4">
          <h3 className="text-lg font-medium text-black dark:text-white">
            {type === "waste" ? "Fire Ürünler" : "Kullanılmayan Ürünler"}
          </h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                {[
                  "ID",
                  "Kod",
                  "Ürün Tipi",
                  type === "waste" ? "Fire Adet" : "Kullanılmayan Karat",
                  type === "waste" && "Fire Karat", 
                  "Nerede",
                  "Statu",
                  "Fiyat",
                  "İşlemler" 
                ]
                .filter(Boolean)
                .map((header, index) => (
                  <th key={index} className="border-b border-gray p-2 text-left text-sm font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-sm">
                    Ürün yok.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id}>
                    <td className="p-2 text-sm">{item.id}</td>
                    <td className="p-2 text-sm">{item.code}</td>
                    <td className="p-2 text-sm">
                      {item.productType === "Simple" 
                        ? "Sade" 
                        : item.productType === "ColoredStone" 
                        ? "Renkli Taş" 
                        : item.productType === "Diamond" 
                        ? "Pırlanta" 
                        : item.productType || "-"}
                    </td>
                    <td className="p-2 text-sm">{type === "waste" ? 2 : 4}</td>
                    {type === "waste" && (
                      <td className="p-2 text-sm">{3}</td> 
                    )}
                    <td className="p-2 text-sm">{item.location}</td>
                    <td className="p-2 text-sm">
                      <div className={`p ml-[-25px] pt-2 h-8 w-28 lg:w-28 md:w-22 sm:w-20 rounded-full text-center text-xs font-bold whitespace-nowrap dark:disabled:text-white border-2 leading-[2]`}>
                        {item.status}
                      </div>
                    </td>
                    <td className="p-2 text-sm">
                      {item.price ? Number(item.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"}$
                    </td>
                    <td className="p-2 text-sm">
                      <button className="p-2 w-8 h-8 cursor-pointer">
                        <img src="/images/icon/confirmation.svg" alt="İşlem" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      );
  }

  