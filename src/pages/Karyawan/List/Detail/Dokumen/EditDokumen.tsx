import Dropzone from "@/base-components/Dropzone";
import { FormInput, FormLabel } from "@/base-components/Form";
import { BaseModal } from "@/components/Modals/Modals";
import { usePut } from "@/hooks/useApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DokumenKaryawanEntity } from "@/models/DokumenKaryawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootState } from "@/stores/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

interface IEditKeluarga {
  isModal: boolean;
  handleCancel(): void;
  selectedItem: DokumenKaryawanEntity | undefined;
}

const schema = yup
  .object({
    nama_dokumen: yup.string().required(),
    link_file: yup.string().notRequired(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function EditDokumen(props: IEditKeluarga) {
  const [user] = useLocalStorage('user')
  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );
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
    if (props.selectedItem) {
      setValue("nama_dokumen", selectedItem!.nama_dokumen);
    }
  }, [props.isModal]);

  const dispatch = useAppDispatch();

  const { mutate, isLoading } = usePut<FormData & { karyawan_id: number }>({
    endpoint: `dokumen-karyawans/${props.selectedItem?.id}`,
    name: "dokumen-karyawans",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Dokumen",
          status: "success",
        })
      );
      props.handleCancel();
      reset();
    },
  });

  function handleUpdateKeluarga(data: FormData) {
    if (selectedKaryawan)
      mutate({
        ...data,
        karyawan_id: selectedKaryawan?.id,
      });
  }

  return (
    <BaseModal
      {...{
        ...props,
        title: "Edit Keluarga",
        handleSubmit,
        submitCallback: handleUpdateKeluarga,
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
            {errors.nama_dokumen?.message}
          </div>
        </div>

        <div className="col-span-12">
          <FormLabel htmlFor="link_file">
            Nama File <small className="text-danger">*</small>
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
            {errors.link_file?.message}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
