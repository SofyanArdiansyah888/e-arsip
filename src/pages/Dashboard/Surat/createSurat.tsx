import { FormInput, FormLabel, FormTextarea } from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost } from "@/hooks/useApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface ICreateSurat {
  isModal: boolean;
  handleCancel(): void;
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
const MAX_FILE_SIZE = 10 * 1024 * 1024;
export default function CreateSurat(props: ICreateSurat) {
  const [user] = useLocalStorage("user");
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    setError,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();


  const { mutate, isLoading } = usePost({
    endpoint: "surats",
    name: "surats",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menambahkan Surat Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreateSurat(data: FormData) {
    mutate({
      ...data,
    });
  }

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];

  //   if (file) {
  //     if (file.size > MAX_FILE_SIZE) {
  //       setError("file", {
  //         message: "File size exceeds maximum limit of 10 MB",
  //       });
  //       return;
  //     }
  //     const fileTypes = file.type.split("/");
  //     setValue("file_type", fileTypes[1]);
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const base64 = reader.result
  //         ?.toString()
  //         .replace(/^data:.+;base64,/, "");
  //       if (base64) {
  //         setValue("file", base64);
  //       }
  //     };
  //   }
  // };

  return (
    <BaseModal
      {...{
        ...props,
        title: "Tambah Surat",
        handleSubmit,
        submitCallback: handleCreateSurat,
        control,
        isLoading,
        size: "xl",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
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
            <option value="bantuan dana">Bantuan Dana</option>
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

        {/* <div className="col-span-12">
          <FormLabel htmlFor="link_file">
            File <small className="text-danger">*</small>
          </FormLabel>
          <Dropzone
            options={{
              url: `${import.meta.env.VITE_BASE_URL}upload-surat`,
              // acceptedFiles: "Application/*",
              // maxFilesize: 2,
              maxFiles: 1,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
              addRemoveLinks: true,
              success: (file) => {
                setValue("link_file", file.xhr?.response.replace(/^"|"$/g, ''));
              },
              removedfile: (file) => {
                file.previewElement.remove();
                setValue("link_file", "");
              },
            }}
            className="dropzone"
          >
            <div className="text-md font-medium">Disposisi Surat</div>
          </Dropzone>
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.link_file?.message ? errors.link_file.message.toString() : ""}
          </div>
        </div> */}
      </div>
    </BaseModal>
  );
}
