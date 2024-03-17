import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../app/providers/store'
import { directionsApi } from '../../../entities/index';

interface Params {
    id: number,
    name: string,
    departmentId: number
}

export const changeDirection = createAsyncThunk<void, Params, { state: RootState }>(
    'directions/change_direction',
    async (body: Params, { dispatch }) => {
        try {
            await dispatch(directionsApi.endpoints.changeDirectionInfo.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)