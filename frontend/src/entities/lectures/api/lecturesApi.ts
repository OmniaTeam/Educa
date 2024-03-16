import { baseApi } from "../../../shared/api/index";
import { ILectures } from "../model/index";

export const lecturesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getAllLectures : build.query<ILectures, number>({
			query : ( subjectId ) => ({
				url : `/lecture/get/subject/${subjectId}`,
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
    useGetAllLecturesQuery
} = lecturesApi;