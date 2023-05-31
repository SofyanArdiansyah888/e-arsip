import Lucide from "@/base-components/Lucide";
import {
  AddButton, DeleteTableButton,
  EditTableButton
} from "@/components/Buttons/Buttons";
import { DeleteModal } from "@/components/Modals/Modals";
import { useDelete, useGet } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { UserEntity } from "@/models/User.entity";
import { useEffect, useState } from "react";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import ReactPaginate from "react-paginate";
import CreateUser from "./createUser";
import EditUser from "./editUser";

export default function User() {
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [meta, setMeta] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<UserEntity>();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<string>("");

  const {
    data: payload,
    refetch,
    isLoading,
  } = useGet<GetPayload<UserEntity>>({
    name: "users",
    endpoint: `users`,
    page: page + 1,
    limit,
    search,
  });

  const dispatch = useAppDispatch();

  const { mutate } = useDelete({
    name: "users",
    endpoint: `users/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus User",
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
        <h2 className=" text-lg font-medium intro-y">List User</h2>
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
          <UserTable
            handleEdit={(User: UserEntity) => {
              setEditModal(true);
              setSelectedItem(User);
            }}
            handleDelete={(User: UserEntity) => {
              setDeleteModal(true);
              setSelectedItem(User);
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
        title={selectedItem?.name}
      />

      <CreateUser
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />

      <EditUser
        isModal={editModal}
        selectedItem={selectedItem}
        handleCancel={() => setEditModal(false)}
      />
    </>
  );
}

interface IUserTable {
  payload: GetPayload<UserEntity> | undefined;
  handleEdit(user: UserEntity): void;
  handleDelete(user: UserEntity): void;
}

function UserTable({ payload, handleEdit, handleDelete }: IUserTable) {
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
      <div className="flex flex-shrink-0 bg-primary rounded-tr-xl rounded-tl-xl text-white">
        <div className={styles.headningNumber}>No</div>
        <div className={styles.heading}>Nama User</div>
        <div className={styles.heading}>Email</div>
        <div className={styles.headingAction}>Aksi</div>
      </div>
      <div className="bg-white divide-y-[1px] max-h-[58vh] overflow-auto">
        {payload?.data?.length === 0 && (
          <div className="flex w-full justify-center text-lg p-4 h-[58vh] items-center ">
            No Data Found
          </div>
        )}
        {payload?.data?.map((item, index) => (
          <div className="flex flex-grow-1 ">
            <div className={styles.bodyNumber}>
              {payload.meta.per_page * (payload.meta.current_page - 1) +
                (index + 1)}
            </div>
            <div className={styles.body}>{item.name}</div>
            <div className={`${styles.body} justify-center lowercase`}>{item.email ? item.email : '-'}</div>
            <div className={styles.bodyAction}>
              <div className="flex flex-row items-center justify-center">
                <EditTableButton onClick={() => handleEdit(item)} />
                <DeleteTableButton onClick={() => handleDelete(item)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
