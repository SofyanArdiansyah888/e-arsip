import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../base-components/Button";
import {
  FormInput,
  FormLabel,
  FormTextarea,
} from "../../../base-components/Form";
import Dialog from "../../../base-components/Headless/Dialog";
import Lucide from "../../../base-components/Lucide";
import { BackButton, SimpanButton } from "../../../components/Buttons/Buttons";
import { BaseModal } from "../../../components/Modals/Modals";
import * as yup from "yup";
import { useGet, usePost, usePut } from "../../../hooks/useApi";
import { DivisiEntity } from "../../../models/Divisi.entity";
import { GetPayload } from "../../../models/GenericPayload";
import { setNotification } from "../../../stores/apps/notificationSlice";
import { useAppDispatch } from "../../../stores/hooks";
import { DepartemenEntity } from "../../../models/Departemen.entity";
import TomSelect from "../../../base-components/TomSelect";
import { useEffect } from "react";

const schema = yup
  .object({
    nama_departemen: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface IEditDepartemen {
  isModal: boolean;
  selectedItem: DepartemenEntity | undefined;
  handleCancel(): void;
}

export default function EditDepartemen(props: IEditDepartemen) {
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

  const { data: divisiPayload } = useGet<GetPayload<DivisiEntity>>({
    name: "divisis",
    endpoint: "divisis",
    page: 0,
  });

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<IEditDepartemen>({
    endpoint: `departemens/${props.selectedItem?.id}`,
    name: "departemens",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengedit Unit Kerja ",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  useEffect(() => {
    if(props.selectedItem){
      setValue('nama_departemen',props.selectedItem?.nama_departemen)
    }
    
  },[props.isModal])

  function handleEditDepartemen(data: any) {
    mutate({ ...data });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Unit Kerja",
        handleSubmit,
        submitCallback: handleEditDepartemen,
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
