import { createSlice } from "@reduxjs/toolkit";
import { IDepartments } from "./index";
import { departmentsApi } from "../index";

const initialState : IDepartments = {
    departments : []
}

export const IDepartmetsSlice = createSlice({
    name : "departments",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            departmentsApi.endpoints.getAllInstituteDepartments.matchFulfilled,
            (state, action : any) => {
                state.departments = action.payload 
            }
        )
    },
})