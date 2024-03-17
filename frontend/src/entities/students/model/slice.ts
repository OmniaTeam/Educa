import { createSlice } from "@reduxjs/toolkit";
import { IStudents } from "./index";
import { studentsApi } from "../api/index";

const initialState : IStudents = {
    students : []
}

export const ISudentsSlice = createSlice({
    name : "students",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            studentsApi.endpoints.getDirectionStudents.matchFulfilled,
            (state: IStudents, action: any) => {
                state.students = action.payload
            }
        )
    },
})