import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./slices/couterSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
    },
})