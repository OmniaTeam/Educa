import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILectures } from "./index";
import { lecturesApi } from "../index";

const initialState : ILectures = {
    lectures : []
}

export const ILecturesSlice = createSlice({
    name : "lectures",
    initialState,
    reducers : {
        addNewLecture : (state : any, action : PayloadAction<{id: number, name : string, subjectId : number}>) => {
            state.lectures.push({
                id : action.payload.id,
                name : action.payload.name,
                subjectId : action.payload.subjectId,
            })
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            lecturesApi.endpoints.getAllLectures.matchFulfilled,
            (state : ILectures, action : any) => {
                state.lectures = action.payload
            }
        )
    },
})

export const {
    addNewLecture
} = ILecturesSlice.actions