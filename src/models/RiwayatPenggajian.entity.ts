/**
 * Homeflow Technologies | RiwayatPenggajianEntity.
 *
 * @property karyawan_id
 * @property total_tunjangan
 * @property total_potongan
 * @property detail_tunjangan
 * @property detail_potongan
 * @property gaji_pokok
 * @property total_gaji
 * @property periode
 *
 * @create RiwayatPenggajianEntity
 */

import { KaryawanEntity } from "./Karyawan.entity";
import { PotonganEntity } from "./Potongan.entity";
import { TunjanganEntity } from "./Tunjangan.entity";

export interface RiwayatPenggajianEntity {
  id:number;
  karyawan_id: number;
  karyawan: KaryawanEntity;
  total_gaji: number;
  gaji_pokok: number;
  detail_potongan: PotonganEntity[];
  detail_tunjangan: TunjanganEntity[];
  total_potongan: number;
  total_tunjangan: number;
  periode: string;
}
