import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../app/providers/store'
import { institutesApi } from '../../../entities/institutes/index';

interface Params {
    id : number,
    director: string,
    name: string
}

export const changeInstitute = createAsyncThunk<void, Params, { state: RootState }>(
    'institutes/change_institute',
    async (body: Params, { dispatch }) => {
        try {
            await dispatch(institutesApi.endpoints.changeInstituteInfo.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)