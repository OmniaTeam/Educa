import { createSlice } from "@reduxjs/toolkit";
import { ISubject } from "./index";
import { subjectApi } from "../index";

const initialState : ISubject = {
    subjectId: -1,
    subjectName: "Наименование предмета",
    subjectTeacherId: -1,
    subjectSemester: -1,
    subjectTeacherFio: "Фамилия Имя Отчество",
    subjectDirectionId: -1
}

export const ISubjectSlice = createSlice({
    name : "subject",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            subjectApi.endpoints.getSubject.matchFulfilled,
            (state : ISubject, action : any) => {
                state.subjectId = action.payload.id,
                state.subjectName = action.payload.name,
                state.subjectSemester = action.payload.semester,
                state.subjectTeacherId = action.payload.teacherId,
                state.subjectDirectionId = action.payload.directionId
            }
        )
    },
})