import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { userApi } from '../../../../entities/index'

export const getUserInfo = createAsyncThunk<void, any, { state: RootState }>(
    'user/getinfo',
    async (body, { dispatch }) => {
        try {
            await dispatch(userApi.endpoints.getUser.initiate(body)).unwrap()
        } catch (error) {
            throw new Error('Unknown error')
        }
    }
)