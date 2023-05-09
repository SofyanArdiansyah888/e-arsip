import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { icons } from "../../base-components/Lucide";

export interface INotification {
  message: string;
  status: "warning" | "error" | "success" | "";
}

const initialState: INotification = {
  message: "",
  status: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, { payload }: PayloadAction<INotification>) => {
        
      state.message = payload.message
      state.status = payload.status
      
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
