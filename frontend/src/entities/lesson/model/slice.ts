import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILesson } from "./interfaces/index";

const initialState : ILesson = {
    lessonId: 0,
    lessonName: "",
    lessonQuestionsCount: 0,
    lessonRightQuestionsCount: 0,
    lessonStatus: false,
    lessonBlockedStatus: false
}

export const ILessonSlice = createSlice({
    name : "lesson",
    initialState,
    reducers : {
        setLessonId : (state, action : PayloadAction<number>) => {
            state.lessonId = action.payload
        },
        setLessonName : (state, action : PayloadAction<string>) => {
            state.lessonName = action.payload
        },
        setLessonQuestionsCount : (state, action : PayloadAction<number>) => {
            state.lessonQuestionsCount = action.payload
        },
        setRightQuestionsCount : (state, action : PayloadAction<number>) => {
            state.lessonRightQuestionsCount = action.payload
        },
        setLessonStatus : (state, action : PayloadAction<boolean>) => {
            state.lessonStatus = action.payload
        },
        setLessonBlockedStatus : (state, action : PayloadAction<boolean>) => {
            state.lessonBlockedStatus = action.payload
        }
    }
})

export const {
    setLessonId,
    setLessonName,
    setLessonQuestionsCount,
    setRightQuestionsCount,
    setLessonStatus,
    setLessonBlockedStatus
} = ILessonSlice.actions