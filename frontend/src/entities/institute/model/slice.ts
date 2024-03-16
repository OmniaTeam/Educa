import { createSlice } from "@reduxjs/toolkit";
import { IInstitute } from "./index";
import { instituteApi } from "../index";

const initialState : IInstitute = {
    instituteId: -1,
    instituteName: "Наименование Института",
    instituteDirector: "ФИО Директора"
}

export const IInstituteSlice = createSlice({
    name : "institute",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addMatcher(
            instituteApi.endpoints.getInstituteInfo.matchFulfilled,
            (state, action : any) => {
                state.instituteId = action.payload.id,
                state.instituteName = action.payload.name,
                state.instituteDirector = action.payload.director
            }
        )
    },
})