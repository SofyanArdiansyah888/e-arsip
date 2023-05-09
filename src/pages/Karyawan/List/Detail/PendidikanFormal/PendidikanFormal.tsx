import Lucide from "@/base-components/Lucide";
import {
  DeleteTableButton,
  EditTableButton,
} from "@/components/Buttons/Buttons";
import { DeleteModal } from "@/components/Modals/Modals";
import { PendidikanKaryawanEntity } from "@/models/PendidikanKaryawan.entity";
import { RootState } from "@/stores/store";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@/base-components/Button";
import Table from "@/base-components/Table";
import CreatePendidikanFormal from "./CreatePendidikanFormal";
import EditPendidikanFormal from "./EditPendidikanFormal";
import { useDelete } from "@/hooks/useApi";
import { useAppDispatch } from "@/stores/hooks";
import { setNotification } from "@/stores/apps/notificationSlice";

export default function PendidikanFormal() {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<PendidikanKaryawanEntity>();

  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );

  const dispatch = useAppDispatch();
  const { mutate } = useDelete({
    name: "karyawan-details",
    endpoint: `pendidikan-karyawans/${selectedItem?.id}`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Menghapus Pendidikan Terakhir",
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
            <h2 className="mr-auto text-base font-medium">Pendidikan Formal</h2>
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
                    Jenjang
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    Nama Sekolah
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    Tahun Masuk
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    Tahun Keluar
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    Action
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {selectedKaryawan?.pendidikan_karyawans?.length === 0 && (
                  <Table.Tr className="intro-x bg-white text-center">
                    <Table.Td colSpan={99}>No Data Found...</Table.Td>
                  </Table.Tr>
                )}
                {selectedKaryawan?.pendidikan_karyawans.map((item, index) => (
                  <Table.Tr key={index} className=" bg-white">
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td className="capitalize ">{item.jenjang}</Table.Td>
                    <Table.Td className="capitalize">
                      {item.nama_sekolah}
                    </Table.Td>
                    <Table.Td className="capitalize text-center">
                      {item.tahun_masuk}
                    </Table.Td>
                    <Table.Td className="capitalize text-center">
                      {item.tahun_keluar}
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
        title={`${selectedItem?.nama_sekolah}`}
      />

      <CreatePendidikanFormal
        isModal={createModal}
        handleCancel={() => setCreateModal(false)}
      />

      <EditPendidikanFormal
        isModal={editModal}
        selectedItem={selectedItem}
        handleCancel={() => setEditModal(false)}
      />
    </Tab.Panel>
  );
}
