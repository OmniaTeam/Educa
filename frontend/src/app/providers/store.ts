import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../../shared/api/index';
import { IUserSlice, ISudentSlice, ITeacherSlice, ISubjectSlice, ILectureSlice, ILecturesSlice, ISubjectsSlice } from '../../entities/index';

const rootReducer = combineReducers({
	[baseApi.reducerPath] : baseApi.reducer,
	user : IUserSlice.reducer,
    student : ISudentSlice.reducer,
    teacher : ITeacherSlice.reducer,
    subject : ISubjectSlice.reducer,
    subjects : ISubjectsSlice.reducer,
    lecture : ILectureSlice.reducer,
    lectures : ILecturesSlice.reducer
})

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']