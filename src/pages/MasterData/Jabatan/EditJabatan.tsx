import { FormInput, FormLabel } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePut } from "@/hooks/useApi";
import { JabatanEntity } from "@/models/Jabatan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    nama_jabatan: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface IEditJabatan {
  isModal: boolean;
  selectedItem: JabatanEntity | undefined;
  handleCancel(): void;
}

export default function EditJabatan(props: IEditJabatan) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<IEditJabatan>({
    endpoint: `jabatans/${props.selectedItem?.id}`,
    name: "jabatans",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengedit Jabatan",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  useEffect(() => {
    if (props.selectedItem) {
      setValue("nama_jabatan", props.selectedItem?.nama_jabatan);
    }
  }, [props.isModal]);

  function handleEditJabatan(data: any) {
    mutate({ ...data });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Jabatan",
        handleSubmit,
        submitCallback: handleEditJabatan,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_jabatan">Jabatan</FormLabel>
          <FormInput type="text" {...register("nama_jabatan")} />
          <div className="text-danger font-semibold text-sm mt-2">
            {errors.nama_jabatan?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
