import SideMenu from "@/layouts/SideMenu";
import Dashboard from "@/pages/Dashboard";
import Error401Page from "@/pages/Error/401";
import Error404Page from "@/pages/Error/404";
import Error500Page from "@/pages/Error/500";
import Beranda from "@/pages/Frontend/Beranda";
import Pencarian from "@/pages/Frontend/Pencarian";
import Login from "@/pages/Login";
import Surat from "@/pages/Dashboard/Surat/surat";
import User from "@/pages/Dashboard/User/user";
import { useRoutes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import PATHNAME from "./path";
import ProfilPejabat from "@/pages/Frontend/ProfilPejabat";
import MalukuUtara from "@/pages/Frontend/MalukuUtara";
import StrukturOrganisasi from "@/pages/Frontend/StrukturOrganisasi";

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
      path: PATHNAME.PROFIL_PEJABAT,
      element: <ProfilPejabat />
    },
    {
      path: PATHNAME.MALUKU_UTARA,
      element: <MalukuUtara />
    },
    {
      path: PATHNAME.STRUKTUR_ORGANISASI,
      element: <StrukturOrganisasi />
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
