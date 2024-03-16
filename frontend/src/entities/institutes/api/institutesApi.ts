import { baseApi } from "../../../shared/api/index";
import { IInstitutes } from "../model/index";

export const institutesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getInstitutes : build.query<IInstitutes, any>({
			query : () => ({
				url : `/institute/get/all`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		createNewInstitute : build.mutation<any, { name : string, director : string }>({
			query : ( args ) => ({
				url : "/institute/add",
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
				body : JSON.stringify({
					"id" : null,
					"director" : args.director,
					"name" : args.name
				})
			})
		}),
		changeInstituteInfo : build.mutation<any, { id : number, name : string, director : string }>({
			query : ( args ) => ({
				url : "/institute/edit",
				headers : {
					"Content-Type": "application/json",
				},
				method : "PUT",
				redirect : "follow",
				body : JSON.stringify({
					"id" : args.id,
					"director" : args.director,
					"name" : args.name
				})
			})
		}),
	}),
});

export const {
    useGetInstitutesQuery,
	useCreateNewInstituteMutation,
	useChangeInstituteInfoMutation
} = institutesApi;