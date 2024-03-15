import { createSlice } from "@reduxjs/toolkit";
import { ILecture } from "./index";

const initialState : ILecture = {
    lectureId: -1,
    lectureName: "Наименование лекции",
    lectureSemester: -1,
    lectureTeacherFio: -1
}

export const ILectureSlice = createSlice({
    name : "lecture",
    initialState,
    reducers : {},
    extraReducers: () => {},
})