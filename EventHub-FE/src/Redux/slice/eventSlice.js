import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Events from '../../lib/dummyEvent.js'

const initialState = {
    events:[],
    eventForm: {},
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
}

export const getEventThunk = createAsyncThunk(
    "get_event",
    async(_, {rejectWithValue}) => {
        try{
            const data = await new Promise((res)=>{
                setTimeout(()=>{
                    res(Events)
                },1500)
            })
            return data
        }catch(err){
            return rejectWithValue(err.massage)
        } 
    }
)

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        addEvent: (state, { payload }) => {
            state.events.unshift(payload)
        }
    },
    extraReducers: (builder)=>{
        return builder.addAsyncThunk(getEventThunk,{
            pending: (state) => {
                state.isPending = true
                state.isFulfilled = false
                state.isRejected = false
                state.error = null
            },
            fulfilled: (state,{payload}) =>{
                state.events = payload
                state.isPending = false
                state.isFulfilled = true
            },
            rejected: (state,{payload}) =>{
                state.isPending = false
                state.isRejected = true
                state.error = payload
            }
        })
    }
})

export const { addEvent } = eventSlice.actions
export default eventSlice.reducer