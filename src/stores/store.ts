import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import colorSchemeReducer from "./apps/colorSchemeSlice";
import darkModeReducer from "./apps/darkModeSlice";
import notificationReducer from './apps/notificationSlice';
import sideMenuReducer from "./apps/sideMenuSlice";
import simpleMenuReducer from "./apps/simpleMenuSlice";
import topMenuReducer from "./apps/topMenuSlice";
import filterSuratReducer from './apps/filterSuratSlice'

export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer,
        colorScheme: colorSchemeReducer,
        sideMenu: sideMenuReducer,
        simpleMenu: simpleMenuReducer,
        topMenu: topMenuReducer,
        notification: notificationReducer,
        filterSurat: filterSuratReducer

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
