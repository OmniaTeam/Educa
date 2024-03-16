import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../app/providers/store'
import { institutesApi } from '../../../entities/institutes/index';

interface Params {
    director: string,
    name: string
}

export const addInstitute = createAsyncThunk<void, Params, { state: RootState }>(
    'institutes/add_new',
    async (body: Params, { dispatch }) => {
        try {
            await dispatch(institutesApi.endpoints.createNewInstitute.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)