import { useEffect, useState } from "react";
import Image from "next/image";

export default function CustomImageSelect({
  mainImage,
  title,
  setCustomImage,
}: {
  title?: string;
  mainImage?: string | ArrayBuffer;
  setCustomImage?: any;
}) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | undefined>(
    mainImage,
  );

  const getBase64 = (file: any): any => {
    if (file && file[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function () {
        setImage(reader.result ?? undefined);
        setCustomImage && setCustomImage(reader.result ?? undefined);
      };
      reader.onerror = function (error) {
        console.log("Base 64 Error: ", error);
        setImage(undefined);
      };
    }
  };

  useEffect(() => {
    if (files) {
      getBase64(files);
    } else {
      setImage(undefined);
    }
  }, [files]);

  return (
    <div>
      {title && (
        <label className="mb-3 block h-5 w-full text-left text-sm font-medium text-black dark:text-white">
          {title}
        </label>
      )}
      {!image ? (
        <div
          id="FileUpload"
          className="relative block w-full appearance-none rounded-sm border border-dashed border-stone-400 bg-white px-4 py-4 dark:border-strokedark dark:bg-boxdark sm:py-14"
        >
          <input
            type="file"
            accept="image/*"
            multiple={false}
            className="absolute inset-0 z-50 m-0 h-full w-full p-0 opacity-0 outline-none"
            onChange={(event) => setFiles(event.target.files as FileList)}
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <span className="flex h-11.5 w-11.5 items-center justify-center rounded-full border border-stroke bg-primary/5 dark:border-strokedark">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_75_12841)">
                  <path
                    d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85663V14.1666H9.16667V4.85663L4.1075 9.91663L2.92917 8.73829L10 1.66663L17.0708 8.73746L15.8925 9.91579L10.8333 4.85829V4.85663Z"
                    fill="#3C50E0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_75_12841">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="text-md block text-center">Resim Sürükle Ya da Seç</p>
          </div>
        </div>
      ) : (
        <Image
          src={image as string}
          alt="deneme"
          width={300}
          height={200}
          className="h-auto w-full"
        />
      )}
      {files !== null && (
        <div className="mt-4.5 border border-stroke bg-white px-4 py-3 dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between">
            <span>{files[0]?.name}</span>

            <button onClick={() => setFiles(null)}>
              <svg
                className="fill-current"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
