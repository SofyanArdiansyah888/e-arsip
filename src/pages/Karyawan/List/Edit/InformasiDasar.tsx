import { FormInput, FormLabel, FormSelect } from "../../../../base-components/Form";

export default function InformasiDasar() {
    return (
      <>
        {/* NAMA LENGKAP */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="input-wizard-1">Nama Lengkap</FormLabel>
          <FormInput type="text" />
        </div>
  
        {/* JENIS KELAMIN */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="input-wizard-6">Jenis Kelamin</FormLabel>
          <FormSelect id="input-wizard-6">
            <option>Laki-Laki</option>
            <option>Perempuan</option>
          </FormSelect>
        </div>
  
        {/* TEMPAT LAHIR */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="input-wizard-2">Tempat Lahir</FormLabel>
          <FormInput type="text" />
        </div>
  
        {/* TANGGAL LAHIR */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="tanggal_lahir">Tanggal Lahir</FormLabel>
          <FormInput id="tanggal_lahir" type="text" />
        </div>
  
        {/* STATUS PERNIKAHAN */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="input-wizard-6">Status Pernikahan</FormLabel>
          <FormSelect id="input-wizard-6">
            <option>Menikah</option>
            <option>Belum Menikah</option>
          </FormSelect>
        </div>
  
        {/* JUMLAH ANAK */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="jumlah_anak">Jumlah Anak</FormLabel>
          <FormInput id="jumlah_anak" type="number" />
        </div>
  
        {/* GOLONGAN DARAH */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="input-wizard-6">Golongan Darah</FormLabel>
          <FormSelect id="input-wizard-6">
            <option>A</option>
            <option>B</option>
            <option>AB</option>
            <option>O</option>
          </FormSelect>
        </div>
  
        {/* AGAMA */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="agama">Agama</FormLabel>
          <FormSelect id="agama">
            <option>Islam</option>
            <option>Kristen Protestan</option>
            <option>Kristen Katolik</option>
            <option>Hindu</option>
            <option>Budha</option>
            <option>Konghuchu</option>
            <option>Lainnya</option>
          </FormSelect>
        </div>
      </>
    );
  }