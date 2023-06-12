import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Layout from "./Layouts";
import { usePost } from "@/hooks/useApi";
import { useAppDispatch } from "@/stores/hooks";
import { setNotification } from "@/stores/apps/notificationSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    nama: yup.string().required(),
    email: yup.string().required(),
    subjek: yup.string().required(),
    pengaduan: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function Pengaduan() {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    setError,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading } = usePost<FormData>({
    endpoint: "pengaduan",
    name: "pengaduan",
    onSuccessCallback: () => {
      reset()
      alert('Berhasil Mengirim Pengaduan')
          // dispatch(setNotification({
          //   message: 'Berhasil Mengirim Pengaduan',
          //   status: 'success'
          // }))
    },
    onErrorCallback: (error: any) => {
      alert('Gagal Mengirim Pengaduan')
      // dispatch(setNotification({
      //   message: 'Gagal Mengirim Pengaduan',
      //   status: 'error'
      // }))
    },
  });

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.padding = "0";
    body.style.background = "white";
    return () => {
      body.style.background = "#0f172a";
      body.style.padding = "16px";
    };
  }, []);
  return (
    <Layout>
      <Navbar />
      <section
        id="sambutan"
        className="pb-48 pt-40 text-center bg-zinc-50  h-auto min-h-screen  lg:px-48"
      >
        <h1 className="text-3xl font-semibold ">Pengaduan</h1>
        <div className="border-b-4 border-gray-200 w-[350px] mb-20 mt-2 mx-auto"></div>

<form onSubmit={handleSubmit((data) => {
mutate({...data})
})}>
        <div className="max-w-xl mx-auto px-4 py-6 bg-white rounded-md shadow-md space-y-4 text-left">
          <div>
            <h2 className="text-lg font-semibold">LAYANAN PENGADUAN</h2>
            <p className="text-xs text-slate-500 mt-4">
              Jika anda memiliki pengaduan terkait layanan kami, silahkan
              mengisi form pengaduan berikut. Kami akan merespon pengaduan anda
            </p>
          </div>

          <div className="text-left">
            <label
              htmlFor="nama"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama Anda
            </label>
            <input
              type="text"
              id="nama"
              {...register('nama')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="text-left">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email / No Hp
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              {...register('email')}
            />
          </div>

          <div className="text-left">
            <label
              htmlFor="subjek"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subjek
            </label>
            <input
              type="text"
              id="subjek"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              {...register('subjek')}
            />
          </div>

          <div className="text-left">
            <label
              htmlFor="pengaduan"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pengaduan Anda
            </label>
            <textarea
              id="pengaduan"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              {...register('pengaduan')}
            />
          </div>
          <button className="bg-green-600 text-white font-semibold px-2 py-2 block w-full rounded-md">{isLoading ? "Loading..." : "Kirim Pesan"}</button>
        </div>
        </form>
      </section>
    </Layout>
  );
}
