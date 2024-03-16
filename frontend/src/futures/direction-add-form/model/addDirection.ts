import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../app/providers/store'
import { directionsApi } from '../../../entities/index';

interface Params {
    name: string,
    departmentId: number
}

export const addDirection = createAsyncThunk<void, Params, { state: RootState }>(
    'directions/add_new',
    async (body: Params, { dispatch }) => {
        try {
            await dispatch(directionsApi.endpoints.createNewDirection.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)