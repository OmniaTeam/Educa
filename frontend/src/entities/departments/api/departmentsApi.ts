import { baseApi } from "../../../shared/api/index";
import { IDepartments } from "../model/index";

export const departmentsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getAllInstituteDepartments : build.query<IDepartments, number>({
			query : ( instituteId ) => ({
				url : `/department/get/institute/${instituteId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		createNewDepartment : build.mutation<any, { name : string, director : string, instituteId : number }>({
			query : ( args ) => ({
				url : "/department/add",
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
				body : JSON.stringify({
					"id" : null,
					"director" : args.director,
					"name" : args.name,
					"instituteId" : args.instituteId
				})
			})
		}),
		changeDepartmentInfo : build.mutation<any, { id : number, name : string, director : string, instituteId : number }>({
			query : ( args ) => ({
				url : "/department/edit",
				headers : {
					"Content-Type": "application/json",
				},
				method : "PUT",
				redirect : "follow",
				body : JSON.stringify({
					"id" : args.id,
					"director" : args.director,
					"name" : args.name,
					"instituteId" : args.instituteId
				})
			})
		}),
    }),
});

export const {
	useGetAllInstituteDepartmentsQuery,
	useCreateNewDepartmentMutation,
	useChangeDepartmentInfoMutation
} = departmentsApi;