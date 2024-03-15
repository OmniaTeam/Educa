import { createSlice } from "@reduxjs/toolkit";
import { ILectures } from "./index";

const initialState : ILectures = {
    lectures : []
}

export const ILecturesSlice = createSlice({
    name : "lecture",
    initialState,
    reducers : {},
    extraReducers: () => {},
})