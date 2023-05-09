import {
  FormInput,
  FormLabel,
  FormSelect,
} from "@/base-components/Form";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { BaseModal } from "@/components/Modals/Modals";
import { usePut } from "@/hooks/useApi";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ShiftEntity } from "@/models/Shift.entity";
import { useEffect } from "react";

interface IEditShift {
  isModal: boolean;
  selectedItem: ShiftEntity | undefined;
  handleCancel(): void;
}

const schema = yup
  .object({
    nama_shift: yup.string().required(),
    public_day_off: yup.string().required(),
    jadwal_shift: yup.array(),
    // .of(yup.object().shape({
    //   selected: yup.boolean().required(),
    //   hari: yup.string().required(),
    //   masuk: yup.string().required(),
    //   keluar: yup.string().required(),
    //   toleransi: yup.number().required(),
    //   periode_istirahat: yup.number().required(),
    //   waktu_kerja: yup.number().required()
    // })
    // ),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function EditShift(props: IEditShift) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    getValues,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const periode_istirahat = 60;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "jadwal_shift",
    }
  );

  useEffect(() => {
    reset();
    const { selectedItem } = props;
    if (selectedItem) {
      setValue("nama_shift", selectedItem.nama_shift);
      setValue("public_day_off", selectedItem.public_day_off.toString());
        
      selectedItem.jadwal_shifts.map((shift) => {
        
        append({
          ...shift,
          selected: shift.selected === 1 ? true : false
        });
      });
    }
  }, [props.isModal]);

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<
    Omit<FormData, "public_day_off"> & { public_day_off: boolean }
  >({
    endpoint: `shifts/${props.selectedItem?.id}`,
    name: "shifts",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Membuat Shift Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleEditShift(data: FormData) {
    
    mutate({
      ...data,
      public_day_off: String(data.public_day_off).toLowerCase() === "true",
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat Shift",
        handleSubmit,
        submitCallback: handleEditShift,
        control,
        isLoading,
        size: "xl",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-6">
          <FormLabel htmlFor="nama_shift">Nama Shift</FormLabel>
          <FormInput type="text" {...register("nama_shift")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_shift?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="divisi">Kerja Hari Libur</FormLabel>
          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="true">Ya</option>
                <option value="false">Tidak</option>
              </FormSelect>
            )}
            name="public_day_off"
            control={control}
            defaultValue="false"
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.public_day_off?.message}
          </div>
        </div>

        <div className="col-span-12"></div>

        <div className="col-span-12">
          <div className="relative overflow-auto shadow-md sm:rounded-lg max-h-[55vh]">
            <table className=" text-sm text-left text-gray-500 w-full ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-1 text-center">
                    {/* <input
                      type="checkbox"
                      className=" border border-gray-300 px-2"
                      onChange={(e) => {
                        let temp = jadwalShift?.map((shift) => {
                          shift.selected = e.target.checked;
                          return shift;
                        });
                        setValue('jadwal_shift',temp);
                      }}
                    ></input> */}
                  </th>
                  <th className="px-6 py-1">Hari</th>
                  <th className="px-6 py-1">Masuk</th>
                  <th className="px-6 py-1">Keluar</th>
                  {/* <th className="px-6 py-1">Toleransi</th> */}
                  <th className="px-6 py-1">Waktu Kerja</th>
                </tr>
              </thead>
              <tbody>
                {fields.map(({ selected }, index) => (
                  <tr className="bg-white border-b ">
                    <td className="w-2 p-3  text-center">
                      <input
                        type="checkbox"
                        className="border border-gray-300 px-2"
                        {...register(`jadwal_shift.${index}.selected`, {
                          required: true,
                        })}
                      />
                    </td>
                    <td className="w-4 p-3  text-center">
                      <input
                        className="capitalize  border border-gray-300 text-gray-900 text-sm rounded-md w-24 px-2"
                        {...register(`jadwal_shift.${index}.hari`)}
                        disabled
                      />
                    </td>
                    <td className="w-4 p-3 capitalize">
                      <input
                        className=" border border-gray-300 text-gray-900 text-sm rounded-md w-24 px-2"
                        {...register(`jadwal_shift.${index}.masuk`)}
                        onChange={(e) => {
                          let keluar = getValues(
                            `jadwal_shift.${index}.keluar`
                          );
                          setValue(
                            `jadwal_shift.${index}.waktu_kerja`,
                            calculateTime(
                              e.target.value,
                              keluar,
                              periode_istirahat
                            )
                          );
                        }}
                      />
                    </td>
                    <td className="w-4 p-3 capitalize">
                      <input
                        className=" border border-gray-300 text-gray-900 text-sm rounded-md w-24 px-2"
                        {...register(`jadwal_shift.${index}.keluar`)}
                        onChange={(e) => {
                          let masuk = getValues(`jadwal_shift.${index}.masuk`);
                          setValue(
                            `jadwal_shift.${index}.waktu_kerja`,
                            calculateTime(
                              masuk,
                              e.target.value,
                              periode_istirahat
                            )
                          );
                        }}
                      />
                    </td>
                    <td className="w-4 p-3 capitalize hidden">
                      <input
                        type="number"
                        className=" border border-gray-300 text-gray-900 text-sm rounded-md w-24 px-2 xs h-6"
                        {...register(`jadwal_shift.${index}.toleransi`, {
                          required: true,
                          max: 3,
                        })}
                      />
                    </td>

                    <td className="w-4 p-3 capitalize">
                      <input
                        className=" border border-gray-300 text-gray-900 text-sm rounded-md w-24 px-2"
                        disabled
                        {...register(`jadwal_shift.${index}.waktu_kerja`)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

function calculateTime(start: string, end: string, periode_istirahat: number) {
  let startParsed = start.split(":");
  let endParsed = end.split(":");
  let diffHours = 0;
  let diffMinutes = 0;
  if (startParsed.length === 2 && endParsed.length === 2) {
    diffHours = parseInt(endParsed[0]) - parseInt(startParsed[0]);
    diffMinutes = parseInt(endParsed[1]) - parseInt(startParsed[1]);
    diffHours += diffMinutes / 60;
    diffHours -= periode_istirahat / 60;
  }
  return diffHours;
}
