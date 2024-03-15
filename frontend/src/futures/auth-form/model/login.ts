import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../app/providers/store'
import { userApi } from '../../../entities/index';

interface Params {
    userLogin : string,
    userPassword : string
}

export const loginThunk = createAsyncThunk<void, Params, { state: RootState }>(
    'authentication/login',
    async (body: Params, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.loginUser.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)