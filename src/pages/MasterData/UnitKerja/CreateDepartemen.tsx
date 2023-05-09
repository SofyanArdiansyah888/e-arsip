import { useForm, Controller } from "react-hook-form";
import { FormInput, FormLabel } from "../../../base-components/Form";
import TomSelect from "../../../base-components/TomSelect";
import { BaseModal } from "../../../components/Modals/Modals";
import { useGet, usePost } from "../../../hooks/useApi";
import { DivisiEntity } from "../../../models/Divisi.entity";
import { GetPayload } from "../../../models/GenericPayload";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setNotification } from "../../../stores/apps/notificationSlice";
import { useAppDispatch } from "../../../stores/hooks";

interface ICreateDepartemen {
  isModal: boolean;
  handleCancel(): void;
}

const schema = yup
  .object({
    nama_departemen: yup.string().required()
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreateDepartemen(props: ICreateDepartemen) {
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

  const { mutate, isLoading } = usePost<FormData>({
    endpoint: "departemens",
    name: "departemens",
    onSuccessCallback: () => {
      dispatch(setNotification({
        message: 'Berhasil Membuat Unit Kerja Baru',
        status: 'success'
      }))
      props.handleCancel();
      reset();
    },
  });

  function handleCreateDepartemen(data: FormData) {
    mutate({
      ...data,
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat Unit Kerja",
        handleSubmit,
        submitCallback: handleCreateDepartemen,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_departemen">Nama Unit Kerja</FormLabel>
          <FormInput type="text" {...register("nama_departemen")} />
          <div className="text-danger font-semibold text-sm mt-2">
            {errors.nama_departemen?.message}
          </div>
        </div>

      </div>
    </BaseModal>
  );
}
