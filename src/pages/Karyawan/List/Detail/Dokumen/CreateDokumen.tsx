import Dropzone from "@/base-components/Dropzone";
import { FormInput, FormLabel } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePost } from "@/hooks/useApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootState } from "@/stores/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

interface ICreateDokumen {
  isModal: boolean;
  handleCancel(): void;
}

const schema = yup
  .object({
    nama_dokumen: yup.string().required(),
    link_file: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
export default function CreateDokumen(props: ICreateDokumen) {
  const [user] = useLocalStorage('user')
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
  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );

  const { mutate, isLoading } = usePost({
    endpoint: "dokumen-karyawans",
    name: "dokumen-karyawans",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menambahkan Dokumen Baru",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleCreateDokumen(data: FormData) {
    mutate({
      ...data,
      karyawan_id: selectedKaryawan?.id
    })
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
        title: "Tambahan Dokumen",
        handleSubmit,
        submitCallback: handleCreateDokumen,
        control,
        isLoading,
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12">
          <FormLabel htmlFor="nama_dokumen">
            Nama Dokumen <small className="text-danger">*</small>
          </FormLabel>
          <FormInput type="text" {...register("nama_dokumen")} />
          <div className="text-danger font-semibold text-xs mt-2">
            {errors?.nama_dokumen?.message}
            {/* {errors.nama_dokumen?.message} */}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="link_file">
            File <small className="text-danger">*</small>
          </FormLabel>
          <Dropzone
            options={{
              url: `${import.meta.env.VITE_BASE_URL}upload-dokumen`,
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
            <div className="text-md font-medium">Upload Dokumen</div>
            {/* <div className="text-gray-600">Maximal 2 Mb</div> */}
          </Dropzone>
          <div className="text-danger font-semibold text-xs mt-2">
            {errors.link_file?.message ? errors.link_file.message.toString() : ""}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
