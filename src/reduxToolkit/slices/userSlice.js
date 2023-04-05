import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchAllPosts = createAsyncThunk(
    'posts/fetchAllPosts',
    async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
        return response.data
    }
)

export const getPostById = createAsyncThunk(
    'posts/createPots',
    async (postId, thunkAPI) => {
        // console.log(thunkAPI)
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        console.log(response)
        return response.data
    }
)

const initialState = {
    listPosts: [],
    isLoading: false,
    isError: false,
    isCreating: false
}
export const userSlice = createSlice({
    name: 'listPosts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllPosts.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.listPosts = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(getPostById.pending, (state, action) => {
                state.isCreating = true
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.isCreating = false
            })
            .addCase(getPostById.rejected, (state, action) => {
                state.isCreating = false
            })
    },
})

export default userSlice.reducer