import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../index";
import {AuthState, DataType} from "./interfaces";
import API from "../../API/auth";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: {},
        isLoading: false,
        error: "",
    } as AuthState,
    reducers: {
        setData(state, {payload}: PayloadAction<DataType>) {
            state.data = payload;
            console.log('111111')
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

export default authSlice.reducer;
export const {
    setData,
    cleanData,
    changeIsLoading,
    changeError,
} = authSlice.actions;

export const login = (email: string, password: string): AppThunk => async (
    dispatch
) => {
    dispatch(changeIsLoading(true));

    try {
        const { data } = await API.login({email, username: email.split("@")[0], password});

        dispatch(setData(data));
        dispatch(changeError(""));
        dispatch(changeIsLoading(false));
    } catch (e) {
        dispatch(changeError("Ошибка входа"));
        dispatch(changeIsLoading(false));
    }
};

export const logout = (): AppThunk => async (dispatch) => {
    try {
        dispatch(cleanData());
    } catch (e) {
        console.log(e);
    }
};
