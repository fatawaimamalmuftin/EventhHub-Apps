import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: false,
    token: "",
    userLogind: false,

    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: "",
    message: "",
}

export const LogoutThunk = createAsyncThunk(
    "LogoutThunk",
    async(_, {getState, rejectWithValue}) => {
        try {
            const TokenLogout = getState().usersState.token

            const res = await fetch("http://localhost:5678/auth/logout", {
                method: "POST",
                headers: {
                    "Authorization" : TokenLogout
                }
            })

            const result = await res.json()

            if (!result.Status) {
                return rejectWithValue(result.Message)
            }

            return result
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : err)
        }
    }
)

export const RegisThunk = createAsyncThunk(
    "RegisAtThunk",
    async(data, {rejectWithValue}) => {
        try {
            const res = await fetch("http://localhost:5678/auth/regis",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })

            const result = await res.json()

            if (!result.Status) {
                return rejectWithValue(result.Message)
            }

            return result

        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : err)
        }
    }
)

export const LoginThunk = createAsyncThunk(
    "LoginAtThunk",
    async(data, {rejectWithValue}) =>{
        try {
            const res = await fetch("http://localhost:5678/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })

            const result = await res.json()

            if (!result.Status){
                return rejectWithValue(result.Message)
            }

            return result

        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : err)
        }
    }
)

const usersSlice = createSlice({

    name: "users",

    initialState,

    reducers: {
        changePassword: (prevState, {payload}) => {
            const user = prevState.users.find((e)=> e.id === payload.id)

            if(user){
                user.password = payload.password
            }
        },
        resetErrorAndMassage: (prevState) => {
            prevState.message = ""
            prevState.error = ""
        }
    },

    extraReducers: (builder)=>{
        return builder

            .addAsyncThunk(LoginThunk, {
                pending: (state) => {
                    state.isPending = true
                    state.isFulfilled = false
                    state.isRejected = false
                    state.error = null
                    state.message = null
                },

                fulfilled: (state, {payload}) => {
                    state.isPending = false
                    state.isFulfilled = true
                    state.isRejected = false
                    state.message = payload.Message
                    state.token = `Bearer ${payload.Token}`
                    state.userLogind = payload.Data
                },

                rejected: (state, {payload}) => {
                    state.isPending = false
                    state.isFulfilled = false
                    state.isRejected = true
                    state.error = payload
                    state.message = null
                }
            })

            .addAsyncThunk(RegisThunk, {
                pending: (state) => {
                    state.isPending = true
                    state.isFulfilled = false
                    state.isRejected = false
                    state.error = null
                    state.message = null
                },

                fulfilled: (state, {payload}) => {
                    state.isPending = false
                    state.isFulfilled = true
                    state.isRejected = false
                    state.message = payload.Message
                },

                rejected: (state, {payload}) => {
                    state.isPending = false
                    state.isFulfilled = false
                    state.isRejected = true
                    state.error = payload
                    state.message = null
                }
            })
            .addAsyncThunk(LogoutThunk, {
            pending: (state) => {
                state.isPending = true
                state.isFulfilled = false
                state.isRejected = false
                state.error = null
                state.message = null
            },
            fulfilled: (state, { payload }) => {
                state.isPending = false
                state.isFulfilled = true
                state.userLogind = false
                state.token = ""
                state.message = payload.Message
            },
            rejected: (state, { payload }) => {
                state.isPending = false
                state.isRejected = true
                state.userLogind = false
                state.token = ""
                state.error = payload
            },
        })
    }    
})

export const {
    changePassword,
    resetErrorAndMassage
} = usersSlice.actions

export default usersSlice.reducer