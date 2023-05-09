import Disclosure from "@/base-components/Headless/Disclosure";
import { GetPayload } from "@/models/GenericPayload";
import { RiwayatIzinEntity } from "@/models/RiwayatIzin.entity";
import { formatDate } from "@/utils/helper";

export default function RiwayatIzinCard({
  payload,
  isLoading,
}: {
  payload: GetPayload<RiwayatIzinEntity> | undefined;
  isLoading: boolean;
}) {
  return (
    <>
      <Disclosure className=" bg-white " defaultOpen={true}>
        <Disclosure.Button className="py-3 px-4 text-md bg-primary text-white rounded-t-lg">
          Riwayat Izin / Cuti
        </Disclosure.Button>
        <hr />
        <Disclosure.Panel>
          <ul className="p-3 divide-y overflow-y-scroll max-h-[40vh] ">
            {isLoading ? (
              <div className="py-4 w-full text-center font-semibold text-lg bg-slate-200  rounded-md">
                Loading ...
              </div>
            ) : (
              <>
                {payload?.data.length === 0 && (
                  <div className="bg-white text-center font-semibold">
                    No Data Found...
                  </div>
                )}
                {payload?.data.map((riwayat) => (
                  <li className="flex flex-col gap-2 py-2">
                    <div className="flex justify-between">
                      <div className="font-semibold text-md capitalize">
                        {riwayat?.izin?.nama_izin}
                      </div>
                      <div className="text-xs bg-warning p-1 rounded-md font-semibold capitalize">
                        {riwayat?.status}
                      </div>
                    </div>

                    <div className="text-sm">{riwayat?.keterangan}</div>
                    <div className="text-xs text-slate-700 text-right">
                      {formatDate(riwayat?.tanggal_mulai, "DD MMMM YYYY")} -{" "}
                      {formatDate(riwayat?.tanggal_selesai, "DD MMMM YYYY")}
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </Disclosure.Panel>
      </Disclosure>
    </>
  );
}
