import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./slices/couterSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        counter1: counterSlice,
        user1: userSlice,
    },
})