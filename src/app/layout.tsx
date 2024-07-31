"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "nouislider/dist/nouislider.css";
import "dropzone/dist/dropzone.css";
import "@/css/satoshi.css";
import "@/css/simple-datatables.css";
import "@/css/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "lightgallery.js/dist/css/lightgallery.css";
import { LightgalleryProvider } from "react-lightgallery";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body suppressHydrationWarning={true}>
        <LightgalleryProvider
          lightgallerySettings={{
            thumbnail: false,
            controls: false,
          }}
        >
          <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
        </LightgalleryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
