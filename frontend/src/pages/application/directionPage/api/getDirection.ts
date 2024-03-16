import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { directionApi } from '../../../../entities/index';

export const getDirection = createAsyncThunk<void, number, { state: RootState }>(
    'direction/getInfo',
    async (body : number, { dispatch }) => {
        try {
            await dispatch(directionApi.endpoints.getDirectionInfo.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)