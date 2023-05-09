import { Tab } from "@headlessui/react";

import Button from "@/base-components/Button";
import Table from "@/base-components/Table";
import { DeleteModal } from "@/components/Modals/Modals";
import CreateDokumen from "./CreateDokumen";
import EditDokumen from "./EditDokumen";
import Lucide from "@/base-components/Lucide";
import {
  EditTableButton,
  DeleteTableButton,
} from "@/components/Buttons/Buttons";
import { useDelete, useGet } from "@/hooks/useApi";
import { KeluargaKaryawanEntity } from "@/models/KeluargaKaryawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootState } from "@/stores/store";
import { formatDate } from "@fullcalendar/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DokumenKaryawanEntity } from "@/models/DokumenKaryawan.entity";
import { GetPayload } from "@/models/GenericPayload";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";

// no, nama dokumen, nama file, actions
export default function Dokumen() {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DokumenKaryawanEntity>();
  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );
  const dispatch = useAppDispatch();
  const { mutate } = useDelete({
    name: "dokumen-karyawans",
    endpoint: `dokumen-karyawans/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Dokumen",
          status: "success",
        })
      );
      setDeleteModal(false);
    },
  });

  const { data: payload, isLoading } = useGet<
    GetPayload<DokumenKaryawanEntity>
  >({
    name: "dokumen-karyawans",
    endpoint: "dokumen-karyawans",
    filter: {
      // limit: 10,
      karyawan_id: selectedKaryawan?.id
    },
  });

  const handleConfirmDelete = () => {
    mutate({});
  };

  return (
    <Tab.Panel>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 intro-y box ">
          <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
            <h2 className="mr-auto text-base font-medium">Dokumen</h2>
            <Button
              variant="primary"
              onClick={() => setCreateModal(true)}
              className="text-xs"
            >
              <Lucide icon="Plus" className="mr-2 h-4 w-4" />
              Tambah
            </Button>
          </div>
          <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
            {isLoading ? (
              <SkeletonTable />
            ) : (
              <Table sm>
                <Table.Thead variant="dark">
                  <Table.Tr>
                    <Table.Th className="border-b-0 whitespace-nowrap">
                      No
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap">
                      Nama Dokumen
                    </Table.Th>
                    <Table.Th className="text-center border-b-0 whitespace-nowrap">
                      Nama File
                    </Table.Th>

                    <Table.Th className="text-center border-b-0 whitespace-nowrap">
                      Action
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {payload?.data?.length === 0 && (
                    <Table.Tr className="intro-x bg-white text-center">
                      <Table.Td colSpan={99}>No Data Found...</Table.Td>
                    </Table.Tr>
                  )}
                  {payload?.data?.map((item, index) => (
                    <Table.Tr key={index} className=" bg-white">
                      <Table.Td>{index + 1}</Table.Td>
                      <Table.Td className="capitalize">
                        {item.nama_dokumen}
                      </Table.Td>
                      <Table.Td className="capitalize text-center">
                        <a
                          href={item.gLink}
                          className="cursor-pointer"
                          target="_blank"
                        >
                          {item.link_file}
                        </a>
                      </Table.Td>

                      <Table.Td>
                        <div className="flex flex-row items-center justify-center">
                          <EditTableButton
                            onClick={() => {
                              setEditModal(true);
                              setSelectedItem(item);
                            }}
                          />
                          <DeleteTableButton
                            onClick={() => {
                              setDeleteModal(true);
                              setSelectedItem(item);
                            }}
                          />
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </div>
        </div>
      </div>

      <DeleteModal
        isModal={deleteModal}
        handleConfirm={handleConfirmDelete}
        handleCancel={() => setDeleteModal(false)}
        title={`${selectedItem?.nama_dokumen}`}
      />

      <CreateDokumen
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />

      <EditDokumen
        isModal={editModal}
        selectedItem={selectedItem}
        handleCancel={() => setEditModal(false)}
      />
    </Tab.Panel>
  );
}
