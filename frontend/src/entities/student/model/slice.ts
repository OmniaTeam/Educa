import { createSlice } from "@reduxjs/toolkit";
import { IStudent } from "./index";
import { studentApi } from "../index";
import { setUserFio } from "../../index";

const initialState : IStudent = {
    studentId: -1,
    studentInstitute: "Институт",
    studentDepartment: "Кафедра",
    studentDirection: "Направление",
    studentSemestrNumber: -1
}

export const ISudentSlice = createSlice({
    name : "student",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            studentApi.endpoints.getStudentInfo.matchFulfilled,
            (state: IStudent, action: any) => {
                state.studentId = action.payload.studentId,
                state.studentDepartment = action.payload.department,
                state.studentDirection = action.payload.direction,
                state.studentInstitute = action.payload.institute,
                state.studentSemestrNumber = action.payload.semesterNumber,
                setUserFio(action.payload.fio)
            }
        )
    },
})