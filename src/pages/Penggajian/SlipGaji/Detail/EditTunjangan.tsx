import { FormInput, FormLabel, FormSelect } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost, usePut } from "@/hooks/useApi";
import { TunjanganEntity } from "@/models/Tunjangan.entity";
import { RiwayatPenggajianEntity } from "@/models/RiwayatPenggajian.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { formatRupiah, sanitizeNumber } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface IEditTunjangan {
  isModal: boolean;
  handleCancel(): void;
  selectedTunjangan: TunjanganEntity | undefined;
  riwayatPenggajian: RiwayatPenggajianEntity | undefined;
}

const schema = yup
  .object({
    nama_tunjangan: yup.string().required(),
    nominal: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function EditTunjangan({
  isModal,
  handleCancel,
  riwayatPenggajian,
  selectedTunjangan,
}: IEditTunjangan) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<RiwayatPenggajianEntity>({
    endpoint: `riwayat-penggajians/${riwayatPenggajian?.id}`,
    name: "slip-gaji-detail",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengedit Tunjangan",
          status: "success",
        })
      );
      handleCancel();
      reset();
    },
  });

  useEffect(() => {
    if (isModal) {
      setValue(
        "nama_tunjangan",
        selectedTunjangan?.nama_tunjangan ? selectedTunjangan.nama_tunjangan : ""
      );
      setValue("nominal", formatRupiah(selectedTunjangan?.nominal));
    } else {
      reset();
    }
  }, [isModal]);

  function handleEditTunjangan({ nama_tunjangan, nominal }: FormData) {
    if (riwayatPenggajian) {
      const { detail_tunjangan, ...props } = riwayatPenggajian;
      const tunjangans = detail_tunjangan.filter(
        (tunjang) => tunjang.nama_tunjangan !== selectedTunjangan?.nama_tunjangan
      );

      const result = [
        ...tunjangans,
        { nama_tunjangan, nominal: sanitizeNumber(nominal).toString() },
      ];
      mutate({
        ...props,
        detail_tunjangan: [...result],
      });
    }
  }

  return (
    <BaseModal
      {...{
        ...{ isModal, handleCancel },
        title: "Edit Tunjangan Tambahan",
        handleSubmit,
        submitCallback: handleEditTunjangan,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_tunjangan">Nama Tunjangan</FormLabel>
          <FormInput type="text" {...register("nama_tunjangan")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_tunjangan?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="nominal">Nominal</FormLabel>
          <FormInput
            type="text"
            {...register("nominal")}
            onChange={(e) => setValue("nominal", formatRupiah(e.target.value))}
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nominal?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
