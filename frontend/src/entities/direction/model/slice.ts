import { createSlice } from "@reduxjs/toolkit";
import { IDirection } from "./index";
import { directionApi } from "../index";


const initialState : IDirection = {
    directionId: -1,
    directionName: "Наименование направления",
    departmentId: -1
}

export const IDirectionSlice = createSlice({
    name : "direction",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            directionApi.endpoints.getDirectionInfo.matchFulfilled,
            (state, action : any) => {
                state.departmentId = action.payload.id,
                state.directionName = action.payload.name,
                state.departmentId = action.payload.departmentId
            }
        )
    },
})