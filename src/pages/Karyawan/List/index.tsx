import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/base-components/Button";
import { FormInput, FormSelect } from "@/base-components/Form";
import Lucide from "@/base-components/Lucide";
import Pagination from "@/base-components/Pagination";
import { AddButton } from "@/components/Buttons/Buttons";
import { useDelete, useGet } from "@/hooks/useApi";
import { GetPayload } from "@/models/GenericPayload";
import { KaryawanEntity } from "@/models/Karyawan.entity";
import placeholder from "@/assets/images/placeholders/200x200.jpg";
import ReactPaginate from "react-paginate";
import { useAppDispatch } from "@/stores/hooks";
import { setNotification } from "@/stores/apps/notificationSlice";
import { DeleteModal } from "@/components/Modals/Modals";
import SkeletonCard from "@/components/Skeletons/SkeletonCard";
import CreateKaryawan from "./Create";
import { formatDate } from "@/utils/helper";
import ImportKaryawan from "./ImportKaryawan";
import FilterKaryawan, { IFilter } from "./Filter";

function Karyawan() {
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [meta, setMeta] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<KaryawanEntity>();
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [importModal, setImportModal] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    jabatan_id: undefined,
    golongan_darah: undefined,
    jenis_kelamin: undefined,
    pendidikan_terakhir:undefined,
    status_karyawan:undefined,
    status_pernikahan:undefined
  })
  const {
    data: payload,
    isLoading,
    refetch: refetchKaryawans
  } = useGet<GetPayload<KaryawanEntity>>({
    name: "karyawans",
    endpoint: `karyawans`,
    page,
    limit: 6,
    search,
    filter:{
      ...filter
    }
  });


  useEffect(() => {
    if (payload) {
      setMeta(payload.meta);
    }
  }, [payload]);

  useEffect(() => {
    setTimeout(() => {
      refetchKaryawans()
    },500)
  },[search])
  
  const dispatch = useAppDispatch();
  const { mutate } = useDelete({
    name: "karyawans",
    endpoint: `karyawans/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Karyawan",
          status: "success",
        })
      );
      setDeleteModal(false);
    },
  });

  

  function handleConfirmDelete() {
    mutate({});
  }

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10 ">
        <h2 className=" text-lg font-medium intro-y">List Karyawan</h2>
        <div className=" flex gap-2 ml-auto">
          <Button
            variant="facebook"
            size="sm"
            onClick={() => setImportModal(true)}
          >
            <Lucide icon="Table" className="mr-2" />
            Import Karyawan
          </Button>
          <AddButton title="Karyawan" onClick={() => setCreateModal(true)} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-end col-span-12 intro-y sm:flex-nowrap">
        <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
          <div className="relative w-full mt-3 mr-auto sm:w-auto sm:mt-0">
            <Lucide
              icon="Search"
              className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
            />
            <FormInput
              type="text"
              className="w-full px-10 sm:w-64 !box"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Lucide
              icon="Filter"
              className={`absolute inset-y-0 right-2 z-10 w-4 h-4 my-auto ml-3 cursor-pointer ${
                !isFiltered ?  "text-gray-500" : "text-red-700"
              }`}
              onClick={() => {
                setIsFilter(true);
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2 mt-5">
        {isLoading ? (
          <SkeletonCard />
        ) : (
          <>
            {payload?.data.map((karyawan, index) => (
              <div
                key={index}
                className="col-span-12 intro-y md:col-span-6 lg:col-span-4 "
              >
                <div className="box border-t-2 border-black   ">
                  <div className="flex items-start px-5 pt-5 ">
                    <div className="flex flex-col items-center w-full lg:flex-row">
                      {/* FOTO */}
                      <div className="w-12 h-12 image-fit">
                        <img
                          alt="Foto Karyawan"
                          className="rounded-full"
                          src={
                            karyawan?.foto === ("" || null)
                              ? placeholder
                              : karyawan?.foto
                          }
                        />
                      </div>
                      {/*  */}
                      <div className=" text-center lg:ml-4 lg:text-left lg:mt-0">
                        <a href="" className="font-medium">
                          {karyawan.nama_lengkap}
                        </a>
                        <div className="text-slate-500 text-xs mt-0.5 text-ellipsis">
                          {karyawan.jabatan?.nama_jabatan}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant={
                        karyawan.status_karyawan === "aktif"
                          ? "outline-success"
                          : "outline-danger"
                      }
                      size="sm"
                      className="capitalize"
                    >
                      {karyawan.status_karyawan}
                    </Button>
                  </div>
                  <div className="px-5 py-1 text-center lg:text-left">
                    <div className="flex items-center justify-center mt-5 lg:justify-start text-slate-500">
                      <Lucide icon="Mail" className="w-3 h-3 mr-2" />
                      {karyawan?.user?.email ? karyawan.user.email : "-"}
                    </div>
                    <div className="flex items-center justify-center mt-1 lg:justify-start text-slate-500">
                      <Lucide icon="Phone" className="w-3 h-3 mr-2" />
                      {karyawan?.telepon ? karyawan.telepon : "-"}
                    </div>
                    <div className="flex items-center justify-center mt-1 lg:justify-start text-slate-500">
                      <Lucide icon="Cake" className="w-3 h-3 mr-2" />
                      {formatDate(karyawan.tanggal_lahir, "DD MMMM YYYY")}
                    </div>
                  </div>
                  <div className="p-2 text-center border-t lg:text-right border-slate-200/60 dark:border-darkmode-400">
                    {/* <Link to={`${karyawan.id}`}>
                      <Button variant="primary" size="sm" className="mr-1">
                        <Lucide icon="Eye" className="w-5 h-5" />
                      </Button>
                    </Link> */}

                    <Link to={`${karyawan.id}`}>
                      <Button variant="warning" size="sm" className="mr-1">
                        <Lucide icon="Pencil" className="w-5 h-5" />
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setDeleteModal(true);
                        setSelectedItem(karyawan);
                      }}
                    >
                      <Lucide icon="X" className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {/* BEGIN: Users Layout */}

        <div className="mt-4 col-span-12 flex justify-center">
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
        handleConfirm={handleConfirmDelete}
        handleCancel={() => setDeleteModal(false)}
        title={selectedItem?.nama_lengkap}
      />
      <CreateKaryawan
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />
      <ImportKaryawan
        isModal={importModal}
        handleCancel={() => setImportModal(false)}
      />
      <FilterKaryawan
        isModal={isFilter}
        handleCancel={() => setIsFilter(false)}
        handleFilter={(data: IFilter) => {
          setIsFilter(false)
          setIsFiltered(true)
          setFilter({
            jabatan_id: data.jabatan_id ? filteredFilter(data.jabatan_id) : undefined,
            golongan_darah: data.golongan_darah ? filteredFilter(data.golongan_darah) : undefined,
            jenis_kelamin: data.jenis_kelamin ? filteredFilter(data.jenis_kelamin) : undefined,
            pendidikan_terakhir: data.pendidikan_terakhir ? filteredFilter(data.pendidikan_terakhir) : undefined,
            status_karyawan: data.status_karyawan ? filteredFilter(data.status_karyawan) : undefined,
            status_pernikahan: data.status_pernikahan ? filteredFilter(data.status_pernikahan) : undefined,

          })
          setTimeout(() => {
            refetchKaryawans()
          },300)
        }}
      />
    </>
  );
}

const filteredFilter = (value: string) => {
  if(value === "Pilih" || value === undefined){
    return undefined;
  }
  return value
}

export default Karyawan;
