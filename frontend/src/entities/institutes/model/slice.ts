import { createSlice } from "@reduxjs/toolkit";
import { IInstitutes } from "./index";
import { institutesApi } from "../index";

const initialState : IInstitutes = {
    institutes: []
}

export const IInstitutesSlice = createSlice({
    name : "institutes",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            institutesApi.endpoints.getInstitutes.matchFulfilled,
            (state, action : any) => {
                state.institutes = action.payload
            }
        )
    },
})