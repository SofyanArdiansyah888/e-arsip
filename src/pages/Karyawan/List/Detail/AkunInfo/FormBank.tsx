import Button from "@/base-components/Button";
import { FormInput, FormLabel } from "@/base-components/Form";
import { setValue } from "@/base-components/Litepicker/litepicker";
import { usePut } from "@/hooks/useApi";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
export interface ISelectedKaryawan {
  selectedKaryawan: KaryawanEntity | undefined;
}

const schema = yup
  .object({
    nama_pemilik_rekening: yup.string().required(),
    nama_bank: yup.string().required(),
    nomor_rekening: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
export default function FormBank({ selectedKaryawan }: ISelectedKaryawan) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const { mutate, isLoading } = usePut({
    endpoint: `karyawans/${selectedKaryawan?.id}/update-bank`,
    name: "karyawan-details",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Informasi Bank",
          status: "success",
        })
      );
    },
  });

  useEffect(() => {
    if (selectedKaryawan) {
      setValue("nama_bank", selectedKaryawan.nama_bank);
      setValue("nama_pemilik_rekening", selectedKaryawan.nama_pemilik_rekening);
      setValue("nomor_rekening", selectedKaryawan.nomor_rekening);
    }
  }, [selectedKaryawan]);

  function handleUpdateBank(data: FormData) {
    mutate(data);
  }

  return (
    <div className="col-span-8 intro-y box ">
      <form onSubmit={handleSubmit(handleUpdateBank)}>
        <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
          <h2 className="mr-auto text-base font-medium">Bank Info</h2>
        </div>
        <div className="grid grid-cols-12 px-8 py-4 gap-4">
          <div className="col-span-12">
            <FormLabel htmlFor="nama_pemilik_rekening">
              Nama Pemilik Rekening
            </FormLabel>
            <FormInput type="text" {...register("nama_pemilik_rekening")} />
            <div className="text-danger font-semibold text-sm mt-2">
              {errors.nama_pemilik_rekening?.message}
            </div>
          </div>

          <div className="col-span-6">
            <FormLabel htmlFor="nama_bank">Nama Bank</FormLabel>
            <FormInput type="text" {...register("nama_bank")} />
            <div className="text-danger font-semibold text-sm mt-2">
              {errors.nama_bank?.message}
            </div>
          </div>

          <div className="col-span-6">
            <FormLabel htmlFor="nomor_rekening">Nomor Rekening</FormLabel>
            <FormInput type="text" {...register("nomor_rekening")} />
            <div className="text-danger font-semibold text-sm mt-2">
              {errors.nomor_rekening?.message}
            </div>
          </div>

          <div className="col-span-12 ">
            <Button
              variant="primary"
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Simpan"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
