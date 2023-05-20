import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { icons } from "../../base-components/Lucide";
import PATHNAME from "../../router/path";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "LayoutDashboard",
      pathname: PATHNAME.DASHBOARD,
      title: "Dashboard",
    },


    {
      icon: "Coins",
      
      title: "Penggajian",
      subMenu: [
        {
          icon: "ChevronRight",
          pathname: PATHNAME.PENGGAJIAN,
          title: "Penggajian",
        },
        {
          icon: "ChevronRight",
          pathname: PATHNAME.MASTER_POTONGAN,
          title: "Potongan",
        },
        {
          icon: "ChevronRight",
          pathname: PATHNAME.MASTER_TUNJANGAN,
          title: "Tunjangan",
        },
      ],
    },
    {
      icon: "Settings",
      pathname: PATHNAME.PENGATURAN,
      title: "Pengaturan",
    },
  ],
};
// initialState.menu.sort((a, b) => {
//   if (typeof a === "object" && typeof b === "object") {
//     return a.title > b.title ? 1 : -1;
//   }
//   return 0;
// });

initialState.menu.map((menu: Menu | "divider") => {
  if (typeof menu === "object") {
    menu.subMenu?.sort((a, b) => {
      if (typeof a === "object" && typeof b === "object") {
        return a.title > b.title ? 1 : -1;
      }
      return 0;
    });
  }
});

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
