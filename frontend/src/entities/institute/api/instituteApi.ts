import { baseApi } from "../../../shared/api/index";
import { IInstitute } from "../model/index";

export const instituteApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getInstituteInfo : build.query<IInstitute, number>({
			query : ( instituteId ) => ({
				url : `/institute/get/id/${instituteId}`,
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
    useGetInstituteInfoQuery
} = instituteApi;