"use client";
import { cn } from "@/utils";
import React, { useEffect } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
  HeaderGroup,
} from "react-table";

import { useRouter } from "next/navigation";

const CustomDatatable = ({
  data,
  columns,
  totalPageCount,
  activePage,
  setActivePage,
  className,
  filterList,
  selectedFilter,
  setSelectedFilter,
  setFirstCenter = false,
}: {
  data: any[];
  columns: any;
  totalPageCount: number;
  activePage: number;
  setActivePage: any;
  className?: any;
  filterList?: any;
  selectedFilter?: any;
  setSelectedFilter?: any;
  setFirstCenter?: boolean;
}) => {
  const router = useRouter();

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    gotoPage,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    if (selectedFilter) {
      setActivePage(1);
    }
  }, [selectedFilter, setActivePage]);
  const arrOptions: number[] = new Array(totalPageCount)
    .fill(0)
    .map((item, index) => index);

  const headers = () => {
    return (
      <thead>
        {headerGroups.map((headerGroup, key) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={key}>
            {headerGroup.headers.map(
              (
                column: HeaderGroup<object> & {
                  isCenter?: boolean;
                  isLarge?: boolean;
                },
                key,
              ) => {
                return (
                  <th
                    className={cn(
                      "h-full  whitespace-nowrap",
                      column.isLarge ? "w-65" : "w-40",
                      column.id == "islemler" && "w-28",
                      "!border border-stroke",
                      column.columns?.length
                      ? column.columns.some((col) => col.Header === "Karat")
                        ? "w-[360px]"
                        : "w-[460px]"
                      : "",
                      "last:sticky last:inset-0 last:z-30 last:bg-gray-3",
                    )}
                    {...column.getHeaderProps()}
                    key={key}
                  >
                    <div
                      className={cn(
                        "flex h-full items-center",
                        column.isCenter && "justify-center",
                        column.columns?.length && "justify-center",
                        headerGroup.headers.length - 1 == key &&
                          "justify-center text-center",
                      )}
                    >
                      <span>
                        {column.render("Header") == "-"
                          ? ""
                          : column.render("Header")}
                      </span>
                      {!column.headers?.length && (
                        <div className="ml-2 inline-flex flex-col space-y-[2px]">
                          <span
                            className="inline-block cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push(`?order_by=${column.id}&sort=desc`);
                            }}
                          >
                            <svg
                              className="fill-current"
                              width="10"
                              height="5"
                              viewBox="0 0 10 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5 0L0 5H10L5 0Z" fill="" />
                            </svg>
                          </span>
                          <span
                            className="inline-block cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push(`?order_by=${column.id}&sort=asc`);
                            }}
                          >
                            <svg
                              className="fill-current"
                              width="10"
                              height="5"
                              viewBox="0 0 10 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z"
                                fill=""
                              />
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                  </th>
                );
              },
            )}
          </tr>
        ))}
      </thead>
    );
  };

  if (data.length == 0 && totalPageCount != 0) {
    return (
      <section
        className={cn(
          "data-table-common data-table-two !flex h-full w-full flex-col overflow-auto rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark",
          className && className,
        )}
      >
        <div className="sticky inset-0 flex w-full justify-between px-8 pb-4 ">
          <div className="w-100">
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
              placeholder="Arama..."
            />
          </div>

          <div className="flex items-center font-medium">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-transparent pl-2"
            >
              {[10, 20, 30, 50].map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <p className="pl-2 text-black dark:text-white">
              Sayfa Başı Gösterim
            </p>
          </div>
        </div>
        <table
          {...getTableProps()}
          className="datatable-table min-w-full table-fixed  !border-collapse overflow-auto break-words !border-t border-stroke px-4 dark:border-strokedark md:px-8"
        >
          {headers()}
          <tbody>
            {new Array(10).fill(null).map((item, index) => (
              <tr key={index} role="status" className="w-full">
                <td colSpan={headerGroups[0].headers.length}>
                  <div className="block h-6 w-full animate-pulse  rounded-md bg-gray-2"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="sticky inset-0 mt-auto flex  w-full justify-between   px-8 pt-5 dark:border-strokedark">
          <p className="font-medium">
            Gösterim {activePage} - {totalPageCount} Sayfa
          </p>
          <div className="sticky right-0 flex">
            <button
              className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
              onClick={() =>
                setActivePage((prev: number) => {
                  return prev > 1 ? prev - 1 : prev;
                })
              }
              disabled={activePage == 1}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z"
                  fill=""
                />
              </svg>
            </button>

            {arrOptions.map((_page, index) => (
              <button
                key={index}
                onClick={() => {
                  // gotoPage(index);

                  setActivePage(index + 1);
                }}
                className={`${
                  activePage - 1 === index && "bg-primary text-white"
                } mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white`}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
              onClick={() => {
                nextPage();
                setActivePage((prev: number) => prev + 1);
              }}
              disabled={activePage == totalPageCount}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "data-table-common data-table-two !flex h-full w-full flex-col overflow-auto rounded-sm border border-stroke bg-white  pt-0 shadow-default dark:border-strokedark dark:bg-boxdark",
        className && className,
      )}
    >
      <div className="sticky inset-0  z-99 flex w-full items-center justify-between rounded-sm bg-white  px-8  pb-4 pt-4">
        <div className="w-100">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
            placeholder="Arama..."
          />
        </div>
        {filterList && (
          <div className="ml-3 mr-auto flex gap-2">
            {filterList.map((item: any, index: number) => (
              <div
                className={cn(
                  "curs h-full cursor-pointer  rounded-md bg-primary p-3 font-bold text-white",
                  selectedFilter.value == item.value && "bg-green-700",
                )}
                onClick={() => setSelectedFilter(item)}
                key={index}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center font-medium">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-transparent pl-2"
          >
            {[10, 20, 30, 50].map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
          <p className="pl-2 text-black dark:text-white">Sayfa Başı Gösterim</p>
        </div>
      </div>
      <table
        {...getTableProps()}
        className="datatable-table min-w-full table-fixed !border-collapse overflow-auto break-words !border-t border-stroke px-4 pb-0 dark:border-strokedark md:px-8"
      >
        {headers()}
        <tbody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={`tr-${key}`}>
                {row.cells.map((cell, key) => {
                  return (
                    <td
                      className={cn(
                        "z-20 border border-slate-400 !align-middle text-sm font-thin last:sticky last:inset-0 last:z-30 last:bg-gray-3  last:text-center",
                        (cell.column.Header === "Maliyet" 
                          || cell.column.Header === "PPC" 
                          || cell.column.Header === "Rapaport" 
                          || cell.column.Header === "Toplam"
                          || cell.column.Header === "Toplam İşçilik"
                          || cell.column.Header === "Etiket Fiyatı"
                          || cell.column.Header === "İşçilik") && "text-right",
                          cell.column.Header === "Resim" && "w-[55px] h-[55px] overflow-hidden"

                      )}
                      {...cell.getCellProps()}
                      key={`cell-${key}`}
                    >
                      {setFirstCenter ? (
                        <div className="flex h-2 w-full items-center justify-center">
                          {cell.render("Cell")}
                        </div>
                      ) : (
                        <div className="items-center justify-center h-1 pb-1 mt-[-10px]">
                        {cell.render("Cell")}
                      </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="sticky inset-0  z-999 flex w-full items-center justify-between   bg-white px-8 py-5  dark:border-strokedark">
        <p className="font-medium">
          Gösterim {activePage} - {totalPageCount} Sayfa
        </p>
        {arrOptions.length > 0 && (
          <div className="sticky right-0 flex">
            <button
              className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
              onClick={() =>
                setActivePage((prev: number) => {
                  return prev > 1 ? prev - 1 : prev;
                })
              }
              disabled={activePage == 1}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z"
                  fill=""
                />
              </svg>
            </button>

            {arrOptions.map((_page, index) => (
              <button
                key={index}
                onClick={() => {
                  setActivePage(index + 1);
                }}
                className={`${
                  activePage - 1 === index && "bg-primary text-white"
                } mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white`}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
              onClick={() => {
                nextPage();
                setActivePage((prev: number) => prev + 1);
              }}
              disabled={activePage == totalPageCount}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomDatatable;
