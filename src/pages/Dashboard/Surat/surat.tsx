//@ts-nocheck
import Button from "@/base-components/Button";
import {Menu} from "@/base-components/Headless";
import Lucide from "@/base-components/Lucide";
import {AddButton} from "@/components/Buttons/Buttons";
import {DeleteModal} from "@/components/Modals/Modals";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import {useCustomGet, useDelete, useGet, usePut} from "@/hooks/useApi";
import {GetPayload} from "@/models/GenericPayload";
import SuratEntity from "@/models/Surat.entity";
import {setNotification} from "@/stores/apps/notificationSlice";
import {useAppDispatch} from "@/stores/hooks";
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import ExportButton from "./components/ExportButton";
import SuratTable from "./components/SuratTable";
import CreateSurat from "./createSurat";
import EditSurat from "./editSurat";
import ImportModal from "./components/ImportModal";
import FilterSurat from "@/pages/Dashboard/Surat/filterSurat";
import {useSelector} from "react-redux";
import {RootState} from "@/stores/store";
import {setFilterSurat} from "@/stores/apps/filterSuratSlice";
import {useQueryClient} from "react-query";

export default function Surat() {
    const [createModal, setCreateModal] = useState(false);
    const [filterModal, setFilterModal] = useState(false)
    const [isImportModal, setIsImportModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [meta, setMeta] = useState<any>();
    const [selectedItem, setSelectedItem] = useState<SuratEntity>();
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState<string>("");
    const filterSurat = useSelector((state: RootState) => state.filterSurat);


    const {
        data: payload,
        refetch,
        isLoading,
    } = useCustomGet<GetPayload<SuratEntity>>({
        name: "surats",
        endpoint: `surats`,
        page: page + 1,
        limit,
        search,
        filter: {
            posisi: filterSurat.filter.posisi,
            disposisi: filterSurat.filter.disposisi,
            nomor_agenda: filterSurat.filter.nomor_agenda,
            tanggal_masuk: filterSurat.filter.tanggal_masuk,
        }
    });

    const dispatch = useAppDispatch();

    const {mutate: updateStatus, isLoading: isUpdateLoading} = usePut({
        name: "lokasi",
        endpoint: "lokasi/1",
        onSuccessCallback: () => {
            dispatch(
                setNotification({
                    message: "Berhasil Mengupdate Lokasi Sekda",
                    status: "success",
                })
            );
        },
    });

    const {mutate} = useDelete({
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
            setLimit(10);
            refetch();
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleUpdate = (
        lokasi: "berada di kantor" | "tugas luar" | "tugas dalam daerah" | "libur" | "diluar jam kerja" | '-'
    ) => {
        updateStatus({lokasi});
    };

    return (
        <>
            <div className="flex flex-nowrap justify-between mt-10">
                <h2 className=" text-lg font-medium intro-y">List Surat</h2>
                <div className=" flex gap-2 ml-auto">
                    <AddButton title="Tambah" onClick={() => setCreateModal(true)}/>

                    <ExportButton/>

                    <Button variant="instagram" size="sm" onClick={() => setIsImportModal(true)}>
                        <Lucide icon="Table" className="mr-2"/>
                        Import Excel
                    </Button>
                    <Menu className="z-50">
                        <Menu.Button
                            variant="primary"
                            className="bg-primary text-white flex px-3 py-3 rounded-md text-xs"
                        >
                            {isUpdateLoading ? "Loading..." : "Update Status Sekda"}
                            <Lucide icon="ChevronDown" className="w-4 h-4 ml-2"/>
                        </Menu.Button>
                        <Menu.Items className="w-48">
                            <Menu.Item onClick={() => handleUpdate("berada di kantor")}>
                                Berada Di Kantor
                            </Menu.Item>
                            <Menu.Item onClick={() => handleUpdate("tugas luar")}>
                                Tugas Luar
                            </Menu.Item>
                            <Menu.Item onClick={() => handleUpdate("tugas dalam daerah")}>
                                Tugas Dalam Daerah
                            </Menu.Item>
                            <Menu.Item onClick={() => handleUpdate("libur")}>
                                Libur
                            </Menu.Item>
                            <Menu.Item onClick={() => handleUpdate("diluar jam kerja")}>
                                Diluar Jam Kerja
                            </Menu.Item>
                            <Menu.Item onClick={() => handleUpdate("-")}>
                                -
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="flex flex-wrap justify-between gap-2 col-span-12 mt-2 sm:flex-nowrap">
                    <Button variant={"primary"} onClick={() => setFilterModal(true)}>
                        <Lucide icon={"Filter"} className={"mr-2"}/> Filter
                    </Button>
                    <Button variant={"primary"} onClick={() => dispatch(setFilterSurat({
                        filter: {
                            posisi_surat: undefined,
                            nomor_agenda: undefined,
                            disposisi: undefined,
                            tanggal_masuk: undefined,
                        }
                    }))}><Lucide
                        icon={"XCircle"} className={"mr-2"}/> Clear Filter</Button>
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
                    <SkeletonTable/>
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
            <ImportModal
                isModal={isImportModal}
                handleCancel={() => setIsImportModal(false)}
            />
            <FilterSurat isModal={filterModal} handleCancel={() => setFilterModal(false)}/>
        </>
    );
}


