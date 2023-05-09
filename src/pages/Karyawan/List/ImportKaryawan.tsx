import Button from "@/base-components/Button";
import Dropzone from "@/base-components/Dropzone";
import { DetailModal } from "@/components/Modals/Modals";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQueryClient } from "react-query";

interface IUploadSchedule {
  isModal: boolean;
  handleCancel(): void;
}

export default function ImportKaryawan(props: IUploadSchedule) {
  const queryClient = useQueryClient();
  const [user] = useLocalStorage('user')
  return (
    <DetailModal
      {...{
        ...props,
        title: "Upload Data Karyawan",
      }}
    >
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 bg-slate-50 px-4 py-8 rounded-md text-center text-xs ">
          Silahkan upload data karyawan dengan contoh format file berikut,
          <a href="/public/FORMAT_DATA_KARYAWAN.xlsx" >
            <Button variant="outline-success" className="mt-2">FORMAT_DATA_KARYAWAN.xlsx</Button>
          </a>
        </div>

        <div className="col-span-12">
          <Dropzone
            options={{
              url: `${import.meta.env.VITE_BASE_URL}karyawans/import`,
              acceptedFiles:
                "text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              maxFilesize: 2,
              maxFiles: 1,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
              addRemoveLinks: true,
              success: (file) => {
                queryClient.invalidateQueries(['karyawans'])
                props.handleCancel();
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
