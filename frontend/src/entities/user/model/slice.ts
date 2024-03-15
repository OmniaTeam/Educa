import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EUserRoles, IUser } from "./index";
import { userApi } from "../index";

const initialState : IUser = {
    userId: -1,
    userFio: "nothing nothing nothing",
    userLogin: "nothing",
    userRole: EUserRoles.GUEST,
}

export const IUserSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUserFio : (state, action : PayloadAction<string>) => {
            state.userFio = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.loginUser.matchFulfilled,
            (state: IUser, action: any) => {
                state.userId = action.payload.id,
                state.userFio = action.payload.fio,
                state.userLogin = action.payload.login,
                state.userRole = action.payload.role
            }
        ),
        builder.addMatcher(
            userApi.endpoints.getUser.matchFulfilled,
            (state: IUser, action: any) => {
                state.userId = action.payload.id,
                state.userFio = action.payload.fio,
                state.userLogin = action.payload.login,
                state.userRole = action.payload.role
            }
        )
    },
})

export const {
    setUserFio
} = IUserSlice.actions