import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../index";
import {PersonState} from "./interfaces";
import API from "../../API/person";

const personSlice = createSlice({
    name: "person",
    initialState: {
        data: [],
        students: [],
        isLoading: false,
        error: "",
    } as PersonState,
    reducers: {
        setData(state, {payload}) {
            state.data = payload;
        },
        cleanData(state) {
            state.data = [];
        },
        setStudents(state, {payload}) {
            state.students = payload;
        },
        cleanStudents(state) {
            state.students = [];
        },
        changeIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        changeError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export default personSlice.reducer;
export const {
    setData,
    setStudents,
    cleanStudents,
    cleanData,
    changeIsLoading,
    changeError,
} = personSlice.actions;

export const getStudents = (): AppThunk => async (
    dispatch
) => {
    dispatch(changeIsLoading(true));

    try {
        const { data } = await API.getStudents();

        dispatch(setStudents(data));
        dispatch(changeError(""));
        dispatch(changeIsLoading(false));
    } catch (e) {
        dispatch(changeError("Ошибка получения списка студентов"));
        dispatch(changeIsLoading(false));
    }
};