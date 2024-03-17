import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../../shared/api/index';
import { IUserSlice, ILessonSlice } from '../../entities/index';

const rootReducer = combineReducers({
	[baseApi.reducerPath] : baseApi.reducer,
	user : IUserSlice.reducer,
    lesson : ILessonSlice.reducer
})

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']