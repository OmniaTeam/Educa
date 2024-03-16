import { createSlice } from "@reduxjs/toolkit";
import { ITeacher } from "./index";
import { teacherApi } from "../index";

const initialState : ITeacher = {
    teacherId: -1,
    teacherInstitute: "Институт",
    teacherDepartment: "Кафедра",
    teacherPosition: "Должность",
    teacherFio: "ФИО Препода"
}

export const ITeacherSlice = createSlice({
    name : "teacher",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            teacherApi.endpoints.getTeacherInfo.matchFulfilled,
            (state: ITeacher, action : any) => {
                state.teacherId = action.payload.teacherId,
                state.teacherFio = action.payload.fio,
                state.teacherInstitute = action.payload.institute,
                state.teacherDepartment = action.payload.department,
                state.teacherPosition = action.payload.position
            }
        )
    },
})