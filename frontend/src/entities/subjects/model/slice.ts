import { createSlice } from "@reduxjs/toolkit";
import { ISubjects } from "./index";
import { subjectsApi } from "../index";

const initialState : ISubjects = {
    subjects: []
}

export const ISubjectsSlice = createSlice({
    name : "subjects",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            subjectsApi.endpoints.getAllStudentSubjects.matchFulfilled,
            (state: ISubjects, action: any) => {
                console.log("Subjects: ", action.payload)
                state.subjects = action.payload
            }
        ),
        builder.addMatcher(
            subjectsApi.endpoints.getAllTeacherSubjects.matchFulfilled,
            (state: ISubjects, action: any) => {
                console.log("Subjects: ", action.payload)
                state.subjects = action.payload
            }
        ),
        builder.addMatcher(
            subjectsApi.endpoints.getAllFavorite.matchFulfilled,
            (state: ISubjects, action: any) => {
                console.log("Favorites: ", action.payload)
                state.subjects = action.payload
            }
        )
    },
})