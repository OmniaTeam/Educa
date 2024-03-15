import { baseApi } from "../../../shared/api/index";
import { ILectures } from "../model/index";

export const lecturesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getAllLectures : build.query<ILectures, any>({
			query : () => ({
				url : `/lectures/`,
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