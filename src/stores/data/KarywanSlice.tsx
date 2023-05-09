import { KaryawanEntity } from "@/models/Karyawan.entity";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    karyawan: KaryawanEntity | undefined 
}

const initialState : IInitialState = {
    karyawan :  undefined
};

export const karyawanSlice = createSlice({
  initialState,
  name: "selectedKaryawan",
  reducers: {
    setSelectedKaryawan: (state, { payload }) => {
      state.karyawan = payload;
    },
  },
});

export const { setSelectedKaryawan } = karyawanSlice.actions;
export default karyawanSlice.reducer
