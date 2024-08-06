"use client";
import Link from "next/link";
import Image from "next/image";
import CustomInput from "@/components/CustomUI/CustomInput";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ElementType, LoginType } from "../../types/inputTypes";
import img from "../../public/images/logo.png";
import { loginServer } from "@/actions/Auth.actions";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginType>();
  const [errList, setErrList] = useState<string>();
  const [isForgot, setIsForgot] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailIcon = useMemo(() => {
    return (
      <span className="absolute right-4 top-4">
        <svg
          className="fill-current"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
              fill=""
            />
          </g>
        </svg>
      </span>
    );
  }, []);

  const passwordIcon = useMemo(() => {
    return (
      <span className="absolute right-4 top-4">
        <svg
          className="fill-current"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
              fill=""
            />
            <path
              d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
              fill=""
            />
          </g>
        </svg>
      </span>
    );
  }, []);

  const elem1: ElementType = {
    title: "E-Posta Adresinizi Giriniz",
    placeholder: "E-Posta Adresiniz",
    icon: emailIcon,
    type: "email",
    name: "email",
    required: true,
  };

  const elem2: ElementType = {
    title: "Şifrenizi Giriniz",
    placeholder: "Şifrenizi Giriniz",
    icon: emailIcon,
    type: "password",
    name: "password",
    required: true,
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setErrList("");
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: LoginType) => {
    setIsLoading(true);
    const result = await loginServer(data);
    if (result) {
      setErrList(result);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-1 min-h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-full flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="px-26 py-17.5 text-center">
            <Link className="mb-5.5 inline-block" href="/">
              <Image
                className="hidden dark:block"
                src={img}
                alt="Logo"
                width={300}
                height={32}
                style={{ height: "auto" }}
              />
              <Image
                className="dark:hidden"
                src={img}
                alt="Logo"
                width={300}
                height={32}
                style={{ height: "auto" }}
              />
            </Link>

            <span className="mt-15 inline-block"></span>
          </div>
        </div>

        <div className="flex h-full w-full items-center border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            {!isForgot ? (
              <>
                <h2 className="mb-9 block text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Atilla Karat Sistem Giriş
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <CustomInput
                      {...register("email", {
                        required: "E-Posta Boş Bırakılamaz",
                      })}
                      item={elem1}
                      err={errors["email"]?.message?.toString() ?? null}
                    />
                  </div>

                  <div className="mb-6">
                    <CustomInput
                      {...register("password", {
                        required: "Şifre Boş Bırakılamaz",
                      })}
                      item={elem2}
                      err={errors["password"]?.message?.toString() ?? null}
                    />
                  </div>

                  <div className="mb-5">
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-primary px-5 py-4 text-center text-white hover:bg-opacity-90"
                    >
                      {isLoading && (
                        <span className="animate-spin">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <mask id="path-1-inside-1_1881_16183" fill="white">
                              <path d="M15.328 23.5293C17.8047 22.8144 19.9853 21.321 21.547 19.2701C23.1087 17.2193 23.9686 14.72 23.9992 12.1424C24.0297 9.56481 23.2295 7.04587 21.7169 4.95853C20.2043 2.8712 18.0597 1.32643 15.6007 0.552947C13.1417 -0.220538 10.499 -0.181621 8.0638 0.663935C5.62864 1.50949 3.53049 3.11674 2.07999 5.24771C0.629495 7.37868 -0.096238 9.92009 0.0102418 12.4957C0.116722 15.0713 1.04975 17.5441 2.6712 19.5481L4.96712 17.6904C3.74474 16.1796 3.04133 14.3154 2.96106 12.3737C2.88079 10.432 3.42791 8.51604 4.52142 6.90953C5.61493 5.30301 7.19671 4.09133 9.03255 3.45387C10.8684 2.81642 12.8607 2.78708 14.7145 3.3702C16.5683 3.95332 18.1851 5.1179 19.3254 6.69152C20.4658 8.26514 21.0691 10.1641 21.046 12.1074C21.023 14.0506 20.3748 15.9347 19.1974 17.4809C18.02 19.027 16.3761 20.1528 14.5089 20.6918L15.328 23.5293Z" />
                            </mask>
                            <path
                              d="M15.328 23.5293C17.8047 22.8144 19.9853 21.321 21.547 19.2701C23.1087 17.2193 23.9686 14.72 23.9992 12.1424C24.0297 9.56481 23.2295 7.04587 21.7169 4.95853C20.2043 2.8712 18.0597 1.32643 15.6007 0.552947C13.1417 -0.220538 10.499 -0.181621 8.0638 0.663935C5.62864 1.50949 3.53049 3.11674 2.07999 5.24771C0.629495 7.37868 -0.096238 9.92009 0.0102418 12.4957C0.116722 15.0713 1.04975 17.5441 2.6712 19.5481L4.96712 17.6904C3.74474 16.1796 3.04133 14.3154 2.96106 12.3737C2.88079 10.432 3.42791 8.51604 4.52142 6.90953C5.61493 5.30301 7.19671 4.09133 9.03255 3.45387C10.8684 2.81642 12.8607 2.78708 14.7145 3.3702C16.5683 3.95332 18.1851 5.1179 19.3254 6.69152C20.4658 8.26514 21.0691 10.1641 21.046 12.1074C21.023 14.0506 20.3748 15.9347 19.1974 17.4809C18.02 19.027 16.3761 20.1528 14.5089 20.6918L15.328 23.5293Z"
                              stroke="white"
                              strokeWidth="14"
                              mask="url(#path-1-inside-1_1881_16183)"
                            />
                          </svg>
                        </span>
                      )}
                      {isLoading ? "Giriş Yapılıyor" : "Giriş"}
                    </button>
                  </div>
                </form>
                <div className="mt-6 text-right">
                  <p>
                    <div
                      onClick={() => setIsForgot(true)}
                      className="cursor-pointer text-primary"
                    >
                      Şifremi Unuttum
                    </div>
                  </p>
                </div>
                {errList && (
                  <b className="block text-center text-lg capitalize text-red">
                    {errList}
                  </b>
                )}
              </>
            ) : (
              <>
                <h2 className="mb-9 block text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Şifremi Unuttum
                </h2>
                <div className="mb-4">
                  <CustomInput
                    // title="E-Posta Adresinizi Giriniz"
                    // placeholder="E-Posta Adresiniz"
                    // icon={emailIcon}
                    item={elem1}
                  />
                </div>
                <input
                  type="button"
                  value="Şifremi Gönder"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
                <div className="mt-6 text-right">
                  <p>
                    <div
                      onClick={() => setIsForgot(false)}
                      className="cursor-pointer text-primary"
                    >
                      Giriş
                    </div>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
