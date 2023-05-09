import Button from "@/base-components/Button";
import { FormInput, FormLabel } from "@/base-components/Form";
import Lucide from "@/base-components/Lucide";
import { usePut } from "@/hooks/useApi";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface ISelectedKaryawan {
  selectedKaryawan: KaryawanEntity | undefined;
}

const schema = yup
  .object({
    name: yup.string().required(),
    password: yup.string().notRequired(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
export default function FormAkun({ selectedKaryawan }: ISelectedKaryawan) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    setError,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (selectedKaryawan) {
      setValue("name", selectedKaryawan.user.name);
    }
  }, [selectedKaryawan]);

  const dispatch = useAppDispatch();
  const { mutate, isLoading } = usePut({
    endpoint: `karyawans/${selectedKaryawan?.id}/update-password`,
    name: "karyawan-details",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Akun Karyawan",
          status: "success",
        })
      );
    },
    onErrorCallback(error) {
      if (error.response.status === 422) {
        const errors = error.response.data.errors;
        Object.entries(errors).map((entry: any) => {
          setError(entry[0], {
            message: entry[1].toString(),
          });
        });
      }
    },
  });

  function handleUpdatePassword(data: FormData) {
    mutate(data);
  }

  return (
    <div className="col-span-4 intro-y box ">
      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60">
          <h2 className="mr-auto text-base font-medium">Akun Info</h2>
        </div>
        <div className="grid grid-cols-12 px-8 py-4 gap-4">
          <div className="col-span-12">
            <FormLabel htmlFor="name">Username</FormLabel>
            <FormInput type="text" {...register("name")} />
            <div className="text-danger font-semibold text-sm mt-2">
              {errors.name?.message}
            </div>
          </div>

          <div className="col-span-12">
            <FormLabel htmlFor="password">Password</FormLabel>
            <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
              <FormInput
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <Lucide
                onClick={() => setShowPassword((show) => !show)}
                icon={showPassword ? "EyeOff" : "Eye"}
                className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 right-2"
              />
            </div>

            <div className="text-danger font-semibold text-sm mt-2">
              {errors.password?.message}
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
