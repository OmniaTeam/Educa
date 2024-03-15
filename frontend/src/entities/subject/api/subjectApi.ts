import { baseApi } from "../../../shared/api/index";
import { ISubject } from "../model/index";

export const subjectApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getSubject : build.query<ISubject, number>({
			query : ( subjectId ) => ({
				url : `/subject/get/id/${subjectId}`,
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
    useGetSubjectQuery
} = subjectApi;