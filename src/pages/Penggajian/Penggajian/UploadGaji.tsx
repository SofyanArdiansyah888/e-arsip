import Button from "@/base-components/Button";
import Dropzone from "@/base-components/Dropzone";
import { DetailModal } from "@/components/Modals/Modals";
import { useExport } from "@/hooks/useApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { useQueryClient } from "react-query";

interface IUploadGaji {
  isModal: boolean;
  handleCancel(): void;
}

export default function UploadGaji(props: IUploadGaji) {
  const [user] = useLocalStorage("user");
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const { mutate: doExport, isLoading: isLoadingExport } = useExport({
    name: "export-penggajian",
    endpoint: "penggajian/export",
    method:'POST',
    filename: `FORMAT_GAJI_KARYAWAN.xlsx`
  });
  
  return (
    <DetailModal
      {...{
        ...props,
        title: "Upload To Update Gaji Karyawan",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 bg-slate-50 px-4 py-8 rounded-md text-center text-xs ">
          Silahkan upload schedule dengan contoh format file berikut,
          <Button
            variant="outline-success"
            className="mt-2"
            onClick={() => doExport({})}
          >
            {isLoadingExport ? "Loading..." : "FORMAT_UPLOAD_GAJI.xlsx"}
          </Button>
        </div>

        <div className="col-span-12">
          <Dropzone
            options={{
              url: `${import.meta.env.VITE_BASE_URL}penggajian/import`,
              acceptedFiles:
                "text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              maxFilesize: 2,
              maxFiles: 1,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
              addRemoveLinks: true,
              success: (file) => {
                props.handleCancel();
                queryClient.invalidateQueries(['penggajian'])
                dispatch(
                  setNotification({
                    message: "Berhasil Mengupdate Gaji Karyawan",
                    status: "success",
                  })
                );
              },
              removedfile: (file) => {
                file.previewElement.remove();
              },
            }}
            className="dropzone"
          >
            <div className="text-md font-medium">Upload File</div>
            <div className="text-gray-600">Maximal 2 Mb</div>
          </Dropzone>
        </div>
      </div>
    </DetailModal>
  );
}
