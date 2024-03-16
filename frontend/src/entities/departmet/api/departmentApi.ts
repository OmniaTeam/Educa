import { baseApi } from "../../../shared/api/index";
import { IDepartment } from "../model/index";

export const departmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getDepartmentInfo : build.query<IDepartment, number>({
			query : ( departmentId ) => ({
				url : `/department/get/id/${departmentId}`,
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
	useGetDepartmentInfoQuery
} = departmentApi;