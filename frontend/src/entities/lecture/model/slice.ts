import { createSlice } from "@reduxjs/toolkit";
import { ILecture } from "./index";

const initialState : ILecture = {
    lectureId: -1,
    lectureName: "Наименование лекции",
    subjectId: -1
}

export const ILectureSlice = createSlice({
    name : "lecture",
    initialState,
    reducers : {},
    extraReducers: () => {},
})