import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../app/providers/store'
import { departmentsApi } from '../../../entities/index';

interface Params {
    director: string,
    name: string,
    instituteId: number
}

export const addDepartment = createAsyncThunk<void, Params, { state: RootState }>(
    'departments/add_new',
    async (body: Params, { dispatch }) => {
        try {
            await dispatch(departmentsApi.endpoints.createNewDepartment.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)