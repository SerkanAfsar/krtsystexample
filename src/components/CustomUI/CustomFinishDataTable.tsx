const CustomFinishDataTable = ({
    data,
    title
  }: {
    data: any[];
    title: string
  }) => {

    return (
        <div className="mb-3 flex w-full flex-col gap-3">
        <div className="my-3 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke dark:border-strokedark">
          <b className="mb-1 block p-5 text-black text-left">{title} Malzeme Bilgileri</b>
          </div>
          <div className="block w-full p-5">
            <div className="grid grid-cols-6 items-center gap-3 rounded-md border-[#e5e9ed] bg-[#f9fafb] p-3 font-medium text-black">
              <div className="text-center">ID</div>
              <div className="text-center">Kod</div>
              <div className="text-center">Ürün Tipi</div>
              <div className="text-center">Adet</div>
              <div className="text-center">Karat</div>
              <div className="text-center">Fiyat</div>
            </div>
            {data?.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 items-center gap-3 border-l-[1px] border-r-[1px] border-t-[1px] border-[#e5e9ed] p-3 capitalize text-black last:border-b-[1px]"
              >
                <div className="text-center">{item.product.pk ? item.product.pk : "-"}</div>
                <div className="text-center whitespace-nowrap">
                  <a 
                    href={
                      item.product.type === "Diamond"
                        ? `/Admin/StokYonetimi/Pirlanta/PirlantaEkle/${item.product.pk}`
                        : item.product.type === "Simple"
                        ? `/Admin/StokYonetimi/Sade/SadeEkle/${item.product.pk}`
                        : item.product.type === "ColoredStone"
                        ? `/Admin/StokYonetimi/RenkliTas/RenkliTasEkle/${item.product.pk}`
                        : "#"
                    } 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 underline"
                  >
                    {item.product.code}
                  </a>
                </div>
                <div className="text-center">
                  {item.product.type === "Simple" 
                    ? "Sade" 
                    : item.product.type === "ColoredStone" 
                    ? "Renkli Taş" 
                    : item.product.type === "Diamond" 
                    ? "Pırlanta" 
                    : item.product.type || "-"}
                </div>
                <div className="text-center">{item.quantity ?? 1}</div>
                <div className="text-center"> {item.used_carat ?? item.refunded_carat ?? item.wastage_carat ?? 0}</div>
                <div className="text-right">{item.cost ?? "-"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomFinishDataTable;
  