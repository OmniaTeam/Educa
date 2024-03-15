import { baseApi } from "../../../shared/api/index";
import { ITeacher } from "../model/index";

export const teacherApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getTeacherInfo : build.query<ITeacher, any>({
			query : () => ({
				url : "/user",
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
    useGetTeacherInfoQuery
} = teacherApi;