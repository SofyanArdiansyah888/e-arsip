import Button from "@/base-components/Button";
import Lucide from "@/base-components/Lucide";
import Table from "@/base-components/Table";
import {
  DeleteTableButton,
  EditTableButton,
} from "@/components/Buttons/Buttons";
import { DeleteModal } from "@/components/Modals/Modals";
import { useDelete } from "@/hooks/useApi";
import { KeluargaKaryawanEntity } from "@/models/KeluargaKaryawan.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { RootState } from "@/stores/store";
import { formatDate } from "@/utils/helper";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CreateKeluarga from "./CreateKeluarga";
import EditKeluarga from "./EditKeluarga";

export default function Keluarga() {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] =
    useState<KeluargaKaryawanEntity>();

  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );
  

  const dispatch = useAppDispatch();
  const { mutate } = useDelete({
    name: "karyawan-details",
    endpoint: `keluarga-karyawans/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Keluarga",
          status: "success",
        })
      );
      setDeleteModal(false);
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
            <h2 className="mr-auto text-base font-medium">Data Keluarga</h2>
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
            <Table sm>
              <Table.Thead variant="dark">
                <Table.Tr>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    No
                  </Table.Th>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    Nama 
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    Tempat Lahir
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    Tanggal Lahir
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    Status Keluarga
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    Anak Ke
                  </Table.Th>

                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    Action
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {selectedKaryawan?.keluarga_karyawans?.length === 0 && (
                  <Table.Tr className="intro-x bg-white text-center">
                    <Table.Td colSpan={99}>No Data Found...</Table.Td>
                  </Table.Tr>
                )}
                {selectedKaryawan?.keluarga_karyawans?.map((item, index) => (
                  <Table.Tr key={index} className=" bg-white">
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td className="capitalize">
                      {item.nama}
                    </Table.Td>
                    <Table.Td className="capitalize text-center">{item.tempat_lahir}</Table.Td>
                    <Table.Td className="capitalize text-center">
                      {formatDate(item.tanggal_lahir)}
                    </Table.Td>
                    <Table.Td className="capitalize">
                      {item.status_keluarga}
                    </Table.Td>
                    <Table.Td className="capitalize">
                      {item.anak_ke}
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
          </div>
        </div>
      </div>

      <DeleteModal
        isModal={deleteModal}
        handleConfirm={handleConfirmDelete}
        handleCancel={() => setDeleteModal(false)}
        title={`${selectedItem?.nama}`}
      />

      <CreateKeluarga
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />

      <EditKeluarga
        isModal={editModal}
        selectedItem={selectedItem}
        handleCancel={() => setEditModal(false)}
      />
    </Tab.Panel>
  );
}
