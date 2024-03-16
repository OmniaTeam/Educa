import { createSlice } from "@reduxjs/toolkit";
import { IFavorites } from "./index";
import { favoritesApi } from "../index";

const initialState : IFavorites = {
    favorites : []
}

export const IFavoritesSlice = createSlice({
    name : "favorites",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            favoritesApi.endpoints.getAllFavorite.matchFulfilled,
            (state: IFavorites, action: any) => {
                state.favorites = action.payload
            }
        )
    },
})