import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../index";
import {ProjectState, DataType} from "./interfaces";
import API from "../../API/project";

const projectSlice = createSlice({
    name: "project",
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

export default projectSlice.reducer;
export const {
    setItem,
    setData,
    changeIsLoading,
    changeError,
} = projectSlice.actions;

export const getProjects = (params: any): AppThunk => async (
    dispatch
) => {
    dispatch(changeIsLoading(true));

    try {
        const { data } = await API.getList(params);

        dispatch(setData(data));
        dispatch(changeError(""));
        dispatch(changeIsLoading(false));
    } catch (e) {
        dispatch(changeError("Ошибка получения данных"));
        dispatch(changeIsLoading(false));
    }
};

export const getProjectById = (id: any): AppThunk => async (
    dispatch
) => {
    dispatch(changeIsLoading(true));

    try {
        const { data } = await API.getById(id);

        dispatch(setItem(data));
        dispatch(changeError(""));
        dispatch(changeIsLoading(false));
    } catch (e) {
        dispatch(changeError("Ошибка получения данных"));
        dispatch(changeIsLoading(false));
    }
};

export const createProject = (body: any): AppThunk => async (
    dispatch
) => {
    dispatch(changeIsLoading(true));

    try {
        await API.create(body);

        dispatch(changeError(""));
        dispatch(changeIsLoading(false));
    } catch (e) {
        dispatch(changeError("Ошибка получения данных"));
        dispatch(changeIsLoading(false));
    }
};