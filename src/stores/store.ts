import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import darkModeReducer from "./apps/darkModeSlice";
import colorSchemeReducer from "./apps/colorSchemeSlice";
import sideMenuReducer from "./apps/sideMenuSlice";
import simpleMenuReducer from "./apps/simpleMenuSlice";
import topMenuReducer from "./apps/topMenuSlice";
import notificationReducer from './apps/notificationSlice'
import selectedKaryawanReducer from './data/KarywanSlice';
export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
    sideMenu: sideMenuReducer,
    simpleMenu: simpleMenuReducer,
    topMenu: topMenuReducer,
    notification: notificationReducer,
    selectedKaryawan: selectedKaryawanReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
