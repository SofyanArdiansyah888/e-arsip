import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lucide from "../../../base-components/Lucide";
import Table from "../../../base-components/Table";
import {
  AddButton,
  BackButton,
  DeleteTableButton,
  EditTableButton,
} from "../../../components/Buttons/Buttons";
import { DeleteModal } from "../../../components/Modals/Modals";
import { useDelete, useGet } from "../../../hooks/useApi";
import { GetPayload } from "../../../models/GenericPayload";
import { TunjanganEntity } from "../../../models/Tunjangan.entity";

import ReactPaginate from "react-paginate";
import CreateTunjangan from "./CreateTunjangan";
import EditTunjangan from "./EditTunjangan";
import SkeletonTable from "../../../components/Skeletons/SkeletonTable";
import { setNotification } from "../../../stores/apps/notificationSlice";
import { useAppDispatch } from "../../../stores/hooks";
import { formatDate, formatRupiah } from "../../../utils/helper";

export default function Tunjangan() {
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [meta, setMeta] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<TunjanganEntity>();
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const {
    data: payload,
    refetch,
    isLoading,
  } = useGet<GetPayload<TunjanganEntity>>({
    name: "tunjangans",
    endpoint: `tunjangans`,
    page: page + 1,
    limit,
    search,
  });
  const dispatch = useAppDispatch();

  const { mutate } = useDelete({
    name: "tunjangans",
    endpoint: `tunjangans/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Tunjangan",
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
    const delayDebounceFn = setTimeout(() => {
      if (search !== "") {
        setPage(0);
        setLimit(0);
      }
      refetch();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">List Tunjangan</h2>
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
          <TunjanganTable
            handleEdit={(tunjangan: TunjanganEntity) => {
              setEditModal(true);
              setSelectedItem(tunjangan);
            }}
            handleDelete={(tunjangan: TunjanganEntity) => {
              setDeleteModal(true);
              setSelectedItem(tunjangan);
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
        title={selectedItem?.nama_tunjangan}
      />

      <CreateTunjangan
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />

      <EditTunjangan
        isModal={editModal}
        selectedItem={selectedItem}
        handleCancel={() => setEditModal(false)}
      />
    </>
  );
}

interface ITunjanganTable {
  payload: GetPayload<TunjanganEntity> | undefined;
  handleEdit(tunjangan: TunjanganEntity): void;
  handleDelete(tunjangan: TunjanganEntity): void;
}

function TunjanganTable({
  payload,
  handleEdit,
  handleDelete,
}: ITunjanganTable) {
  return (
    <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <Table sm>
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th>No</Table.Th>
            <Table.Th>Nama Tunjangan</Table.Th>
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
          {payload?.data.map((tunjangan, index) => (
            <Table.Tr key={index} className="intro-x bg-white">
              <Table.Td>
                {" "}
                {payload.meta.per_page * (payload.meta.current_page - 1) +
                  (index + 1)}
              </Table.Td>
              <Table.Td className="capitalize">
                {tunjangan.nama_tunjangan}
              </Table.Td>
              

              <Table.Td>
                <div className="flex flex-row items-center justify-center">
                  <EditTableButton onClick={() => handleEdit(tunjangan)} />
                  <DeleteTableButton onClick={() => handleDelete(tunjangan)} />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
