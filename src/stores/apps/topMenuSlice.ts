import { createSlice } from "@reduxjs/toolkit";
import { icons } from "lucide";
import { RootState } from "../store";


export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface TopMenuState {
  menu: Array<Menu>;
}

const initialState: TopMenuState = {
  menu: [
    {
      icon: "Activity",
      pathname: "/top-menu/page-1",
      title: "Page 1",
    },
    {
      icon: "Activity",
      pathname: "/top-menu/page-2",
      title: "Page 2",
    },
  ],
};

export const topMenuSlice = createSlice({
  name: "topMenu",
  initialState,
  reducers: {},
});

export const selectTopMenu = (state: RootState) => state.topMenu.menu;

export default topMenuSlice.reducer;
