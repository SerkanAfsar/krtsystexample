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
import { Suspense } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body suppressHydrationWarning>
        <LightgalleryProvider
          lightgallerySettings={{
            thumbnail: false,
            controls: false,
          }}
        >
          <Suspense>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {children}
              <ProgressBar
                height="4px"
                color="#3C50E0"
                options={{ showSpinner: true }}
                shallowRouting
              />
            </div>
          </Suspense>
        </LightgalleryProvider>

        <ToastContainer />
      </body>
    </html>
  );
}
