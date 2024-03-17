import { baseApi } from "../../../shared/api/index";
import { ILoginRequest, IUser } from "../model/index";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser : build.mutation<ILoginRequest, IUser>({
			query : ( args ) => ({
				url : "/auth",
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
				body : JSON.stringify(args)
			})
		})
    }),
});

export const {
    useLoginUserMutation
} = userApi;