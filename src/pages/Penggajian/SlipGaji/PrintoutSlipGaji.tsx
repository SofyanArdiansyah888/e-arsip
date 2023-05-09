import { formatCurrency, formatRupiah } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import logoUrl from "@/assets/images/logo.png";
import dayjs from "dayjs";
import { RiwayatPenggajianEntity } from "@/models/RiwayatPenggajian.entity";

interface IPrintoutSlipGaji {
  data: RiwayatPenggajianEntity | undefined;
}

const PrintoutSlipGaji = React.forwardRef<HTMLDivElement, IPrintoutSlipGaji>(
  (props, ref) => {
    // const [tunjangans, setTunjangans] = useState<IItem[]>([]);
    // const [potongans, setPotongans] = useState<IItem[]>([]);
    const [totalPotongan, setTotalPotongan] = useState<number>(0);
    const [totalTunjangan, setTotalTunjangan] = useState<number>(0);

    useEffect(() => {
        setTotalPotongan(0)
        setTotalTunjangan(0)
      if (props.data) {
        const { detail_potongan, detail_tunjangan } = props.data;
        
        detail_potongan.map((detail) => {
          setTotalPotongan((potongan) => potongan + Number(detail.nominal));

        });
        detail_tunjangan.map((detail) => {
          setTotalTunjangan((tunjangan) => tunjangan + Number(detail.nominal));
        });
      }
      () => {
        return props.data
      }
    }, [props.data]);

    return (
      <div
        ref={ref}
        className="w-[420px] h-auto border-black border-2 border-dotted p-4"
      >
        {/* HEADER */}
        <div className="text-center">
          <h3 className="uppercase">Yayasan Pendidikan Nobel Indonesia</h3>
          <h5>Nobel Indonesia Makassar</h5>
          <h6 className="font-bold">Slip Gaji/Honor</h6>
        </div>

        {/* NAMA KARYAWAN */}
        <div className="mt-4 mb-2 text-xs">
          <p>Nama Karyawan : {props.data?.karyawan.nama_lengkap} </p>
          <p>Jabatan : {props.data?.karyawan.jabatan?.nama_jabatan} </p>
          <p>Periode : {props.data?.periode} </p>
          <div className="border-2 border-solid border-black mt-4" />
          <div className="border-[1px] border-solid border-black mt-1" />
        </div>

        <div>
          <Item
            title={"Gaji Pokok"}
            amount={props?.data ? props.data.gaji_pokok : 0}
            isBold={false}
          />
          <h6 className="font-semibold my-2">Tunjangan</h6>
          {props.data?.detail_tunjangan.map((tunjangan) => (
            <Item title={tunjangan.nama_tunjangan} amount={Number(tunjangan.nominal)} isBold={false}  />
          ))}
          <div className="border-[1px] border-solid border-black my-2" />
          <Item title={"Jumlah"} amount={totalTunjangan} isBold={false} />
          <h6 className="font-semibold my-2 text-sm">Potongan</h6>
          {props.data?.detail_potongan.map((potongan) => (
            <Item title={potongan.nama_potongan} amount={Number(potongan.nominal)} isBold={false}  />
          ))}
          <div className="border-[1px] border-solid border-black my-2" />
          <Item title={"Jumlah"} amount={totalPotongan} isBold={false} />

          <Item
            title={"Gaji Bersih"}
            amount={props?.data ? props.data.total_gaji : 0}
            isBold={true}
            className="my-2"
          />
          <p className="capitalize text-xs">
            (Delapan Juta Lima ratus Lima puluh Ribu Rupiah)
          </p>
          <div className="flex flex-row mt-8 text-xs ">
            <div className="basis-1/2 px-4 relative ">
              <img
                src={logoUrl}
                className="opacity-10 absolute -right-14 -top-10"
              />
            </div>
            <div>
              <p>Makassar, {dayjs().format("DD MMMM YYYY")}</p>
              <p>Yang menyerahkan,</p>
              <p className="mb-20 font-semibold">Personalia</p>
              <p className="font-semibold text-md">Mufti Heriyanti, S.AB.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

interface IItem {
  title: string;
  amount: number;
  isBold: boolean;
  className?: string;
}

function Item({ title, amount, isBold, className }: IItem) {
  return (
    <div className={` flex flex-row w-full ${className} text-xs`}>
      <div className={`${isBold ? "font-semibold" : ""} flex-1`}>{title}</div>
      <div
        className={`${
          isBold ? "font-semibold" : ""
        } flex-1 flex justify-between`}
      >
        <p>: Rp.</p>
        <p>{formatCurrency(amount)}</p>
      </div>
    </div>
  );
}

export default PrintoutSlipGaji;
