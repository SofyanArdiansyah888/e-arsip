import { FormInput, FormLabel, FormSelect } from "../../../../base-components/Form";

export default function InformasiPekerjaan() {
    return (
      <>
        {/* TANGGAL BERGABUNG */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="input-wizard-1">Tanggal Bergabung</FormLabel>
          <FormInput type="text" />
        </div>
  
        {/* PENDIDIKAN TERAKHIR */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="input-wizard-6">Pendidikan Terakhir</FormLabel>
          <FormSelect id="input-wizard-6">
            <option value="">Pilih pendidikan terakhir</option>
            <option value="3">Putus SD</option>
            <option value="4">SD / sederajat</option>
            <option value="5">SMP / sederajat</option>
            <option value="6">SMA / sederajat</option>
            <option value="7">Paket A</option>
            <option value="8">Paket B</option>
            <option value="9">Paket C</option>
            <option value="20">D1</option>
            <option value="21">D2</option>
            <option value="22">D3</option>
            <option value="23">D4</option>
            <option value="30">S1</option>
            <option value="35">S2</option>
            <option value="36">S2 Terapan</option>
            <option value="40">S3</option>
            <option value="41">S3 Terapan</option>
            <option value="99">Lainnya</option>
          </FormSelect>
        </div>
  
        {/* NIK */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="nik">Nik</FormLabel>
          <FormInput type="text" />
        </div>
  
        {/* NIP */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="nip">NIP</FormLabel>
          <FormInput id="nip" type="text" />
        </div>
  
        {/* NPWP */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="npwp">NPWP</FormLabel>
          <FormInput id="npwp" type="text" />
        </div>
  
        {/* JABATAN */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="jabatan">Jabatan</FormLabel>
          <FormSelect id="jabatan">
            <option value="">Pilih Jabatan</option>
            <option value="1">Staf</option>
            <option value="3">Ketua Yayasan</option>
            <option value="4">Bendahara Yayasan</option>
            <option value="5">Sekretaris Yayasan</option>
            <option value="6">Rektor ITB Nobel Indonesia</option>
          </FormSelect>
        </div>
  
        {/* ATASAN LANGSUNG */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="atasan_langsung">Atasan Langsung</FormLabel>
          <FormInput id="atasan_langsung" type="text" />
        </div>
  
        {/* ROLE */}
        <div className="col-span-12 intro-y sm:col-span-6">
          <FormLabel htmlFor="input-wizard-6">Role</FormLabel>
          <FormSelect id="input-wizard-6">
            <option>Karyawan</option>
            <option>Pimpinan</option>
          </FormSelect>
        </div>
      </>
    );
  }