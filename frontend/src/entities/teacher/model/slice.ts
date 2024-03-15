import { createSlice } from "@reduxjs/toolkit";
import { ITeacher } from "./index";

const initialState : ITeacher = {
    teacherId: -1,
    teacherInstitute: "Институт",
    teacherDepartment: "Кафедра",
    teacherPosition: "Должность",
}

export const ITeacherSlice = createSlice({
    name : "teacher",
    initialState,
    reducers : {},
    extraReducers: () => {},
})