import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import colorSchemeReducer from "./apps/colorSchemeSlice";
import darkModeReducer from "./apps/darkModeSlice";
import notificationReducer from './apps/notificationSlice';
import sideMenuReducer from "./apps/sideMenuSlice";
import simpleMenuReducer from "./apps/simpleMenuSlice";
import topMenuReducer from "./apps/topMenuSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
    sideMenu: sideMenuReducer,
    simpleMenu: simpleMenuReducer,
    topMenu: topMenuReducer,
    notification: notificationReducer,
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
