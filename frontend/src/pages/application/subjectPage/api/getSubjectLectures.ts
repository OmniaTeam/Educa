import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { lecturesApi } from '../../../../entities/index';

export const getSubjectLectures = createAsyncThunk<void, any, { state: RootState }>(
    'subject/getlectures',
    async (body, { dispatch }) => {
        try {
            await dispatch(lecturesApi.endpoints.getAllLectures.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)