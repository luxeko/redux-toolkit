import {
    INCREMENT,
    DECREMENT,
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_ERROR,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR
} from "../type/countType";
import axios from "axios";

export const increaseCounter = () => {
    return {
        type: INCREMENT,
        payload: {name: "facebook", account: "luxeko"}
    }
}

export const decreaseCounter = () => {
    return {
        type: DECREMENT,
    }
}

export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        dispatch(fetchUserRequest())
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
            if (res && res.status === 200) {
                const data = res.data ? res.data : []
                dispatch(fetchUserSuccess(data))
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchUserError())
        }
    }
}

export const fetchUserRequest = () => {
    return {
        type: FETCH_REQUEST
    }
}
export const fetchUserSuccess = (data) => {
    return {
        type: FETCH_SUCCESS,
        data: data
    }
}
export const fetchUserError = () => {
    return {
        type: FETCH_ERROR
    }
}
export const createUserRequest = () => {
    return {
        type: CREATE_USER_REQUEST
    }
}
export const createUserSuccess = () => {
    return {
        type: CREATE_USER_SUCCESS
    }
}
export const createUserError = () => {
    return {
        type: CREATE_USER_ERROR
    }
}
export const createNewUserRedux = (user) => {
    return async (dispatch, getState) => {
        dispatch(createUserRequest())
        try {
            const res = await axios.post("https://jsonplaceholder.typicode.com/posts", user)
            if (res && res.status === 200) {
                dispatch(createUserSuccess())
                dispatch(fetchAllUsers())
            }
        } catch (error) {
            console.log(error)
            dispatch(createUserError())
        }
    }
}