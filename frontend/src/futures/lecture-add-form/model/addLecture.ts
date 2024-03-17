import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../app/providers/store'
import { lecturesApi } from '../../../entities/index';

interface Params {
    name : string,
    subjectId : number
}

export const addLectrue = createAsyncThunk<void, Params, { state: RootState }>(
    'lectures/add_new',
    async (body: Params, { dispatch }) => {
        try {
            await dispatch(lecturesApi.endpoints.createNewLecture.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)