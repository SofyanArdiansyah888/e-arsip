import { Link } from "react-router-dom";
import {
  FormInput,
  FormSwitch
} from "@/base-components/Form";
import Lucide from "@/base-components/Lucide";
import TomSelect from "@/base-components/TomSelect";
import { BackButton, SimpanButton } from "@/components/Buttons/Buttons";

function PengaturanAbsen() {

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Pengaturan Absensi</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Layout */}
          <div className="p-5 py-8 box">
            <CheckboxHari hari="senin" />
            <CheckboxHari hari="selasa" />
            <CheckboxHari hari="rabu" />
            <CheckboxHari hari="kamis" />
            <CheckboxHari hari="jumat" />
            <CheckboxHari hari="sabtu" />
            <CheckboxHari hari="minggu" />
            <div className="flex mt-8 mb-4 gap-4">
              <div className="font-semibold">
                Masa tenggang keterlambatan dari jam masuk (Menit)
              </div>
              <div >
                <FormInput type="number" />
              </div>
            </div>

            <div className="mt-8 text-right">
              <Link to="/absen">
                <BackButton className="mr-1 mt-2"  />
              </Link>
              <SimpanButton />
            </div>
          </div>
          {/* END: Form Layout */}
        </div>
      </div>
    </>
  );
}

function CheckboxHari({ hari }: { hari: string }) {
  return (
    <div className="flex gap-3 my-3">
      <div className="flex gap-3 flex-1">
        <FormSwitch>
          <FormSwitch.Input type="checkbox" />
        </FormSwitch>
        <div className="mt-2 capitalize">{hari}</div>
      </div>

      <div className="flex-1">
        <TomSelect
          // value={categories}
          // onChange={setCategories}
          className="w-full"
        >
          <option value="1">08:00</option>
          <option value="1">09:00</option>
          <option value="1">10:00</option>
          <option value="1">11:00</option>
          <option value="1">12:00</option>
        </TomSelect>
      </div>

      <div className="text-xl">
        <Lucide icon="Minus" className="mx-auto mt-1"></Lucide>
      </div>

      <div className="flex-1">
        <TomSelect
          // value={categories}
          // onChange={setCategories}
          className="w-full"
        >
          <option value="1">08:00</option>
          <option value="1">09:00</option>
          <option value="1">10:00</option>
          <option value="1">11:00</option>
          <option value="1">12:00</option>
        </TomSelect>
      </div>
    </div>
  );
}

export default PengaturanAbsen;
