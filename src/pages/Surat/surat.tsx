import Lucide from "@/base-components/Lucide";
import {
  AddButton,
  DeleteTableButton,
  EditTableButton,
} from "@/components/Buttons/Buttons";
import { DeleteModal } from "@/components/Modals/Modals";
import { useDelete, useGet } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import SuratEntity from "@/models/Surat.entity";
import { useEffect, useState } from "react";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import ReactPaginate from "react-paginate";
import CreateSurat from "./createSurat";
import EditSurat from "./editSurat";
import dayjs from "dayjs";
import Table from "@/base-components/Table";

export default function Surat() {
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [meta, setMeta] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<SuratEntity>();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<string>("");

  const {
    data: payload,
    refetch,
    isLoading,
  } = useGet<GetPayload<SuratEntity>>({
    name: "surats",
    endpoint: `surats`,
    page: page + 1,
    limit,
    search,
  });

  const dispatch = useAppDispatch();

  const { mutate } = useDelete({
    name: "surats",
    endpoint: `surats/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Surat",
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
    const delayDebounceFn = setTimeout(() => {
      setPage(0);
      setLimit(0);
      refetch();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">List Surat</h2>
        <div className=" flex gap-2 ml-auto">
          <AddButton title="Tambah" onClick={() => setCreateModal(true)} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap justify-end  col-span-12 mt-2 sm:flex-nowrap">
          <div className="relative w-full mt-3 ml-auto sm:w-auto sm:mt-0">
            <Lucide
              icon="Search"
              className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
            />
            <input
              type="text"
              className="w-full px-10 sm:w-64 !box"
              placeholder="Cari..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Lucide
              icon="X"
              className="absolute inset-y-0 right-2 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
              onClick={() => setSearch("")}
            />
          </div>
        </div>

        {!isLoading ? (
          <SuratTable
            handleEdit={(Surat: SuratEntity) => {
              setEditModal(true);
              setSelectedItem(Surat);
            }}
            handleDelete={(Surat: SuratEntity) => {
              setDeleteModal(true);
              setSelectedItem(Surat);
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
            initialPage={page}
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
      <DeleteModal
        isModal={deleteModal}
        handleConfirm={() => mutate({})}
        handleCancel={() => setDeleteModal(false)}
        title={selectedItem?.nomor_surat}
      />

      <CreateSurat
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />

      <EditSurat
        isModal={editModal}
        selectedItem={selectedItem}
        handleCancel={() => setEditModal(false)}
      />
    </>
  );
}

interface ISuratTable {
  payload: GetPayload<SuratEntity> | undefined;
  handleEdit(user: SuratEntity): void;
  handleDelete(user: SuratEntity): void;
}

function SuratTable({ payload, handleEdit, handleDelete }: ISuratTable) {
  const styles = {
    heading:
      "flex items-center  h-10  px-4 py-1 flex-grow w-full justify-center",
    headningNumber: "flex items-center  h-10  px-4 py-1 w-[60px]",
    headingAction: "flex items-center  h-10  px-4 py-1 w-[130px]",
    body: "flex items-center   flex-grow w-full  p-1 px-2 capitalize",
    bodyAction: "flex items-center  px-4 py-1 w-[130px] justify-center",
    bodyNumber: "flex items-center  px-4 py-1 w-[60px] justify-center",
  };
  return (
    <div className="col-span-12  intro-y flex flex-col ">
      <div className="bg-white divide-y-[1px] max-h-[58vh] overflow-auto">
       
        <div className="col-span-12  overflow-auto intro-y lg:overflow-visible">
          <Table sm>
            <Table.Thead variant="dark" className="sticky">
              <Table.Tr>
                <Table.Th>Nomor Surat</Table.Th>
                <Table.Th>Tanggal Masuk</Table.Th>
                <Table.Th>Perihal</Table.Th>
                <Table.Th>Posisi Surat</Table.Th>
                <Table.Th>Ditujukan</Table.Th>
                <Table.Th>Dari</Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  Aksi
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {payload?.data.length === 0 && (
                <Table.Tr className="intro-x bg-white text-center">
                  <Table.Td colSpan={99}>No Data Found...</Table.Td>
                </Table.Tr>
              )}
              {payload?.data.map((divisi, index) => (
                <Table.Tr key={index} className="intro-x bg-white">
                  <Table.Td className="capitalize">
                    {divisi.nomor_surat}
                  </Table.Td>
                  <Table.Td className="capitalize">
                    {dayjs(divisi.tanggal_masuk).format("DD MMMM YYYY")}
                  </Table.Td>
                  <Table.Td>{divisi.perihal}</Table.Td>
                  <Table.Td>{divisi.posisi_surat}</Table.Td>
                  <Table.Td>{divisi.ditujukan}</Table.Td>
                  <Table.Td>{divisi.dari}</Table.Td>

                  <Table.Td>
                    <div className="flex flex-row items-center justify-center">
                      <EditTableButton onClick={() => handleEdit(divisi)} />
                      <DeleteTableButton onClick={() => handleDelete(divisi)} />
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
