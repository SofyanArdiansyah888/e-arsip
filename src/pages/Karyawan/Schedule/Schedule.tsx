import Button from "@/base-components/Button";
import Lucide from "@/base-components/Lucide";
import Table from "@/base-components/Table";
import {
  AddButton,
  BackButton,
  DeleteTableButton,
  EditTableButton,
} from "@/components/Buttons/Buttons";
import { DeleteModal } from "@/components/Modals/Modals";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import { useDelete, useGet } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { ScheduleKaryawanEntity as ScheduleEntity } from "@/models/ScheduleKaryawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ImportSchedule from "./ImportSchedule";
import EditSchedule from "./EditSchedule";
import { formatDate } from "@/utils/helper";
import CreateSchedule from "./CreateSchedule";
import { Link } from "react-router-dom";
import Litepicker from "@/base-components/Litepicker";

export default function Schedule() {
  const [importModal, setImportModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [meta, setMeta] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<ScheduleEntity>();
  const [page, setPage] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);

  const {
    data: payload,
    refetch,
    isLoading,
  } = useGet<GetPayload<ScheduleEntity>>({
    name: "schedules",
    endpoint: `schedules`,
    page: page + 1,
    limit,
    filter: {
      date,
    },
  });

  const dispatch = useAppDispatch();

  const { mutate } = useDelete({
    name: "schedules",
    endpoint: `schedules/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Schedule",
          status: "success",
        })
      );
      setDeleteModal(false);
    },
  });

  useEffect(() => {
    if (payload) {
      setMeta(payload.meta);
    }
  }, [payload]);

  useEffect(() => {
    refetch();
  }, [date]);

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">List Schedule</h2>
        <div className=" flex gap-2 ml-auto">
          <Link to="/karyawan/absen">
            <BackButton />
          </Link>
          <Button
            variant="facebook"
            size="sm"
            onClick={() => setImportModal(true)}
          >
            <Lucide icon="Table" className="mr-2" />
            Import Schedule
          </Button>

          <AddButton title="Tambah" onClick={() => setCreateModal(true)} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap justify-end  col-span-12 mt-2 sm:flex-nowrap">
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
                  // format: "MMMM YYYY",
                  lang: "id-ID",
                  dropdowns: {
                    minYear: new Date().getFullYear() - 5,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="form-control sm:w-56 box pl-10 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {!isLoading ? (
          <ScheduleTable
            handleEdit={(izin: ScheduleEntity) => {
              setEditModal(true);
              setSelectedItem(izin);
            }}
            handleDelete={(izin: ScheduleEntity) => {
              setDeleteModal(true);
              setSelectedItem(izin);
            }}
            payload={payload}
          />
        ) : (
          <SkeletonTable />
        )}

        <div className="col-span-12 flex justify-center">
          <ReactPaginate
            nextLabel="next"
            onPageChange={(data) => setPage(data.selected)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={meta?.last_page}
            previousLabel="prev"
            pageClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="capitalize px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
            nextClassName="capitalize px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
            breakLabel="..."
            breakClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            containerClassName="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap "
            activeClassName="px-3 py-2 text-slate-100 border border-gray-300 bg-slate-700 hover:bg-slate-600 "
            renderOnZeroPageCount={undefined}
          />
        </div>
      </div>
      <ImportSchedule
        isModal={importModal}
        handleCancel={() => {
          setImportModal(false);
        }}
      />
      <DeleteModal
        isModal={deleteModal}
        handleConfirm={() => mutate({})}
        handleCancel={() => setDeleteModal(false)}
        title={selectedItem?.karyawan.nama_lengkap}
      />
      <CreateSchedule
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />

      <EditSchedule
        isModal={editModal}
        selectedItem={selectedItem}
        handleCancel={() => setEditModal(false)}
      />
    </>
  );
}

interface IScheduleTable {
  payload: GetPayload<ScheduleEntity> | undefined;
  handleEdit(izin: ScheduleEntity): void;
  handleDelete(izin: ScheduleEntity): void;
}

function ScheduleTable({ payload, handleEdit, handleDelete }: IScheduleTable) {
  return (
    <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <Table sm>
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th>No</Table.Th>
            <Table.Th>Nama Karyawan</Table.Th>
            <Table.Th>Tanggal</Table.Th>
            <Table.Th>Hari</Table.Th>
            <Table.Th>Masuk</Table.Th>
            <Table.Th>Pulang</Table.Th>
            <Table.Th>Toleransi</Table.Th>
            <Table.Th>Periode Istirahat</Table.Th>
            <Table.Th className="text-center border-b-0 whitespace-nowrap">
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {payload?.data.length === 0 && (
            <Table.Tr className="intro-x bg-white text-center">
              <Table.Td colSpan={99}>No Data Found...</Table.Td>
            </Table.Tr>
          )}
          {payload?.data.map((izin, index) => (
            <Table.Tr key={index} className="intro-x bg-white">
              <Table.Td>
                {payload.meta.per_page * (payload.meta.current_page - 1) +
                  (index + 1)}
              </Table.Td>
              <Table.Td className="capitalize">
                {izin?.karyawan?.nama_lengkap}
              </Table.Td>
              <Table.Td className="capitalize">
                {formatDate(izin.tanggal, "DD MMM YYYY")}
              </Table.Td>
              <Table.Td className="capitalize">{izin.hari}</Table.Td>
              <Table.Td className="capitalize">{izin.masuk}</Table.Td>
              <Table.Td className="capitalize">{izin.keluar}</Table.Td>
              <Table.Td className="capitalize">{izin.toleransi} Menit</Table.Td>
              <Table.Td className="capitalize">
                {izin.periode_istirahat} Menit
              </Table.Td>
              <Table.Td>
                <div className="flex flex-row items-center justify-center">
                  <EditTableButton onClick={() => handleEdit(izin)} />
                  <DeleteTableButton onClick={() => handleDelete(izin)} />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
