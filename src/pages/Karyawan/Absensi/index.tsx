import Button from "@/base-components/Button";
import { FormInput } from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import Lucide from "@/base-components/Lucide";
import Table from "@/base-components/Table";
import { DetailTableButton } from "@/components/Buttons/Buttons";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import { useExport, useGet, usePost } from "@/hooks/useApi";
import { AbsensiKaryawanEntity } from "@/models/AbsensiKaryawan.entity";
import { CutiEntity } from "@/models/Cuti.entity";
import { GetPayload } from "@/models/GenericPayload";
import PATHNAME from "@/router/path";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

function Main() {
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<string>();
  const [page, setPage] = useState<number>(0);

  const { mutate: doExport, isLoading: isExport } = useExport({
    name: "absen-export",
    endpoint: "karyawan-absens/export",
    filename: `ABSEN_EXPORT_${date}.xlsx`,
    method: "POST",
  });

  const {
    data: absensiPayload,
    isFetching,
    refetch,
  } = useGet<GetPayload<AbsensiKaryawanEntity>>({
    name: `karyawan-absens`,
    endpoint: `karyawan-absens`,
    limit: 10,
    filter: {
      date,
    },
  });

  useEffect(() => {
    if (date) refetch();
    return () => {
      refetch;
    };
  }, [date]);

  const dispatch = useAppDispatch();
  const { mutate: refillCuti, isLoading: refillLoading } = usePost({
    name: "refill-cuti",
    endpoint: "refill-cuti",
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil Refill Cuti Karyawan",
          status: "success",
        })
      );
    },
  });

  const filteredData = () => {
    return absensiPayload?.data.filter((item) => {
      return item.nama_lengkap.toLowerCase().includes(search);
    });
  };

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">Absensi</h2>
        <div className=" flex gap-2 ml-auto">
          <Button
            variant="twitter"
            size="sm"
            className="text-white"
            onClick={() => refillCuti({})}
          >
            <Lucide icon="AlarmCheck" className="mr-2" />
            {refillLoading ? `Loading...` : `Refill Cuti`}
          </Button>

          <Link to={PATHNAME.KARYAWAN_IZIN}>
            <Button variant="primary" size="sm">
              <Lucide icon="Info" className="mr-2" />
              Izin Karyawan
            </Button>
          </Link>

          <Link to={PATHNAME.KARYAWAN_CUTI}>
            <Button variant="danger" size="sm">
              <Lucide icon="Info" className="mr-2" />
              Cuti Karyawan
            </Button>
          </Link>

          <Link to={PATHNAME.KARYAWAN_SCHEDULE}>
            <Button variant="instagram" size="sm">
              <Lucide icon="Table" className="mr-2" />
              Schedule
            </Button>
          </Link>

          <Button
            variant="facebook"
            size="sm"
            onClick={() => doExport({ date })}
          >
            <Lucide icon="Table" className="mr-2" />
            {isExport ? "Loading..." : "Export Excel"}
          </Button>

        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap justify-between  col-span-12 mt-2 intro-y sm:flex-nowrap">
          <div className="intro-y block sm:flex items-center h-10">
            <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
              <Lucide
                icon="Calendar"
                className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
              />
              <Litepicker
                value={date}
                onChange={(value) => setDate(value)}
                options={{
                  autoApply: false,
                  singleMode: true,
                  numberOfColumns: 0,
                  numberOfMonths: 1,
                  showWeekNumbers: true,
                  format: "MMMM YYYY",
                  lang: "id-ID",
                  dropdowns: {
                    minYear: new Date().getFullYear() - 5,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="form-control sm:w-56 box pl-10 cursor-pointer"
              />
            </div>
          </div>

          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-full mt-3 mr-auto sm:w-auto sm:mt-0">
              <Lucide
                icon="Search"
                className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
              />
              <FormInput
                type="text"
                className="w-full px-10 sm:w-64 !box"
                placeholder="Cari..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />

              <Lucide
                icon="X"
                className="absolute inset-y-0 right-2 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
                onClick={() => setSearch("")}
              />
            </div>
          </div>
        </div>
        {!isFetching ? (
          <AbsensiTable payload={filteredData()} />
        ) : (
          <SkeletonTable />
        )}

        {absensiPayload?.data && absensiPayload?.data.length > 0 && (
          <div className="col-span-12 flex justify-center">
            <ReactPaginate
              nextLabel="next"
              onPageChange={(data) => setPage(data.selected)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={absensiPayload.meta?.last_page}
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
        )}
      </div>
    </>
  );
}
interface IAbsenTable {
  payload: AbsensiKaryawanEntity[] | undefined;
}

function AbsensiTable({ payload }: IAbsenTable) {
  return (
    <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
      <Table sm>
        <Table.Thead variant="dark">
          <Table.Tr className="text-center">
            <Table.Th>No</Table.Th>
            <Table.Th>Nama</Table.Th>
            <Table.Th>Unit Kerja</Table.Th>
            <Table.Th>Level</Table.Th>
            <Table.Th>Kehadiran</Table.Th>

            <Table.Th className="text-center border-b-0 whitespace-nowrap">
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {payload?.length === 0 && (
            <Table.Tr className="intro-x bg-white text-center">
              <Table.Td colSpan={99}>No Data Found...</Table.Td>
            </Table.Tr>
          )}
          {payload?.map((karyawan, index) => (
            <Table.Tr key={index} className="intro-x bg-white">
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td className="capitalize flex flex-col">
                {karyawan.nama_lengkap}
                <small>{karyawan.jabatan?.nama_jabatan}</small>
              </Table.Td>
              <Table.Td className="capitalize">
                {karyawan.departemen?.nama_departemen}
              </Table.Td>
              <Table.Td className="capitalize">
                {karyawan.divisi?.nama_divisi}
              </Table.Td>
              <Table.Td className="capitalize">
                <div className="flex gap-4 justify-center">
                  <div className="flex flex-row w-24 justify-between gap-1 bg-success py-1 px-2 rounded-md text-white text-xs">
                    <div>Hadir</div>
                    <div>{karyawan.hadir ? karyawan.hadir : 0}</div>
                  </div>

                  <div className="flex flex-row w-24 justify-between gap-1 bg-danger py-1 px-2 rounded-md text-white text-xs">
                    <div>Tidak Hadir</div>
                    <div>{karyawan.tidak_hadir ? karyawan.tidak_hadir : 0}</div>
                  </div>

                  <div className="flex flex-row w-24 justify-between gap-1 bg-warning py-1 px-2 rounded-md  text-xs">
                    <div>Telat</div>
                    <div>{karyawan.telat ? karyawan.telat : 0}</div>
                  </div>
                </div>
              </Table.Td>
              <Table.Td>
                <div className="flex flex-row items-center justify-center">
                  <Link to={`/karyawan/${karyawan.id}/absen-detail`}>
                    <DetailTableButton />
                  </Link>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

export default Main;
