import {
    Action,
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ThunkAction } from "redux-thunk";
import authSlice from "./auth/slice";
import projectSlice from "./project/slice";
import personSlice from "./person/slice";
import userSlice from "./user/slice";
import stageSlice from "./stage/slice";
import projectTypesSlice from "./project-types/slice";
import taskSlice from "./task/slice";
import skillSlice from "./skill/slice";
import themeSlice from "./theme/slice";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth"],
};

const rootReducer = combineReducers({
    auth: authSlice,
    project: projectSlice,
    person: personSlice,
    user: userSlice,
    stage: stageSlice,
    projectTypes: projectTypesSlice,
    task: taskSlice,
    skill: skillSlice,
    theme: themeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, unknown, unknown, Action<string>>;

export { store, persistor };
