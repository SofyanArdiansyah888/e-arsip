import {
  FormInput,
  FormLabel
} from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePut } from "@/hooks/useApi";
import { TunjanganEntity } from "@/models/Tunjangan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { formatRupiah, sanitizeNumber } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IEditTunjangan {
  isModal: boolean;
  selectedItem: TunjanganEntity | undefined;
  handleCancel(): void;
}
const schema = yup
  .object({
    nama_tunjangan: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreateTunjangan(props: IEditTunjangan) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    unregister,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const { selectedItem } = props;
    if (props.selectedItem) {
      setValue("nama_tunjangan", selectedItem!.nama_tunjangan);
    }
  }, [props.isModal]);

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<FormData & {nominal_bawaan: number}>({
    endpoint: `tunjangans/${props.selectedItem?.id}`,
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

  function handleUpdateTunjangan(data: FormData) {
    mutate({
      ...data,
      nominal_bawaan: 0,
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Tunjangan",
        handleSubmit,
        submitCallback: handleUpdateTunjangan,
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
