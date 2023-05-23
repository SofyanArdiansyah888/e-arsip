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
import User from "@/pages/User/user";
import Surat from "@/pages/Surat/surat";

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
          path: PATHNAME.USER,
          element: <User />,
        },
        {
          path: PATHNAME.SURAT,
          element: <Surat />,
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
