import { FormInput, FormLabel, FormSelect } from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import Lucide from "@/base-components/Lucide";
import { BaseModal } from "@/components/Modals/Modals";
import { usePut } from "@/hooks/useApi";
import { KeluargaKaryawanEntity } from "@/models/KeluargaKaryawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootState } from "@/stores/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

interface IEditKeluarga {
  isModal: boolean;
  handleCancel(): void;
  selectedItem: KeluargaKaryawanEntity | undefined;
}

const schema = yup
  .object({
    nama: yup.string().required(),
    tempat_lahir: yup.string().required(),
    tanggal_lahir: yup.string().required(),
    status_keluarga: yup.string().required(),
    anak_ke: yup.number().notRequired(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function EditKeluarga(props: IEditKeluarga) {
  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
    watch
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const watchStatusKeluarga = watch('status_keluarga')

  useEffect(() => {
    const { selectedItem } = props;
    if (props.selectedItem) {
      setValue("nama", selectedItem!.nama);
      setValue("tempat_lahir", selectedItem!.tempat_lahir);
      setValue("tanggal_lahir", selectedItem!.tanggal_lahir);
      setValue("status_keluarga", selectedItem!.status_keluarga);
      setValue("anak_ke", selectedItem!.anak_ke);
    }
  }, [props.isModal]);

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<FormData & { karyawan_id: number }>({
    endpoint: `keluarga-karyawans/${props.selectedItem?.id}`,
    name: "karyawan-details",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Data Keluarga",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleUpdateKeluarga(data: FormData) {
    if (selectedKaryawan)
      mutate({
        ...data,
        karyawan_id: selectedKaryawan?.id,
      });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Keluarga",
        handleSubmit,
        submitCallback: handleUpdateKeluarga,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama">
            Nama <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("nama")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="tempat_lahir">
            Tempat Lahir <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("tempat_lahir")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tempat_lahir?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="tanggal_lahir">
            Tanggal Lahir <small className="text-danger">*</small>
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
              name="tanggal_lahir"
              control={control}
            />
          </div>

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tanggal_lahir?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="status_keluarga">
            Status Keluarga <small className="text-danger">*</small>
          </FormLabel>
          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="anak">Anak</option>
                <option value="suami / istri">Suami / Istri</option>
              </FormSelect>
            )}
            name="status_keluarga"
            control={control}
            defaultValue="anak"
          />

          <div className="text-danger font-semibold text-xs mt-2">
            {errors.status_keluarga?.message}
          </div>
        </div>

        {watchStatusKeluarga === "anak" && <div className="col-span-12">
          <FormLabel htmlFor="anak_ke">
            Anak Ke <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="number" {...register("anak_ke")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.anak_ke?.message}
          </div>
        </div>}
      </div>
    </BaseModal>
  );
}
