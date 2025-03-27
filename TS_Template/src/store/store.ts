import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
