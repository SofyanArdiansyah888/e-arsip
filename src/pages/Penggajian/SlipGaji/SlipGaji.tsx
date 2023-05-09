import Button from "@/base-components/Button";
import { FormInput } from "@/base-components/Form";
import Litepicker from "@/base-components/Litepicker";
import Lucide from "@/base-components/Lucide";
import { BackButton } from "@/components/Buttons/Buttons";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import { useExport, useGet, usePost } from "@/hooks/useApi";
import { CutiEntity } from "@/models/Cuti.entity";
import { GetPayload } from "@/models/GenericPayload";
import { RiwayatPenggajianEntity } from "@/models/RiwayatPenggajian.entity";
import { setNotification } from "@/stores/apps/notificationSlice";
import { useAppDispatch } from "@/stores/hooks";
import { useEffect, useState } from "react";
import GajiTable from "./GajiTable";

function SlipGaji() {
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<string>();
  const [tipeGaji, setTipeGaji] = useState<string>("gaji");

  const {
    data: riwayatGaji,
    isFetching,
    refetch,
  } = useGet<GetPayload<RiwayatPenggajianEntity>>({
    name: `riwayat-penggajians`,
    endpoint: `riwayat-penggajians`,
    filter: {
      date,
      tipe_gaji: tipeGaji,
    },
  });

  const dispatch = useAppDispatch();
  const { mutate: createSlipGaji, isLoading: isCreateSlipGaji } = usePost({
    name: "riwayat-penggajians",
    endpoint: `riwayat-penggajians`,
    onSuccessCallback: () => {
      dispatch(
        setNotification({
          message: "Berhasil membuat slip gaji",
          status: "success",
        })
      );
    },
    onErrorCallback: () => {
      dispatch(
        setNotification({
          message: "Gagal membuat slip gaji",
          status: "error",
        })
      );
    },
  });

  const { mutate: doExport, isLoading: isExportLoading } = useExport({
    name: "export-slip-gaji",
    endpoint: `riwayat-penggajians/export`,
    filename: `SLIP_GAJI ${date}.xlsx`,
    method: "POST",
  });

  useEffect(() => {
    if (date) refetch();
    return () => {
      refetch;
    };
  }, [date, tipeGaji]);

  return (
    <>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">Slip Gaji</h2>
        <div className=" flex gap-2 ml-auto">
          <BackButton onClick={() => history.back()} />

          <Button
            variant="facebook"
            size="sm"
            onClick={() =>
              doExport({
                date,
                tipe_gaji: tipeGaji,
              })
            }
          >
            <Lucide icon="Table" className="mr-2" />
            {isExportLoading ? "Loading..." : "Export Excel"}
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setTipeGaji("gaji");
              createSlipGaji({ periode: date, tipe_gaji: "gaji" });
            }}
          >
            <Lucide icon="PlusCircle" className="mr-2" />
            {isCreateSlipGaji && tipeGaji === "gaji"
              ? "Loading..."
              : "Slip Gaji"}
          </Button>

          <Button
            variant="instagram"
            size="sm"
            onClick={() => {
              setTipeGaji("thr");
              createSlipGaji({ periode: date, tipe_gaji: "thr" });
            }}
          >
            <Lucide icon="PlusCircle" className="mr-2" />
            {isCreateSlipGaji && tipeGaji === "thr" ? "Loading..." : "Slip THR"}
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
            <select
              onChange={(e) => setTipeGaji(e.target.value)}
              className="border border-gray-200 text-gray-900 text-sm rounded-lg ml-1  w-[120px] p-2 shadow-sm"
            >
              <option value="gaji">Gaji</option>
              <option value="thr">THR</option>
            </select>
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
          <GajiTable
            payload={riwayatGaji}
            search={search}
          />
        ) : (
          <SkeletonTable />
        )}

        {/* {riwayatGaji?.data && riwayatGaji?.data.length > 0 && (
          <div className="col-span-12 flex justify-center">
            <ReactPaginate
              nextLabel="next"
              onPageChange={(data) => setPage(data.selected)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={riwayatGaji.meta?.last_page}
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
        )} */}
      </div>
    </>
  );
}

export default SlipGaji;
