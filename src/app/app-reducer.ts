import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import { authActions, authReducer } from '../features/Login/authSlise'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'




const slice=createSlice ({
name: "app",
initialState:{
    status: 'idle' as RequestStatusType,
    error: null as  string | null,
    isInitialized: false
},
reducers:{
    setAppError: (state, action:PayloadAction<{error: string | null}>) => {  
state.error=action.payload.error
},
setAppStatus: (state, action:PayloadAction<{status: RequestStatusType}>) => {
    state.status=action.payload.status
},
setAppInitialized:(state,action:PayloadAction<{isInitialized:boolean}>)=>{
state.isInitialized=action.payload.isInitialized}
}
})



export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            
            dispatch(authActions.setIsLoggedIn({isLoggedIn:true}));

        } else {

        }

        dispatch(appAction.setAppInitialized({isInitialized:true}));
    })
}
export const appReducer=slice.reducer
export const appAction=slice.actions

