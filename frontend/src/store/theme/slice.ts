import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ProjectState, DataType} from "./interfaces";
import {THEMES} from "../../constants/themes";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: THEMES.DARK,
    } as ProjectState,
    reducers: {
        setTheme(state, action: any) {
            state.theme = action.payload;
        },
    },
});

export default themeSlice.reducer;
export const {
    setTheme
} = themeSlice.actions;
