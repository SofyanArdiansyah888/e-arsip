import { FormInput, FormLabel } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { useGet, usePost } from "@/hooks/useApi";
import { DepartemenEntity } from "@/models/Departemen.entity";
import { GetPayload } from "@/models/GenericPayload";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface ICreateDivisi {
  isModal: boolean;
  handleCancel(): void;
}

interface IStoreDivisi {
  nama_divisi: string;
}

const schema = yup
  .object({
    nama_divisi: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreateDivisi(props: ICreateDivisi) {
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

  const { data: departemenPayload } = useGet<GetPayload<DepartemenEntity>>({
    name: "departemens",
    endpoint: "departemens",
    page: 0,
  });

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePost<IStoreDivisi>({
    endpoint: "divisis",
    name: "divisis",
    onSuccessCallback: () => {
      dispatch(setNotification({
        message: 'Berhasil Membuat Level Baru',
        status: 'success'
      }))
      props.handleCancel();
      reset();
    },
  });

  function handleCreateDivisi(data: FormData) {
    mutate({
      ...data,
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Buat Level Baru",
        handleSubmit,
        submitCallback: handleCreateDivisi,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_divisi">Nama Level</FormLabel>
          <FormInput type="text" {...register("nama_divisi")} />
          <div className="text-danger font-semibold text-sm mt-2">
            {errors.nama_divisi?.message}
          </div>
        </div>

      </div>
    </BaseModal>
  );
}
