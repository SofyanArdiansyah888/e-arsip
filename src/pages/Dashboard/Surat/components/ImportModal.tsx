import Button from "@/base-components/Button";
import Dropzone from "@/base-components/Dropzone";
import { DetailModal } from "@/components/Modals/Modals";
import { useExport } from "@/hooks/useApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";

interface IImportModal {
  isModal: boolean;
  handleCancel(): void;
}

export default function ImportModal(props: IImportModal) {
  const [user] = useLocalStorage("user");
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return (
    <DetailModal
      {...{
        ...props,
        title: "Upload Surat",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 bg-slate-50 px-4 py-8 rounded-md text-center text-xs ">
          Silahkan upload dengan contoh format file berikut,
          <Link to='/public/FORMAT_SURAT.xlsx'>
            <Button variant="outline-success" className="mt-2">
              Format Import Surat
            </Button>
          </Link>
        </div>

        <div className="col-span-12">
          <Dropzone
            options={{
              url: `${import.meta.env.VITE_BASE_URL}surats/import`,
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
                queryClient.invalidateQueries(["surats"]);
                dispatch(
                  setNotification({
                    message: "Berhasil Mengupdate Jatah Cuti Karyawan",
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
