import { baseApi } from "../../../shared/api/index";
import { IStudents } from "../model/index";

export const studentsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getDirectionStudents : build.query<IStudents, number>({
			query : ( directionId ) => ({
				url : `/students/get/direction/${directionId}`,
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
    useGetDirectionStudentsQuery
} = studentsApi;