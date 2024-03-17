import { baseApi } from "../../../shared/api/index";
import { IStudent } from "../model/index";

export const studentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getStudentInfo : build.query<IStudent, any>({
			query : () => ({
				url : "/students/get/info",
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		getDirectionStudents : build.query<IStudent, number>({
			query : ( directionId ) => ({
				url : `/students/get/direction/${directionId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		getStudentInfoById : build.query<IStudent, number>({
			query : ( studentId ) => ({
				url : `students/get/info/id/${studentId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		})
    }),
});

export const {
    useGetStudentInfoQuery,
	useGetDirectionStudentsQuery,
	useGetStudentInfoByIdQuery
} = studentApi;