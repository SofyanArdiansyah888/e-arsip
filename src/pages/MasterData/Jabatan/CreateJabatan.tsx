import { FormInput, FormLabel } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost } from "@/hooks/useApi";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface ICreateJabatan {
  isModal: boolean;
  handleCancel(): void;
}

interface IStoreJabatan {
  nama_jabatan: string;
}

const schema = yup
  .object({
    nama_jabatan: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreateJabatan(props: ICreateJabatan) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePost<IStoreJabatan>({
    endpoint: "jabatans",
    name: "jabatans",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Membuat Jabatan Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreateJabatan(data: any) {
    mutate({
      ...data,
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat Jabatan",
        handleSubmit,
        submitCallback: handleCreateJabatan,
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
