import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { subjectsApi } from '../../../../entities/index';

export const getTeacherSubjects = createAsyncThunk<void, any, { state: RootState }>(
    'teacher/getsubjects',
    async (body, { dispatch }) => {
        try {
            await dispatch(subjectsApi.endpoints.getAllTeacherSubjects.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)