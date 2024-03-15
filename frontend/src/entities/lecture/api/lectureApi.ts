import { baseApi } from "../../../shared/api/index";
import { ILecture } from "../model/index";

export const lectureApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getLecture : build.query<ILecture, number>({
			query : ( lectureId ) => ({
				url : `/subject/${lectureId}`,
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
    useGetLectureQuery
} = lectureApi;