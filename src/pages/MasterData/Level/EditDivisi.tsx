import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  FormInput,
  FormLabel
} from "@/base-components/Form";
import TomSelect from "@/base-components/TomSelect";
import { BaseModal } from "@/components/Modals/Modals";
import { useGet, usePut } from "@/hooks/useApi";
import { DepartemenEntity } from "@/models/Departemen.entity";
import { DivisiEntity } from "@/models/Divisi.entity";
import { GetPayload } from "@/models/GenericPayload";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";

const schema = yup
  .object({
    nama_divisi: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface IEditDivisi {
  isModal: boolean;
  selectedItem: DivisiEntity | undefined;
  handleCancel(): void;
}



export default function EditDivisi(props: IEditDivisi) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
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

  const { mutate, isLoading } = usePut<IEditDivisi>({
    endpoint: `divisis/${props.selectedItem?.id}`,
    name: "divisis",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengedit Level",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  useEffect(() => {
    if(props.selectedItem){
      setValue('nama_divisi',props.selectedItem?.nama_divisi)
    }
    
  },[props.isModal])

  function handleEditDivisi(data: any) {
    mutate({ ...data });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Level",
        handleSubmit,
        submitCallback: handleEditDivisi,
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
