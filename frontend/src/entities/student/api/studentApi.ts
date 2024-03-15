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
		})
    }),
});

export const {
    useGetStudentInfoQuery
} = studentApi;