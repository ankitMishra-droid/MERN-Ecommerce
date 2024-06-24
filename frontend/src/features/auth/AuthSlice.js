import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { signUp, login, forgotPassword,getCuurentUser, updateProfile, logoutUser } from "./AuthApi";

const initialState = {
    status: "idle",
    error: null,
    signUpStatus: "idle",
    signUpError: null,
    loginStatus: "idle",
    loggedInUser: null,
    loginError: null,
    forgotPasswordStatus: "idle",
    forgotPasswordSuccessMessage: null,
    forgotPasswordError: null,
    successMessage: null,
    isAuthChecked: false,
}

export const signUpAsync = createAsyncThunk("auth/signUpAsync", async(data) => {
    const res = await signUp(data)

    return res
})

export const loginAsync = createAsyncThunk("auth/loginAsync", async(data) => {
    const res = await login(data)

    return res
})

export const forgotPasswordAsync = createAsyncThunk("auth/forgotPasswordAsync", async(password) => {
    const res = await forgotPassword(password)

    return res
})

export const getCuurentUserAsync = createAsyncThunk("auth/getCuurentUserAsync", async(currentUser) => {
    const res = await getCuurentUser(currentUser)

    return res
})

export const updateProfileAsync = createAsyncThunk("auth/updateProfileAsync", async(data) => {
    const res = await updateProfile(data)

    return res
})

export const logoutUserAsync = createAsyncThunk("auth/logoutUserAsync", async() => {
    const res = await logoutUser;

    return res
})

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        resetSignUpStatus:(state) => {
            state.signUpStatus = "idle"
        },
        clearSignUpError:(state) => {
            state.signUpError = null
        },
        resetLoginStatus:(state) => {
            state.loginStatus = "idle"
        },
        clearLoginError:(state) => {
            state.loginError = null
        },
        resetForgotPasswordStatus:(state) => {
            state.forgotPasswordStatus = "idle"
        },
        clearForgotPasswordSuccessMessage:(state) => {
            state.forgotPasswordSuccessMessage = null
        },
        clearForgotPasswordError:(state) => {
            state.forgotPasswordError = null
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(signUpAsync.pending, (state) => {
                state.signUpStatus="pending"
            })
            .addCase(signUpAsync.fulfilled, (state, action) => {
                state.signUpStatus= "fullfilled"
                state.loggedInUser= action.payload
            })
    }
})