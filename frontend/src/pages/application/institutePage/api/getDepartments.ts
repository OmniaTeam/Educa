import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { departmentsApi } from '../../../../entities/index';

export const getDepartments = createAsyncThunk<void, number, { state: RootState }>(
    'institutes/getAllDeps',
    async (body : number, { dispatch }) => {
        try {
            await dispatch(departmentsApi.endpoints.getAllInstituteDepartments.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)