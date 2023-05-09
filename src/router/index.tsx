import { useRoutes } from "react-router-dom";
import SideMenu from "@/layouts/SideMenu";
import Dashboard from "@/pages/Dashboard";
import Karyawan from "@/pages/Karyawan/List";
import DetailKaryawan from "@/pages/Karyawan/List/Detail";
import CreateKaryawan from "@/pages/Karyawan/List/Edit";
import HariLibur from "@/pages/MasterData/HariLibur";
import MasterIzin from "@/pages/MasterData/Izin";
import Jabatan from "@/pages/MasterData/Jabatan";
import Divisi from "@/pages/MasterData/Level";
import MasterPotongan from "@/pages/Penggajian/Potongan";
import Shift from "@/pages/MasterData/Shift";
import MasterTunjangan from "@/pages/Penggajian/Tunjangan";
import Departemen from "@/pages/MasterData/UnitKerja";
import RiwayatCuti from "@/pages/Karyawan/RiwayatCuti/index";
import RiwayatIzin from "@/pages/Karyawan/RiwayatIzin/index";
import Absensi from "@/pages/Karyawan/Absensi";
import DetailAbsensi from "@/pages/Karyawan/AbsensiDetail/AbsensiDetail";
import Pengaturan from "@/pages/Pengaturan";
import PATHNAME from "./path";
import Error404Page from "@/pages/Error/404";
import Error500Page from "@/pages/Error/500";
import Error401Page from "@/pages/Error/401";
import KaryawanSchedule from "@/pages/Karyawan/Schedule/Schedule";
import Login from "@/pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import Penggajian from "@/pages/Penggajian/Penggajian/Penggajian";
import SlipGaji from "@/pages/Penggajian/SlipGaji/SlipGaji";
import DetailSlipGaji from "@/pages/Penggajian/SlipGaji/Detail/DetailSlipGaji";
import Beranda from "@/pages/Frontend/Beranda";
import Pencarian from "@/pages/Frontend/Pencarian";

function Router() {
  const routes = [
    {
      path: PATHNAME.BASE,
      element: <Beranda />
    },
    {
      path: PATHNAME.BASE,
      element: (
        <ProtectedRoute>
          <SideMenu />
        </ProtectedRoute>
      ),
      children: [
        {
          path: PATHNAME.DASHBOARD,
          element: <Dashboard />,
        },
        // MASTER DATA
        {
          path: PATHNAME.MASTER_JABATAN,
          element: <Jabatan />,
        },
        {
          path: PATHNAME.MASTER_IZIN,
          element: <MasterIzin />,
        },
        {
          path: PATHNAME.MASTER_POTONGAN,
          element: <MasterPotongan />,
        },
        {
          path: PATHNAME.MASTER_TUNJANGAN,
          element: <MasterTunjangan />,
        },
        {
          path: PATHNAME.PENGATURAN,
          element: <Pengaturan />,
        },
        {
          path: PATHNAME.MASTER_LEVEL,
          element: <Divisi />,
        },
        {
          path: PATHNAME.MASTER_UNIT_KERJA,
          element: <Departemen />,
        },
        {
          path: PATHNAME.MASTER_SHIFT,
          element: <Shift />,
        },
        {
          path: PATHNAME.MASTER_HARI_LIBUR,
          element: <HariLibur />,
        },

        // KARYAWAN
        {
          path: PATHNAME.KARYAWAN,
          element: <Karyawan />,
        },
        {
          path: PATHNAME.KARYAWAN_ABSEN,
          element: <Absensi />,
        },
        {
          path: PATHNAME.KARYAWAN_ABSEN_DETAIL,
          element: <DetailAbsensi />,
        },
        {
          path: PATHNAME.KARYAWAN_SCHEDULE,
          element: <KaryawanSchedule />,
        },

        {
          path: "karyawan/create",
          element: <CreateKaryawan />,
        },
        {
          path: "profil",
          element: <DetailKaryawan />,
        },
        {
          path: PATHNAME.KARYAWAN_DETAIL,
          element: <DetailKaryawan />,
        },
        {
          path: PATHNAME.KARYAWAN_CUTI,
          element: <RiwayatCuti />,
        },
        {
          path: PATHNAME.KARYAWAN_IZIN,
          element: <RiwayatIzin />,
        },
        {
          path: PATHNAME.PENGGAJIAN,
          element: <Penggajian />,
        },
        {
          path: PATHNAME.PENGGAJIAN_SLIP_GAJI,
          element: <SlipGaji />,
        },
        {
          path: PATHNAME.PENGGAJIAN_DETAIL_SLIP_GAJI,
          element: <DetailSlipGaji />,
        },
      ],
    },
    {
      path: PATHNAME.LOGIN,
      element: <Login />,
    },
    {
      path: PATHNAME.BERANDA,
      element: <Beranda />
    },
    {
      path: PATHNAME.PENCARIAN,
      element: <Pencarian />
    },
    {
      path: PATHNAME.ALL,
      element: <Error404Page />,
    },
    {
      path: PATHNAME.PAGE500,
      element: <Error500Page />,
    },
    {
      path: PATHNAME.PAGE401,
      element: <Error401Page />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
