import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { instituteApi } from '../../../../entities/index';

export const getInstitute = createAsyncThunk<void, number, { state: RootState }>(
    'institutes/getInstituteInfo',
    async (body : number, { dispatch }) => {
        try {
            await dispatch(instituteApi.endpoints.getInstituteInfo.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)