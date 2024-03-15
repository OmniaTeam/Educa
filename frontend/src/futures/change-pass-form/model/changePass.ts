import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../app/providers/store'
import { userApi } from '../../../entities/index';

interface Params {
    oldPassword : string,
    newPassword : string
}

export const changePassThunk = createAsyncThunk<void, Params, { state: RootState }>(
    'authentication/change_password',
    async (body: Params, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.changeUserPass.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)