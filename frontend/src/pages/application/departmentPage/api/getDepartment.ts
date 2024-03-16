import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/providers/store';
import { departmentApi } from '../../../../entities/index';

export const getDepartment = createAsyncThunk<void, number, { state: RootState }>(
    'department/getDepartmentInfo',
    async (body : number, { dispatch }) => {
        try {
            await dispatch(departmentApi.endpoints.getDepartmentInfo.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)