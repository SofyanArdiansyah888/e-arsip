import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "../../base-components/Button";
import { FormInput, FormLabel, FormTextarea } from "../../base-components/Form";
import Dialog from "../../base-components/Headless/Dialog";
import Lucide from "../../base-components/Lucide";
import { BackButton, SimpanButton } from "../../components/Buttons/Buttons";
import { BaseModal } from "../../components/Modals/Modals";
import * as yup from "yup";
import { useGet, usePost, usePut } from "../../hooks/useApi";
import { DivisiEntity } from "../../models/Divisi.entity";
import { GetPayload } from "../../models/GenericPayload";
import { setNotification } from "../../stores/apps/notificationSlice";
import { useAppDispatch } from "../../stores/hooks";
import { PengaturanEntity } from "../../models/Pengaturan.entity";
import TomSelect from "../../base-components/TomSelect";
import { useEffect } from "react";

const schema = yup
  .object({
    nilai: yup.number().required(),
    nama_pengaturan: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface IEditPengaturan {
  isModal: boolean;
  selectedItem: PengaturanEntity | undefined;
  handleCancel(): void;
}

export default function EditPengaturan(props: IEditPengaturan) {
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

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<{nilai:number}>({
    endpoint: `pengaturans/${props.selectedItem?.id}`,
    name: "pengaturans",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengedit Pengaturan",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  useEffect(() => {
    if (props.selectedItem) {
      setValue("nilai", props.selectedItem?.nilai);
      setValue("nama_pengaturan", props.selectedItem?.nama_pengaturan);
    }
  }, [props.isModal]);

  function handleEditPengaturan({nilai}: FormData) {
    mutate({ nilai });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Pengaturan",
        handleSubmit,
        submitCallback: handleEditPengaturan,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nilai">Pengaturan</FormLabel>
          <FormInput type="text" {...register("nama_pengaturan")} disabled />
          
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="nilai">Nilai</FormLabel>
          <FormInput type="text" {...register("nilai")} />
          <div className="text-danger font-semibold text-sm mt-2">
            {errors.nilai?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
