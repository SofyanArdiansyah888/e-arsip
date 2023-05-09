import Button from "../../../../base-components/Button";
import { FormInput, FormLabel, FormSelect, FormTextarea } from "../../../../base-components/Form";

export default function Kontak() {
    return (
      <>
        <div className="col-span-6 intro-y sm:col-span-6 flex flex-col gap-3">
          {/* NOMOR TELEPON */}
          <div>
            <FormLabel htmlFor="input-wizard-1">Nomor Telepon</FormLabel>
            <FormInput type="text" />
          </div>
  
          {/* EMAIL */}
          <div>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput id="email" type="text" />
          </div>
  
          {/* ALAMAT LENGKAP */}
          <div>
            <FormLabel htmlFor="nip">Alamat Lengkap</FormLabel>
            <FormTextarea id="nip" />
          </div>
  
          {/* STATUS KARYAWAN */}
          <div>
            <FormLabel htmlFor="input-wizard-6">Status Karyawan</FormLabel>
            <FormSelect id="input-wizard-6">
              <option>Aktif</option>
              <option>Tidak Aktif</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-span-6 intro-y sm:col-span-6 mx-auto">
          <div className="bg-slate-300 p-4 rounded-full h-48 w-48"> </div>
  
          <Button variant="primary" className="mt-4 w-full">
            Upload
          </Button>
        </div>
      </>
    );
  }
  