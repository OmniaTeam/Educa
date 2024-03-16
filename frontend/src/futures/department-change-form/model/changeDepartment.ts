import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../app/providers/store'
import { departmentsApi } from '../../../entities/index';

interface Params {
    id : number,
    director: string,
    name: string,
    instituteId: number
}

export const changeDepartmentInfo = createAsyncThunk<void, Params, { state: RootState }>(
    'departments/change_department',
    async (body: Params, { dispatch }) => {
        try {
            await dispatch(departmentsApi.endpoints.changeDepartmentInfo.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)