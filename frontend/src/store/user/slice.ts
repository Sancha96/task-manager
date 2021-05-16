import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../index";
import {UserState, DataType} from "./interfaces";
import API from "../../API/user";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: {},
        isLoading: false,
        error: "",
    } as UserState,
    reducers: {
        setData(state, {payload}: PayloadAction<DataType>) {
            state.data = payload;
        },
        cleanData(state) {
            state.data = {};
        },
        changeIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        changeError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export default userSlice.reducer;
export const {
    setData,
    cleanData,
    changeIsLoading,
    changeError,
} = userSlice.actions;

export const register = (email: string, password: string): AppThunk => async (
    dispatch
) => {
    dispatch(changeIsLoading(true));

    try {
        const { data } = await API.register({email, username: email.split("@")[0], password});

        dispatch(setData(data));
        dispatch(changeError(""));
        dispatch(changeIsLoading(false));
    } catch (e) {
        dispatch(changeError("Ошибка входа"));
        dispatch(changeIsLoading(false));
    }
};