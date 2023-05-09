import { FormInput, FormLabel } from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import Lucide from "@/base-components/Lucide";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost } from "@/hooks/useApi";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootState } from "@/stores/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

interface ICreateRiwayatTraining {
  isModal: boolean;
  handleCancel(): void;
}
const schema = yup
  .object({
    nama_kegiatan: yup.string().required(),
    tahun: yup.string().required(),
    valid: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreateRiwayatTraining(props: ICreateRiwayatTraining) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();
  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );

  const { mutate, isLoading } = usePost<FormData & { karyawan_id: number }>({
    endpoint: "riwayat-training-karyawans",
    name: "karyawan-details",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menambahkan Riwayat Training Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreateRiwayatTraining(data: FormData) {
    if (selectedKaryawan?.id)
      mutate({
        ...data,
        karyawan_id: selectedKaryawan.id,
      });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Tambahan Pendidikan Formal",
        handleSubmit,
        submitCallback: handleCreateRiwayatTraining,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_kegiatan">
            Nama Kegiatan <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("nama_kegiatan")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_kegiatan?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="tahun">
            Tahun <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="number" {...register("tahun")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tahun?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="valid">
            Valid <small className="text-danger">*</small>
          </FormLabel>
          <div className="relative text-slate-500">
            <Lucide
              icon="Calendar"
              className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <Litepicker
                  onChange={onChange}
                  value={value}
                  options={{
                    autoApply: false,
                    singleMode: true,
                    numberOfColumns: 0,
                    numberOfMonths: 1,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  className="form-control box pl-10 cursor-pointer"
                />
              )}
              name="valid"
              control={control}
            />
          </div>
          
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.valid?.message}
          </div>
        </div>

      </div>
    </BaseModal>
  );
}
