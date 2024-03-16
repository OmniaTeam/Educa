import { createSlice } from "@reduxjs/toolkit";
import { IDirections } from "./index";
import { directionsApi } from "../api/index";

const initialState : IDirections = {
    directions: []
}

export const IDirectionsSlice = createSlice({
    name : "directions",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            directionsApi.endpoints.getAllDirections.matchFulfilled,
            (state, action : any) => {
                state.directions = action.payload
            }
        )
    },
})