import { createAsyncThunk } from '@reduxjs/toolkit'
import { studentApi } from '../../../entities/index'
import { RootState } from '../../../app/providers/store'

export const getDirectionStudents = createAsyncThunk<void, number, { state: RootState }>(
    'direction/getStudents',
    async (body : number, { dispatch }) => {
        try {
            await dispatch(studentApi.endpoints.getDirectionStudents.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)