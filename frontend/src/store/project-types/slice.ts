import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../index";
import {ProjectState, DataType} from "./interfaces";
import API from "../../API/project-types";

const projectTypesSlice = createSlice({
    name: "projectTypes",
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    } as ProjectState,
    reducers: {
        setData(state, action: PayloadAction<DataType[]>) {
            state.data = action.payload;
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

export default projectTypesSlice.reducer;
export const {
    setData,
    changeIsLoading,
    changeError,
} = projectTypesSlice.actions;

export const getAllTypes = (): AppThunk => async (
    dispatch
) => {
    dispatch(changeIsLoading(true));

    try {
        const { data } = await API.getAllTypes();

        dispatch(setData(data));
        dispatch(changeError(""));
        dispatch(changeIsLoading(false));
    } catch (e) {
        dispatch(changeError("Ошибка получения данных"));
        dispatch(changeIsLoading(false));
    }
};
