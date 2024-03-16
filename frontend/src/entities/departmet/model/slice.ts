import { createSlice } from "@reduxjs/toolkit";
import { IDepartment } from "./index";
import { departmentApi } from "../index";

const initialState : IDepartment = {
    departmentId: -1,
    departmentDirector: "ФИО Директора",
    departmentName: "Наименование кафедры",
    instituteId: -1
}

export const IDepartmentSlice = createSlice({
    name : "department",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            departmentApi.endpoints.getDepartmentInfo.matchFulfilled,
            (state, action : any) => {
                state.departmentId = action.payload.id,
                state.departmentName = action.payload.name,
                state.departmentDirector = action.payload.director,
                state.instituteId = action.payload.instituteId
            }
        )
    },
})