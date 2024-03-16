import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { institutesApi } from '../../../../entities/index';

export const getInstitutes = createAsyncThunk<void, any, { state: RootState }>(
    'institutes/getAll',
    async (body, { dispatch }) => {
        try {
            await dispatch(institutesApi.endpoints.getInstitutes.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)