import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { subjectApi } from '../../../../entities/index';

export const getSubject = createAsyncThunk<void, any, { state: RootState }>(
    'subject/getinfo',
    async (body, { dispatch }) => {
        try {
            await dispatch(subjectApi.endpoints.getSubject.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)