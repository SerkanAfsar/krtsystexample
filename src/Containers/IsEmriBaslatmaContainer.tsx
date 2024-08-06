"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  WorkOrderAtolyeType,
  WorkOrderPeopleList,
  WorkOrderTeamGroupType,
  WorkOrderType,
} from "../../types/WorkOrder.types";
import CustomSelect from "@/components/CustomUI/CustomSelect";
import { CustomOptionType } from "../../types/inputTypes";
import { useEffect, useState } from "react";
import {
  AddWorkOrderLogService,
  GetWorkOrderPeopleByGroups,
} from "@/Services/WorkOrder.Services";
import CustomInput from "@/components/CustomUI/CustomInput";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
export default function IsEmriBaslatmaContainer({
  workOrderGroups,
  workOrder,
}: {
  workOrder: WorkOrderType;
  workOrderGroups: WorkOrderTeamGroupType[];
}) {
  // const   isUpdate = false,
  const { id } = useParams();
  const searchParams = useSearchParams();
  const isFirst =
    searchParams.get("isFirst") && Boolean(searchParams.get("isFirst"));

  const [teslimEdenList, setTeslimEdenList] = useState<CustomOptionType[]>([]);
  const [teslimAlanList, setTeslimAlanList] = useState<CustomOptionType[]>([]);

  const newGroupData: CustomOptionType[] = workOrderGroups.map((item) => ({
    titleVal: item.name,
    valueVal: item.id.toString(),
  }));

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<WorkOrderAtolyeType>({
    defaultValues: {
      from_group:
        workOrderGroups.find((a) => a.name == workOrder.group)?.id || undefined,
    },
  });

  useEffect(() => {
    if (!isFirst) {
      const grpId = workOrderGroups.find((a) => a.name == workOrder.group)?.id;
      GetWorkOrderPeopleByGroups({ group_ids: [Number(grpId)] })
        .then((resp: WorkOrderPeopleList[]) => {
          const data = resp.map((item) => ({
            titleVal: item.username,
            valueVal: item.id.toString(),
          }));
          return data;
        })
        .then((data) => {
          setTeslimEdenList(data);
          const fromPerson = data.find(
            (a) => a.titleVal == workOrder.user,
          )?.valueVal;

          setValue("from_person", fromPerson ? Number(fromPerson) : 0);
        })
        .catch((err) => {
          console.log("err is ", err);
        });
    }
  }, [isFirst, workOrder.group, workOrderGroups, setValue, workOrder.user]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && (name == "from_group" || "to_group")) {
        GetWorkOrderPeopleByGroups({ group_ids: [Number(value[name])] })
          .then((resp: WorkOrderPeopleList[]) => {
            const data = resp.map((item) => ({
              titleVal: item.username,
              valueVal: item.id.toString(),
            }));
            return data;
          })
          .then((data) => {
            if (name == "from_group") {
              setTeslimEdenList(data);
            } else if (name == "to_group") {
              setTeslimAlanList(data);
            }
          })
          .catch((err) => {
            console.log("err is ", err);
          });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<WorkOrderAtolyeType> = async (data) => {
    const newData: WorkOrderAtolyeType = { ...data, work_order: Number(id) };
    const result = await AddWorkOrderLogService({ data: newData });
    if (result?.success) {
      return toast.success("Eklendi", { position: "top-right" });
    } else {
      return toast.error(result.error ? result.error[0] : "Hata", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="mb-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke dark:border-strokedark">
        <div className="flex w-full items-center justify-between">
          <h3 className="p-4 text-lg font-medium text-black dark:text-white">
            Atölye Bilgileri
          </h3>
          <b className="mr-4 text-black"></b>
        </div>
      </div>
      <hr />
      <div className="m-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full grid-cols-4 gap-4">
            <CustomSelect
              item={{
                title: "Çıkış Atolye",
                type: "select",
                name: "from_group",
                required: true,
                options: newGroupData,
              }}
              disabled={!isFirst ? true : false}
              err={errors.from_group?.message}
              {...register("from_group", {
                required: "Çıkış Atölye Seçiniz",
                valueAsNumber: true,
              })}
            />
            <CustomSelect
              item={{
                title: "Teslim Eden",
                type: "select",
                name: "from_person",
                required: true,
                options: teslimEdenList,
              }}
              disabled={!isFirst ? true : false}
              err={errors.from_person?.message}
              {...register("from_person", {
                required: "Teslim Eden Personel Seçiniz",
                valueAsNumber: true,
              })}
            />
            <CustomSelect
              item={{
                title: "Giriş Atolye",
                type: "select",
                name: "to_group",
                required: true,
                options: newGroupData,
              }}
              err={errors.to_group?.message}
              {...register("to_group", {
                required: "Giriş Atölye Seçiniz",
                valueAsNumber: true,
              })}
            />
            <CustomSelect
              item={{
                title: "Teslim Alan",
                type: "select",
                name: "to_person",
                required: true,
                options: teslimAlanList,
              }}
              err={errors.to_person?.message}
              {...register("to_person", {
                required: "Teslim Alan Personel Seçiniz",
                valueAsNumber: true,
              })}
            />
            <CustomInput
              item={{
                name: "description",
                title: "Açıklama",
                required: false,
                type: "text",
              }}
              {...register("description", {
                required: false,
              })}
            />
            <CustomInput
              item={{
                name: "output_gram",
                title: "Çıkış Gramı",
                required: true,
                type: "number",
                placeholder: "Çıkış Gramı",
              }}
              err={errors.output_gram?.message}
              {...register("output_gram", {
                required: "Çıkış Gramını Giriniz",
                valueAsNumber: true,
              })}
            />
            <CustomInput
              item={{
                name: "cost",
                title: "İşçilik",
                required: true,
                type: "number",
                placeholder: "İşçilik",
                rightIcon: "$",
              }}
              {...register("cost", {
                required: "İşçilik Giriniz",
                valueAsNumber: true,
              })}
              err={errors.cost?.message}
            />

            <button className="col-start-3 col-end-4 mt-10 rounded-md border border-primary bg-white p-3 text-black">
              İPTAL
            </button>
            <button className="col-start-4 col-end-5 mt-10 rounded-md bg-primary p-3 text-white">
              GÖNDER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
