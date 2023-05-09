import { FormInput, FormLabel } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePut } from "@/hooks/useApi";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { formatRupiah, sanitizeNumber } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IEditPenggajian {
  isModal: boolean;
  selectedItem: KaryawanEntity | undefined;
  handleCancel(): void;
}

const schema = yup
  .object({
    nama_lengkap: yup.string().required(),
    gaji_pokok: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function EditPenggajian(props: IEditPenggajian) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<FormData>({
    endpoint: `karyawans/${props.selectedItem?.id}/update-gaji`,
    name: "penggajian",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Gaji Pokok",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  useEffect(() => {
    const { selectedItem } = props;
    if (selectedItem) {
      setValue("nama_lengkap", selectedItem.nama_lengkap);
      setValue("gaji_pokok", formatRupiah(selectedItem.gaji_pokok));
      
    }
  }, [props.isModal]);

  function handleUpdateGajiPokok(data: FormData) {
    mutate({
      ...data,
      gaji_pokok: sanitizeNumber(data.gaji_pokok).toString()
    });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Update Gaji Pokok",
        handleSubmit,
        submitCallback: handleUpdateGajiPokok,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_lengkap">Nama Karyawan</FormLabel>
          <FormInput type="text" {...register("nama_lengkap")} disabled />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_lengkap?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="gaji_pokok">Gaji Pokok</FormLabel>
          <FormInput
            type="text"
            {...register("gaji_pokok")}
            onChange={(e) =>
              setValue("gaji_pokok", formatRupiah(e.target.value))
            }
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.gaji_pokok?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
