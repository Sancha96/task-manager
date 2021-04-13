import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../index";
import {ProjectState, DataType} from "./interfaces";
import API from "../../API/project";

const projectSlice = createSlice({
    name: "project",
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

export default projectSlice.reducer;
export const {
    setData,
    changeIsLoading,
    changeError,
} = projectSlice.actions;

export const getProjects = (): AppThunk => async (
    dispatch
) => {
    // dispatch(changeIsLoading(true));

    try {
        const { data } = await API.getList();

        // dispatch(setData(data));
        // dispatch(changeError(""));
        // dispatch(changeIsLoading(false));
    } catch (e) {
        // dispatch(changeError("Ошибка получения данных"));
        // dispatch(changeIsLoading(false));
    }
};
