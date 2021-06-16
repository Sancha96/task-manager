import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../index";
import {ProjectState, DataType} from "./interfaces";
import API from "../../API/stage";

const stageSlice = createSlice({
    name: "stage",
    initialState: {
        data: [],
        item: null,
        isLoading: false,
        error: "",
    } as ProjectState,
    reducers: {
        setData(state, action: PayloadAction<DataType[]>) {
            state.data = action.payload;
        },
        setItem(state, action: PayloadAction<DataType[]>) {
            state.item = action.payload;
        },
        cleanData(state) {
            state.data = [];
        },
        changeIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        changeError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export default stageSlice.reducer;
export const {
    setItem,
    setData,
    changeIsLoading,
    changeError,
} = stageSlice.actions;

export const getStagesByTypeId = (id: any): AppThunk => async (
    dispatch
) => {
    dispatch(changeIsLoading(true));

    try {
        const { data } = await API.getStagesByTypeId(id);

        dispatch(setData(data));
        dispatch(changeError(""));
        dispatch(changeIsLoading(false));
    } catch (e) {
        dispatch(changeError("Ошибка получения данных"));
        dispatch(changeIsLoading(false));
    }
};

export const getStageById = (id: any): AppThunk => async (
    dispatch
) => {
    dispatch(changeIsLoading(true));

    try {
        const { data } = await API.getStageById(id);

        dispatch(setItem(data));
        dispatch(changeError(""));
        dispatch(changeIsLoading(false));
    } catch (e) {
        dispatch(changeError("Ошибка получения данных"));
        dispatch(changeIsLoading(false));
    }
};