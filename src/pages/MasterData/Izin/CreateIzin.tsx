import { FormInput, FormLabel, FormSelect } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost } from "@/hooks/useApi";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface ICreateIzin {
  isModal: boolean;
  handleCancel(): void;
}

const schema = yup
  .object({
    nama_izin: yup.string().required(),
    quota: yup.number().required(),
    regulasi: yup.string().required(),
    durasi: yup.string().required(),
    upload_file: yup.string().notRequired(),
    jenis_izin: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreateIzin(props: ICreateIzin) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePost<FormData>({
    endpoint: "izins",
    name: "izins",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Membuat Jenis Izin Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreateIzin(data: FormData) {
    mutate({
      ...data,
      upload_file: "optional",
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat Jenis Izin",
        handleSubmit,
        submitCallback: handleCreateIzin,
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
