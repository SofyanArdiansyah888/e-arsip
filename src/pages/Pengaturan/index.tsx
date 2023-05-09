import _ from "lodash";
import { useState } from "react";
import Table from "../../base-components/Table";
import {
  EditTableButton
} from "../../components/Buttons/Buttons";
import SkeletonTable from "../../components/Skeletons/SkeletonTable";
import { useGet } from "../../hooks/useApi";
import { GetPayload } from "../../models/GenericPayload";
import { PengaturanEntity } from "../../models/Pengaturan.entity";
import { useAppDispatch } from "../../stores/hooks";
import fakerData from "../../utils/faker";
import  EditPengaturan  from "./EditPengaturan";

function Pengaturan() {
  const [editModal, setEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PengaturanEntity>();


  const {
    data: payload,
    refetch,
    isLoading,
  } = useGet<GetPayload<PengaturanEntity>>({
    name: "pengaturans",
    endpoint: `pengaturans`,
    page:0,
    limit: 10,
  });

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">Pengaturan</h2>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-5">
      {!isLoading ? (
          <PengaturanTable
            handleEdit={(cuti: PengaturanEntity) => {
              setEditModal(true);
              setSelectedItem(cuti);
            }}
            payload={payload}
          />
        ) : (
          <SkeletonTable />
        )}

        <EditPengaturan
          isModal={editModal}
          handleCancel={() => setEditModal(false)}
          selectedItem={selectedItem}
        />
      </div>
    </>
  );
}


interface IPengaturanTable {
  payload: GetPayload<PengaturanEntity> | undefined;
  handleEdit(cuti: PengaturanEntity): void;
}

function PengaturanTable({ payload, handleEdit }: IPengaturanTable) {
  return (
    <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <Table sm>
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th>No</Table.Th>
            <Table.Th>Nama Pengaturan</Table.Th>
            <Table.Th>Nilai</Table.Th>
          
            <Table.Th className="text-center border-b-0 whitespace-nowrap">
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {payload?.data.length === 0 && (
            <Table.Tr className="intro-x bg-white text-center">
              <Table.Td colSpan={99} >No Data Found...</Table.Td>
            </Table.Tr>
          )}
          {payload?.data.map((cuti, index) => (
            <Table.Tr key={index} className="intro-x bg-white">
              <Table.Td>{index + 1}</Table.Td>

              <Table.Td className="capitalize">{cuti.nama_pengaturan}</Table.Td>
              <Table.Td className="capitalize">{cuti.nilai}</Table.Td>
              
              <Table.Td>
                <div className="flex flex-row items-center justify-center">
                  <EditTableButton onClick={() => handleEdit(cuti)} />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}


export default Pengaturan;
