import { FormInput, FormLabel, FormSelect } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost, usePut } from "@/hooks/useApi";
import { PotonganEntity } from "@/models/Potongan.entity";
import { RiwayatPenggajianEntity } from "@/models/RiwayatPenggajian.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { formatRupiah, sanitizeNumber } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface IEditPotongan {
  isModal: boolean;
  handleCancel(): void;
  selectedPotongan: PotonganEntity | undefined;
  riwayatPenggajian: RiwayatPenggajianEntity | undefined;
}

const schema = yup
  .object({
    nama_potongan: yup.string().required(),
    nominal: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function EditPotongan({
  isModal,
  handleCancel,
  riwayatPenggajian,
  selectedPotongan,
}: IEditPotongan) {
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
          message: "Berhasil Mengedit Potongan",
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
        "nama_potongan",
        selectedPotongan?.nama_potongan ? selectedPotongan.nama_potongan : ""
      );
      setValue("nominal", formatRupiah(selectedPotongan?.nominal));
    } else {
      reset();
    }
  }, [isModal]);

  function handleEditPotongan({ nama_potongan, nominal }: FormData) {
    if (riwayatPenggajian) {
      const { detail_potongan, ...props } = riwayatPenggajian;
      const potongans = detail_potongan.filter(
        (potong) => potong.nama_potongan !== selectedPotongan?.nama_potongan
      );

      const result = [
        ...potongans,
        { nama_potongan, nominal: sanitizeNumber(nominal).toString() },
      ];
      mutate({
        ...props,
        detail_potongan: [...result],
      });
    }
  }

  return (
    <BaseModal
      {...{
        ...{ isModal, handleCancel },
        title: "Edit Potongan Tambahan",
        handleSubmit,
        submitCallback: handleEditPotongan,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_potongan">Nama Potongan</FormLabel>
          <FormInput type="text" {...register("nama_potongan")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.nama_potongan?.message}
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
