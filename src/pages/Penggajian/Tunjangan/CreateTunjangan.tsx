import {
  FormInput,
  FormLabel
} from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost } from "@/hooks/useApi";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface ICreateTunjangan {
  isModal: boolean;
  handleCancel(): void;
}
const schema = yup
.object({
  nama_tunjangan: yup.string().required(),
})
.required();
type FormData = yup.InferType<typeof schema>;


export default function CreateTunjangan(props: ICreateTunjangan) {

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    unregister
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

 
  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePost<FormData & {nominal_bawaan: number}>({
    endpoint: "tunjangans",
    name: "tunjangans",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Membuat Tunjangan Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreateTunjangan(data: FormData) {

    mutate({
      ...data,
      nominal_bawaan: 0
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat Tunjangan Baru",
        handleSubmit,
        submitCallback: handleCreateTunjangan,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_tunjangan">
            Nama Tunjangan <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("nama_tunjangan")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_tunjangan?.message}
          </div>
        </div>

     

       
      </div>
    </BaseModal>
  );
}
