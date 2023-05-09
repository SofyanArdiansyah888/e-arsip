import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { FormLabel, FormTextarea } from "../../../base-components/Form";
import Litepicker from "../../../base-components/Litepicker";
import { BaseModal } from "../../../components/Modals/Modals";
import { usePost } from "../../../hooks/useApi";
import { setNotification } from "../../../stores/apps/notificationSlice";
import { useAppDispatch } from "../../../stores/hooks";

interface ICreateHariLibur {
  isModal: boolean;
  handleCancel(): void;
}

const schema = yup
  .object({
    deskripsi: yup.string().required(),
    tanggal_libur: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export function CreateHariLibur(props: ICreateHariLibur) {

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePost<{deskripsi: string, mulai: string, selesai: string}>({
    endpoint: "jadwal-liburs",
    name: "hari-liburs",
    onSuccessCallback: () => {
      dispatch(setNotification({
        message: 'Berhasil Membuat Hari Libur Baru Baru',
        status: 'success'
      }))
      props.handleCancel();
      reset();
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  
  const newProps = {
    ...props,
    title: "Buat Hari Libur",
    handleSubmit,
    isLoading,
    submitCallback: ({deskripsi,tanggal_libur}:FormData) => {
      let temp = tanggal_libur.split("-");
      mutate({
        deskripsi,
        mulai: temp[0],
        selesai: temp[1]
      })
    },
  };

  return (
    <BaseModal {...newProps}>
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="tanggal_libur">
            Tanggal Mulai - Tanggal Selesai
          </FormLabel>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Litepicker
                value={value}
                onChange={onChange}
                options={{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="block  mx-auto"
              />
            )}
            name="tanggal_libur"
            control={control}
          />
               <div className="text-danger font-semibold text-xs mt-2">
            {errors.tanggal_libur?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="deskripsi">Keterangan</FormLabel>
          <FormTextarea {...register("deskripsi")} />
          <div className="text-danger font-semibold text-sm mt-2">
            {errors.deskripsi?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
