import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { subjectsApi } from '../../../../entities/index';

export const getStudentSubjects = createAsyncThunk<void, any, { state: RootState }>(
    'student/getsubjects',
    async (body, { dispatch }) => {
        try {
            await dispatch(subjectsApi.endpoints.getAllSubjects.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)