import { FormInput, FormLabel, FormSelect } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost, usePut } from "@/hooks/useApi";
import { RiwayatPenggajianEntity } from "@/models/RiwayatPenggajian.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { formatRupiah, sanitizeNumber } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface ITambahTunjangan {
  isModal: boolean;
  handleCancel(): void;
  riwayatPenggajian: RiwayatPenggajianEntity | undefined;
}

const schema = yup
  .object({
    nama_tunjangan: yup.string().required(),
    nominal: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function TambahTunjangan({
  isModal,
  handleCancel,
  riwayatPenggajian,
}: ITambahTunjangan) {
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
          message: "Berhasil Menambahkan Tunjangan",
          status: "success",
        })
      );
      handleCancel();
      reset();
    },
  });

  function handleTambahTunjangan({ nama_tunjangan, nominal }: FormData) {
    if (riwayatPenggajian) {
      const { detail_tunjangan, ...props } = riwayatPenggajian;
      const result = [
        ...detail_tunjangan,
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
        title: "Tunjangan Tambahan",
        handleSubmit,
        submitCallback: handleTambahTunjangan,
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
