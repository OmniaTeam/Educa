import { baseApi } from "../../../shared/api/index";
import { ISubjects } from "../model/index";

export const subjectsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getAllSubjects : build.query<ISubjects, number>({
			query : ( studentId ) => ({
				url : `/students/get/subject/id/${studentId}`,
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
    useGetAllSubjectsQuery
} = subjectsApi;