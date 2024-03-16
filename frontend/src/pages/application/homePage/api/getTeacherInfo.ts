import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { teacherApi } from '../../../../entities/index';

export const getTeacherInfo = createAsyncThunk<void, any, { state: RootState }>(
    'teacher/getinfo',
    async (body, { dispatch }) => {
        try {
            await dispatch(teacherApi.endpoints.getTeacherInfo.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)