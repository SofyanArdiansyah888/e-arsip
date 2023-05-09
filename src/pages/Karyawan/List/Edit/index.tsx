import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../../base-components/Button";
import { BackButton } from "../../../../components/Buttons/Buttons";

import InformasiDasar from "./InformasiDasar";
import InformasiPekerjaan from "./InformasiPekerjaan";
import Kontak from "./Kontak";
const initialState = { step: 1 };
const reducer = (state: any, action: any) => {
  let step = 0;

  switch (action.type) {
    case "NEXT":
      step = state.step + 1;
      if (step > 3) return { step: 3 };
      return { step };
    case "PREV":
      step = state.step - 1;
      if (step < 1) return { step: 1 };
      return { step };

    default:
      return state;
  }
};

function CreateKaryawan() {
  const [{ step }, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-lg font-medium intro-y">Tambah Karyawan</h2>
        <Link to="/karyawan">
          <BackButton />
        </Link>
      </div>

      <div className="py-10 mt-5 intro-y box sm:py-20">
        <div className="flex justify-center">
          <Button
            variant={step === 1 ? "primary" : "soft-dark"}
            className="w-10 h-10 mx-2 rounded-full intro-y"
          >
            1
          </Button>
          <Button
            variant={step === 2 ? "primary" : "soft-dark"}
            className="w-10 h-10 mx-2 rounded-full intro-y"
          >
            2
          </Button>
          <Button
            variant={step === 3 ? "primary" : "soft-dark"}
            className="w-10 h-10 mx-2 rounded-full intro-y"
          >
            3
          </Button>
        </div>
        <div className="px-5 mt-10">
          <div className="text-lg font-medium text-center">
            Buat Karyawan Baru
          </div>
          <div className="mt-2 text-center text-slate-500">
            Silahkan isi form yang telah tersedia, tanda <strong>*</strong>{" "}
            merupakan input yang harus diisi
          </div>
        </div>
        <div className="px-5 pt-10 mt-10 border-t sm:px-20 border-slate-200/60 dark:border-darkmode-400">
          <div className="text-base font-medium">Informasi Dasar</div>
          <div className="grid grid-cols-12 gap-4 mt-5 gap-y-5">
            {step === 1 ? (
              <InformasiDasar />
            ) : step === 2 ? (
              <InformasiPekerjaan />
            ) : (
              <Kontak />
            )}

            <div className="flex items-center justify-center col-span-12 mt-12 intro-y sm:justify-end">
              {step > 1 && (
                <Button
                  variant="outline-primary"
                  className="w-24"
                  onClick={() => dispatch({ type: "PREV" })}
                >
                  Previous
                </Button>
              )}

              {step < 3 ? (
                <Button
                  variant="primary"
                  className="w-24 ml-2"
                  onClick={() => dispatch({ type: "NEXT" })}
                >
                  Next
                </Button>
              ) : (
                <Button variant="primary" className="w-24 ml-2">
                  Simpan
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default CreateKaryawan;
