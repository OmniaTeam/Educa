import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { directionsApi } from '../../../../entities/index';

export const getDirections = createAsyncThunk<void, number, { state: RootState }>(
    'department/getDepartmentInfo',
    async (body : number, { dispatch }) => {
        try {
            await dispatch(directionsApi.endpoints.getAllDirections.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)