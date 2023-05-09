import Button from "@/base-components/Button";
import Lucide from "@/base-components/Lucide";
import { BackButton } from "@/components/Buttons/Buttons";
import SkeletonTable from "@/components/Skeletons/SkeletonTable";
import { useGet } from "@/hooks/useApi";
import { GetDetailPayload } from "@/models/GenericPayload";
import { RiwayatPenggajianEntity } from "@/models/RiwayatPenggajian.entity";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DetailSlipGajiTable from "./DetailSlipGajiTable";
import PriontoutSlipGaji from "../PrintoutSlipGaji";
import TambahPotongan from "./TambahPotongan";
import TambahTunjangan from "./TambahTunjangan";
import { useReactToPrint } from "react-to-print";
function DetailSlipGaji() {
  const { id } = useParams();
  const [isTambahTunjangan, setIsTambahTunjangan] = useState(false);
  const [isTambahPotongan, setIsTambahPotongan] = useState(false);

  const { data, isLoading } = useGet<GetDetailPayload<RiwayatPenggajianEntity>>(
    {
      name: "slip-gaji-detail",
      endpoint: `riwayat-penggajians/${id}`,
    }
  );
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current
  })
  return (
    <>
      <div className="mx-8 items-center justify-center  hidden">
        <PriontoutSlipGaji ref={printRef} data={data?.data} />
      </div>
      <div className="flex flex-nowrap justify-between mt-10">
        <h2 className=" text-lg font-medium intro-y">Detail Slip Gaji</h2>
        <div className=" flex gap-2 ml-auto">
          <BackButton onClick={() => history.back()} />

          <Button
            variant="facebook"
            size="sm"
            onClick={() => setIsTambahTunjangan(true)}
          >
            <Lucide icon="PlusCircle" className="mr-2" />
            Tambah Tunjangan
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsTambahPotongan(true)}
          >
            <Lucide icon="PlusCircle" className="mr-2" />
            Tambah Potongan
          </Button>

          <Button variant="primary" size="sm" onClick={handlePrint}>
            <Lucide icon="Printer" className="mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-5">
        {!isLoading ? (
          <DetailSlipGajiTable data={data?.data} />
        ) : (
          <SkeletonTable />
        )}
      </div>
      <TambahTunjangan
        isModal={isTambahTunjangan}
        handleCancel={() => setIsTambahTunjangan(false)}
        riwayatPenggajian={data?.data}
      />
      <TambahPotongan
        isModal={isTambahPotongan}
        handleCancel={() => setIsTambahPotongan(false)}
        riwayatPenggajian={data?.data}
      />
    </>
  );
}

export default DetailSlipGaji;
