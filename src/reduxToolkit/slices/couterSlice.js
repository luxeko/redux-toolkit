import {createSlice} from '@reduxjs/toolkit'
// First, create the thunk

const initialState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: 'counter_1',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount} = counterSlice.actions
export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount))
    }, 1000)
}
export const selectCount = (state) => state.counter1.value
export default counterSlice.reducer