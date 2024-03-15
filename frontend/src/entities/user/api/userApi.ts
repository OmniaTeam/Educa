import { baseApi } from "../../../shared/api/index";
import { ILoginRequest, IUser } from "../model/index";
import { IPassChangerequest } from "../model/interfaces/IPassChangeRequest";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser : build.mutation<IUser, ILoginRequest>({
			query : ( args : ILoginRequest ) => ({
				url : "/user",
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
				body : JSON.stringify({
					"login" : args.userLogin,
					"password" : args.userPassword
				})
			})
		}),
		getUser : build.query<IUser, any>({
			query : () => ({
				url : "/user",
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		changeUserPass : build.mutation<any, IPassChangerequest>({
			query : ( args : IPassChangerequest ) => ({
				url : "/user/change_password",
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
				body : JSON.stringify({
					"oldPassword" : args.oldPassword,
					"newPassword" : args.newPassword
				})
			})
		}),
    }),
});

export const {
    useLoginUserMutation,
	useChangeUserPassMutation,
	useGetUserQuery
} = userApi;