import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { studentApi } from '../../../../entities/index';

export const getStudentInfo = createAsyncThunk<void, any, { state: RootState }>(
    'student/getinfo',
    async (body, { dispatch }) => {
        try {
            await dispatch(studentApi.endpoints.getStudentInfo.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)