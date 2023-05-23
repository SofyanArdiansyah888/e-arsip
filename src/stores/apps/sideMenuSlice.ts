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
      icon: "User",
      pathname: PATHNAME.USER,
      title: "User",
    },
    {
      icon: "Mail",
      pathname: PATHNAME.SURAT,
      title: "Surat",
    },
  ],
};

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
