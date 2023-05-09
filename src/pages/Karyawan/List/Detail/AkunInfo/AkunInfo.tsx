import { KaryawanEntity } from "@/models/Karyawan.entity";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import Button from "@/base-components/Button";
import FormInput from "@/base-components/Form/FormInput";
import FormLabel from "@/base-components/Form/FormLabel";
import Tab from "@/base-components/Headless/Tab";
import FormAkun from "./FormAkun";
import FormBank from "./FormBank";

export default function AkunInfo() {
  const selectedKaryawan = useSelector(
    (state: RootState) => state.selectedKaryawan.karyawan
  );
  
  return (
    <Tab.Panel>
      <div className="grid grid-cols-12 gap-6">
        <FormAkun selectedKaryawan={selectedKaryawan} />
        <FormBank selectedKaryawan={selectedKaryawan} />
      </div>
    </Tab.Panel>
  );
}



