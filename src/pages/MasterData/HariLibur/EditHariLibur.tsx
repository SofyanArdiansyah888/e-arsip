import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { FormLabel, FormTextarea } from "../../../base-components/Form";
import Litepicker from "../../../base-components/Litepicker";
import { BaseModal } from "../../../components/Modals/Modals";
import { usePost, usePut } from "../../../hooks/useApi";
import { JadwalLiburEntity } from "../../../models/JadwalLibur.entity";
import { setNotification } from "../../../stores/apps/notificationSlice";
import { useAppDispatch } from "../../../stores/hooks";
import { formatDate } from "../../../utils/helper";

interface IEditHariLibur {
  isModal: boolean;
  handleCancel(): void;
  selectedItem: JadwalLiburEntity | undefined;
}

const schema = yup
  .object({
    deskripsi: yup.string().required(),
    tanggal_libur: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export function EditHariLibur(props: IEditHariLibur) {
  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<{
    deskripsi: string;
    mulai: string;
    selesai: string;
  }>({
    endpoint: `jadwal-liburs/${props.selectedItem?.id}`,
    name: "hari-liburs",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Hari Libur Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

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

  useEffect(() => {
    const { selectedItem } = props;
    if (selectedItem) {
      setValue("deskripsi", selectedItem.deskripsi);
      setValue(
        "tanggal_libur",
        `${formatDate(selectedItem.mulai)}-${formatDate(selectedItem.selesai)}`
      );
    }
  }, [props.isModal, props.selectedItem]);

  const newProps = {
    ...props,
    title: "Edit Hari Libur",
    handleSubmit,
    isLoading,
    submitCallback: ({ deskripsi, tanggal_libur }: FormData) => {
      let temp = tanggal_libur.split("-");
      mutate({
        deskripsi,
        mulai: temp[0],
        selesai: temp[1],
      });
    },
  };

  return (
    <BaseModal {...newProps}>
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="tanggal_libur">
            Tanggal Mulai - Tanggal Selesai
          </FormLabel>

          <Controller
            render={({ field: { onChange, value } }) => (
              <Litepicker
                value={value}
                onChange={onChange}
                options={{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="block  mx-auto"
              />
            )}
            name="tanggal_libur"
            control={control}
            defaultValue={`${props.selectedItem?.mulai}-${props.selectedItem?.selesai}`}
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tanggal_libur?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="deskripsi">Keterangan</FormLabel>
          <FormTextarea {...register("deskripsi")} />
          <div className="text-danger font-semibold text-sm mt-2">
            {errors.deskripsi?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
