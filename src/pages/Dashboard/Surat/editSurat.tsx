import Dropzone from "@/base-components/Dropzone";
import { FormInput, FormLabel, FormTextarea } from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import { BaseModal } from "@/components/Modals/Modals";
import { usePut } from "@/hooks/useApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import SuratEntity from "@/models/Surat.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootState } from "@/stores/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

interface IEditSurat {
  isModal: boolean;
  handleCancel(): void;
  selectedItem: SuratEntity | undefined;
}

const schema = yup
  .object({
    nomor_surat: yup.string().required(),
    tanggal_masuk: yup.string().required(),
    perihal: yup.string().required(),
    posisi_surat: yup.string().required(),
    ditujukan: yup.string().required(),
    dari: yup.string().required(),
    disposisi: yup.string().notRequired(),
    diteruskan_kepada: yup.string().notRequired(),
    catatan: yup.string().notRequired(),
    jenis_surat: yup.string().required(),
    nomor_agenda: yup.string().required()
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function EditSurat(props: IEditSurat) {

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

  useEffect(() => {
    const { selectedItem } = props;
    if (selectedItem) {
      setValue("nomor_surat", selectedItem.nomor_surat);
      setValue("tanggal_masuk", selectedItem?.tanggal_masuk);
      setValue("posisi_surat", selectedItem?.posisi_surat);
      setValue("catatan", selectedItem?.catatan);
      setValue("dari", selectedItem?.dari);
      setValue("disposisi", selectedItem?.disposisi);
      setValue("diteruskan_kepada", selectedItem?.diteruskan_kepada);
      setValue("ditujukan", selectedItem?.ditujukan);
      setValue("perihal", selectedItem?.perihal);
      setValue("jenis_surat", selectedItem?.jenis_surat);
      setValue("nomor_agenda", selectedItem?.nomor_agenda);
    }
  }, [props.isModal]);

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<FormData>({
    endpoint: `surats/${props.selectedItem?.id}`,
    name: "surats",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Surat",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleUpdateSurat(data: FormData) {
    
      mutate({
        ...data,
      });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Surat",
        handleSubmit,
        submitCallback: handleUpdateSurat,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4 max-h-[450px] overflow-y-auto">
      <div className="col-span-6">
          <FormLabel htmlFor="tanggal_masuk">Tanggal Masuk</FormLabel>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Litepicker
                value={value}
                onChange={onChange}
                options={{
                  autoApply: false,
                  singleMode: true,
                  numberOfColumns: 1,
                  numberOfMonths: 1,
                  showWeekNumbers: true,
                  format: "YYYY-MM-DD",
                  dropdowns: {
                    minYear: 2023,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="block  mx-auto"
              />
            )}
            name="tanggal_masuk"
            control={control}
          />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.tanggal_masuk?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="nomor_surat">
            Nomor Surat <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("nomor_surat")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.nomor_surat?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="nomor_agenda">
            Nomor Agenda <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("nomor_agenda")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.nomor_agenda?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="perihal">
            Perihal <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("perihal")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.perihal?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="posisi_surat">
            Posisi Surat <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("posisi_surat")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.posisi_surat?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="ditujukan">
            Ditujukan <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("ditujukan")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.ditujukan?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="dari">
            Dari <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("dari")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.dari?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="disposisi">Disposisi</FormLabel>
          <FormInput type="text" {...register("disposisi")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.disposisi?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="diteruskan_kepada">
            Diteruskan Kepada <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("diteruskan_kepada")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.diteruskan_kepada?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="jenis_surat">
            Jenis Surat <small className="text-danger">*</small>
          </FormLabel>
          <select {...register("jenis_surat")} className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2 shadow-sm">
            <option value="surat mutasi">Surat Mutasi</option>
            <option value="proposal dana">Proposal Dana</option>
            <option value="surat umum">Surat Umum</option>
          </select>
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.jenis_surat?.message}
          </div>
        </div>

        <div className="col-span-6">
          <FormLabel htmlFor="catatan">Catatan</FormLabel>
          <FormTextarea {...register("catatan")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.catatan?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
