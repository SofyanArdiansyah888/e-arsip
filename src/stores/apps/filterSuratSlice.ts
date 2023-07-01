import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IFilterSurat {
    filter: {
        tanggal_masuk: undefined | string,
        nomor_agenda: undefined | string,
        disposisi: undefined | string,
        posisi: undefined | string,
    }
}

const initialState: IFilterSurat = {
    filter: {
        tanggal_masuk: undefined,
        nomor_agenda: undefined,
        disposisi: undefined,
        posisi: undefined
    }
};

export const filterSuratSlice = createSlice({
    name: "filterSurat", initialState, reducers: {
        setFilterSurat: (state, {payload}: PayloadAction<IFilterSurat>) => {
            state.filter = {
                ...state.filter, ...payload.filter
            }
        },
    },
});

export const {setFilterSurat} = filterSuratSlice.actions;

export default filterSuratSlice.reducer;
