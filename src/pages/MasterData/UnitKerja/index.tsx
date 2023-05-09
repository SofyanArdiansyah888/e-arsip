import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lucide from "@/base-components/Lucide";
import Table from "@/base-components/Table";
import {
  AddButton,
  BackButton,
  DeleteTableButton,
  EditTableButton,
} from "@/components/Buttons/Buttons";
import { DeleteModal } from "@/components/Modals/Modals";
import { useDelete, useGet } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { DepartemenEntity } from "@/models/Departemen.entity";

import ReactPaginate from "react-paginate";
import CreateDepartemen from "./CreateDepartemen";
import EditDepartemen from "./EditDepartemen";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";

export default function Departemen() {
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [meta, setMeta] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<DepartemenEntity>();
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const {
    data: payload,
    refetch,
    isLoading,
  } = useGet<GetPayload<DepartemenEntity>>({
    name: "departemens",
    endpoint: `departemens`,
    page: page + 1,
    limit,
    search,
  });
  const dispatch = useAppDispatch();

  const { mutate } = useDelete({
    name: "departemens",
    endpoint: `departemens/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Departemen",
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

  function handleConfirmDelete() {
    mutate({});
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => refetch(), 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">Unit Kerja</h2>
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
          <DepartemenTable
            handleEdit={(departemen: DepartemenEntity) => {
              setEditModal(true);
              setSelectedItem(departemen);
            }}
            handleDelete={(departemen: DepartemenEntity) => {
              setDeleteModal(true);
              setSelectedItem(departemen);
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
      <DeleteModal
        isModal={deleteModal}
        handleConfirm={handleConfirmDelete}
        handleCancel={() => setDeleteModal(false)}
        title={selectedItem?.nama_departemen}
      />

      <CreateDepartemen
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />

      <EditDepartemen
        isModal={editModal}
        selectedItem={selectedItem}
        handleCancel={() => setEditModal(false)}
      />
    </>
  );
}

interface IDepartemenTable {
  payload: GetPayload<DepartemenEntity> | undefined;
  handleEdit(departemen: DepartemenEntity): void;
  handleDelete(departemen: DepartemenEntity): void;
}

function DepartemenTable({
  payload,
  handleEdit,
  handleDelete,
}: IDepartemenTable) {
  return (
    <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <Table sm>
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th>No</Table.Th>
            <Table.Th>Nama Unit Kerja</Table.Th>
            <Table.Th className="text-center border-b-0 whitespace-nowrap">
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {payload?.data.map((departemen, index) => (
            <Table.Tr key={index} className="intro-x bg-white">
              <Table.Td>
                {" "}
                {payload.meta.per_page * (payload.meta.current_page - 1) +
                  (index + 1)}
              </Table.Td>
              <Table.Td className="capitalize">
                {departemen.nama_departemen}
              </Table.Td>
              <Table.Td>
                <div className="flex flex-row items-center justify-center">
                  <EditTableButton onClick={() => handleEdit(departemen)} />
                  <DeleteTableButton onClick={() => handleDelete(departemen)} />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
