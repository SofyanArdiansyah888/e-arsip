import Lucide from "@/base-components/Lucide";
import Table from "@/base-components/Table";
import {
  AddButton, DeleteTableButton,
  EditTableButton
} from "@/components/Buttons/Buttons";
import { DeleteModal } from "@/components/Modals/Modals";
import { useDelete, useGet } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { PotonganEntity } from "@/models/Potongan.entity";
import { useEffect, useState } from "react";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { formatRupiah } from "@/utils/helper";
import ReactPaginate from "react-paginate";
import CreatePotongan from "./CreatePotongan";
import EditPotongan from "./EditPotongan";

export default function Potongan() {
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [meta, setMeta] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<PotonganEntity>();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  const {
    data: payload,
    refetch,
    isLoading,
  } = useGet<GetPayload<PotonganEntity>>({
    name: "potongans",
    endpoint: `potongans`,
    page: page + 1,
    limit,
    search,
  });
  const dispatch = useAppDispatch();

  const { mutate } = useDelete({
    name: "potongans",
    endpoint: `potongans/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Potongan",
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
        <h2 className=" text-lg font-medium intro-y">List Potongan</h2>
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
          <PotonganTable
            handleEdit={(potongan: PotonganEntity) => {
              setEditModal(true);
              setSelectedItem(potongan);
            }}
            handleDelete={(potongan: PotonganEntity) => {
              setDeleteModal(true);
              setSelectedItem(potongan);
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
        title={selectedItem?.nama_potongan}
      />

      <CreatePotongan
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />

      <EditPotongan
        isModal={editModal}
        selectedItem={selectedItem}
        handleCancel={() => setEditModal(false)}
      />
    </>
  );
}

interface IPotonganTable {
  payload: GetPayload<PotonganEntity> | undefined;
  handleEdit(potongan: PotonganEntity): void;
  handleDelete(potongan: PotonganEntity): void;
}

function PotonganTable({ payload, handleEdit, handleDelete }: IPotonganTable) {
  return (
    <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <Table sm>
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th>No</Table.Th>
            <Table.Th>Nama Potongan</Table.Th>
            {/* <Table.Th>Nominal Bawaan</Table.Th> */}
            {/* <Table.Th>Permanent</Table.Th>
            <Table.Th>Tanggal Awal Potongan</Table.Th>
            <Table.Th>Tanggal Akhir Potongan</Table.Th> */}
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
          {payload?.data.map((potongan, index) => (
            <Table.Tr key={index} className="intro-x bg-white">
              <Table.Td>
                {" "}
                {payload.meta.per_page * (payload.meta.current_page - 1) +
                  (index + 1)}
              </Table.Td>
              <Table.Td className="capitalize">
                {potongan.nama_potongan}
              </Table.Td>
              {/* <Table.Td className="capitalize">
                {formatRupiah(potongan.nominal_bawaan)}
              </Table.Td> */}
              {/* <Table.Td className="capitalize">
                {potongan.permanent ? "Ya" : "Tidak"}
              </Table.Td>
              <Table.Td className="capitalize">
                {formatDate(potongan.tanggal_awal_potongan, "DD MMM YYYY")}
              </Table.Td>
              <Table.Td className="capitalize">
                {formatDate(potongan.tanggal_akhir_potongan, "DD MMM YYYY")}
              </Table.Td> */}
              <Table.Td>
                <div className="flex flex-row items-center justify-center">
                  <EditTableButton onClick={() => handleEdit(potongan)} />
                  <DeleteTableButton onClick={() => handleDelete(potongan)} />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
