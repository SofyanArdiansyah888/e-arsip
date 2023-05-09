import { FormInput, FormLabel, FormSelect } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePut } from "@/hooks/useApi";
import { IzinEntity } from "@/models/Izin.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface IEditIzin {
  isModal: boolean;
  selectedItem: IzinEntity | undefined;
  handleCancel(): void;
}

const schema = yup
  .object({
    nama_izin: yup.string().required(),
    quota: yup.number().required(),
    durasi: yup.string().required(),
    upload_file: yup.string().notRequired(),
    regulasi: yup.string().required(),
    jenis_izin: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function EditIzin(props: IEditIzin) {
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

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<FormData>({
    endpoint: `izins/${props.selectedItem?.id}`,
    name: "izins",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Jenis Izin Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  useEffect(() => {
    const { selectedItem } = props;
    if (selectedItem) {
      setValue("nama_izin", selectedItem.nama_izin);
      setValue("quota", selectedItem.quota);
      setValue("regulasi", selectedItem.regulasi);
      setValue("durasi", selectedItem.durasi);
      setValue("jenis_izin", selectedItem.jenis_izin);
    }
  }, [props.isModal]);

  function handleEditIzin(data: FormData) {
    mutate({
      ...data,
      upload_file: 'optional'
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat Jenis Izin",
        handleSubmit,
        submitCallback: handleEditIzin,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="jenis_izin">Jenis Izin/Cuti</FormLabel>
          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="izin">Izin</option>
                <option value="cuti">Cuti</option>
              </FormSelect>
            )}
            name="jenis_izin"
            control={control}
            defaultValue="izin"
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.jenis_izin?.message}
          </div>
        </div>
        <div className="col-span-6">
          <FormLabel htmlFor="nama_izin">Nama Izin</FormLabel>
          <FormInput type="text" {...register("nama_izin")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_izin?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="quota">Quota Izin</FormLabel>
          <FormInput type="number" {...register("quota")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.quota?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="durasi">Durasi</FormLabel>
          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="half day">Half Day</option>
                <option value="full day">Full Day</option>
              </FormSelect>
            )}
            name="durasi"
            control={control}
            defaultValue="full day"
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.durasi?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="regulasi">Regulasi</FormLabel>
          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="dibayar">Dibayar</option>
                <option value="tidak dibayar">Tidak Dibayar</option>
              </FormSelect>
            )}
            name="regulasi"
            control={control}
            defaultValue="dibayar"
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.regulasi?.message}
          </div>
        </div>

        {/* <div className="col-span-6">
          <FormLabel htmlFor="upload_file">Upload File</FormLabel>
          <Controller
            render={({ field }) => (
              <FormSelect {...field}>
                <option value="mandatory">Mandatory</option>
                <option value="optional">Optional</option>
              </FormSelect>
            )}
            name="upload_file"
            control={control}
            defaultValue="optional"
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.upload_file?.message}
          </div>
        </div> */}
      </div>
    </BaseModal>
  );
}
