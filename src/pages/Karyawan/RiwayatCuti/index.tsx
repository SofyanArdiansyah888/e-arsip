import { FormInput, FormSelect } from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import Lucide from "@/base-components/Lucide";
import Table from "@/base-components/Table";
import {
  AddButton,
  BackButton,
  DeleteTableButton,
  EditTableButton,
} from "@/components/Buttons/Buttons";
import { DeleteModal } from "@/components/Modals/Modals";
import { useDelete, useGet, usePost } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { RiwayatIzinEntity } from "@/models/RiwayatIzin.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { formatCurrency, formatDate } from "@/utils/helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateCuti } from "./CreateCuti";
import { EditCuti } from "./EditCuti";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";

function RiwayatIzin() {
  const navigate = useNavigate();
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const [selectedItem, setSelectedItem] = useState<RiwayatIzinEntity>();
  const [date, setDate] = useState<string>();

  const {
    data: payload,
    refetch,
    isFetching,
  } = useGet<GetPayload<RiwayatIzinEntity>>({
    name: "riwayat-cutis",
    endpoint: `riwayat-izins`,
    page,
    limit: 10,
    filter: {
      date,
      berlangsung: true,
      jenis_izin: "cuti",
    },
  });

  const dispatch = useAppDispatch();

  const { mutate } = useDelete({
    name: "riwayat-cutis",
    endpoint: `riwayat-izins/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Riwayat Izin",
          status: "success",
        })
      );
      setDeleteModal(false);
    },
  });

  const filteredPayload = () => {
    return payload?.data.filter((item) => {
      return item.karyawan.nama_lengkap
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    });
  };

  useEffect(() => {
    refetch()
  },[date])

  const { mutate: updateStatus, isLoading: isUpdateStatusLoading } = usePost<{
    status: string;
    id: string;
  }>({
    name: "riwayat-cutis",
    endpoint: `riwayat-izins/update-status`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Mengupdate Status",
          status: "success",
        })
      );
    },
  });

  function handleConfirmDelete() {
    mutate({});
  }

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">List Cuti Karyawan</h2>
        <div className=" flex gap-2 ml-auto">
          <BackButton onClick={() => navigate(-1)} />

          <AddButton
            title="Cuti Karyawan"
            onClick={() => setCreateModal(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* HEADER */}
        <div className="flex flex-wrap justify-between  col-span-12 mt-2 intro-y sm:flex-nowrap">
          <div className="intro-y block sm:flex items-center h-10">
            <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
              <Lucide
                icon="Calendar"
                className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
              />
              <Litepicker
                value={date}
                onChange={(value) => setDate(value)}
                options={{
                  autoApply: false,
                  singleMode: true,
                  numberOfColumns: 0,
                  numberOfMonths: 1,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="form-control sm:w-56 box pl-10 cursor-pointer"
              />
            </div>
          </div>

          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-full mt-3 mr-auto sm:w-auto sm:mt-0">
              <Lucide
                icon="Search"
                className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
              />
              <FormInput
                type="text"
                className="w-full px-10 sm:w-64 !box"
                placeholder="Cari..."
                onChange={(e) => setSearch(e.target.value)}
              />

              <Lucide
                icon="X"
                className="absolute inset-y-0 right-2 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
                onClick={() => setSearch('')}
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
        {isFetching ? <SkeletonTable /> : <RiwayatIzinsiTable
            payload={filteredPayload()}
            handleEdit={(cuti: RiwayatIzinEntity) => {
              setEditModal(true);
              setSelectedItem(cuti);
            }}
            handleDelete={(cuti: RiwayatIzinEntity) => {
              setDeleteModal(true);
              setSelectedItem(cuti);
            }}
            handleUpdateStatus={({ id }, status) => {
              updateStatus({ status, id });
            }}
            isUpdateStatusLoading={isUpdateStatusLoading}
          />}
        </div>
        {/* END: Data List */}

        <DeleteModal
          isModal={deleteModal}
          handleCancel={() => setDeleteModal(false)}
          handleConfirm={handleConfirmDelete}
          title={`Riwayat Cuti Karyawan ${selectedItem?.karyawan.nama_lengkap}`}
        />
        <EditCuti
          isModal={editModal}
          handleCancel={() => setEditModal(false)}
          selectedItem={selectedItem}
        />
        <CreateCuti
          isModal={createModal}
          handleCancel={() => setCreateModal(false)}
        />
      </div>
    </>
  );
}

interface IRiwayatIzinTable {
  payload: RiwayatIzinEntity[] | undefined;
  handleEdit(cuti: RiwayatIzinEntity): void;
  handleDelete(cuti: RiwayatIzinEntity): void;
  handleUpdateStatus(izin: RiwayatIzinEntity, status: string): void;
  isUpdateStatusLoading: boolean;
}

function RiwayatIzinsiTable({
  payload,
  handleEdit,
  handleDelete,
  handleUpdateStatus,
  isUpdateStatusLoading,
}: IRiwayatIzinTable) {
  return (
    <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <Table sm>
        <Table.Thead variant="dark">
          <Table.Tr className="text-center">
            <Table.Th>No</Table.Th>
            <Table.Th>Karyawan</Table.Th>
            <Table.Th>Tanggal Cuti</Table.Th>
            <Table.Th>Jumlah Hari</Table.Th>
            <Table.Th>Alasan</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th className="text-center border-b-0 whitespace-nowrap">
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {payload?.length === 0 && (
            <Table.Tr className="intro-x bg-white text-center">
              <Table.Td colSpan={99}>No Data Found...</Table.Td>
            </Table.Tr>
          )}
          {payload?.map((riwayat, index) => (
            <Table.Tr key={index} className="intro-x bg-white text-xs">
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td className="capitalize">
                <div className="font-semibold">
                  {riwayat.karyawan.nama_lengkap}
                </div>
                <div className="text-slate-600 text-xs">
                  {riwayat.karyawan.jabatan?.nama_jabatan}
                </div>
              </Table.Td>
              <Table.Td className="capitalize">
                {formatDate(riwayat.tanggal_mulai, "DD MMMM YYYY")} -{" "}
                {formatDate(riwayat.tanggal_selesai, "DD MMMM YYYY")}
              </Table.Td>
              <Table.Td className="capitalize">{riwayat.jumlah_hari}</Table.Td>
              <Table.Td className="capitalize">{riwayat.keterangan}</Table.Td>

              <Table.Td className="capitalize  ">
                <FormSelect
                  onChange={(e) => handleUpdateStatus(riwayat, e.target.value)}
                  value={riwayat.status}
                  disabled={isUpdateStatusLoading}
                >
                  <option value="pengajuan">Pengajuan</option>
                  <option value="disetujui atasan">Disetujui Atasan</option>
                  <option value="disetujui hrd">Disetujui HRD</option>
                  <option value="disetujui">Disetujui</option>
                </FormSelect>
                {/* <div className="px-2 py-1 bg-slate-600 rounded-full text-center text-white">{riwayat.status}</div> */}
              </Table.Td>

              <Table.Td>
                <div className="flex flex-row items-center justify-center">
                  <EditTableButton onClick={() => handleEdit(riwayat)} />
                  <DeleteTableButton onClick={() => handleDelete(riwayat)} />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

export default RiwayatIzin;
