import { IDirections } from "../index";
import { baseApi } from "../../../shared/api/index";

export const directionsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getAllDirections : build.query<IDirections, number>({
			query : ( departmentId ) => ({
				url : `/direction/get/department/${departmentId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		createNewDirection : build.mutation<any, { name : string, departmentId : number }>({
			query : ( args ) => ({
				url : "/direction/add",
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
				body : JSON.stringify({
					"id" : null,
					"name" : args.name,
					"departmentId" : args.departmentId
				})
			})
		}),
		changeDirectionInfo : build.mutation<any, { id : number, name : string, departmentId : number }>({
			query : ( args ) => ({
				url : "/direction/edit",
				headers : {
					"Content-Type": "application/json",
				},
				method : "PUT",
				redirect : "follow",
				body : JSON.stringify({
					"id" : args.id,
					"departmentId" : args.departmentId,
					"name" : args.name
				})
			})
		})
    }),
});

export const {
	useGetAllDirectionsQuery
} = directionsApi;