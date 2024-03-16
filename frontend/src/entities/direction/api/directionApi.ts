import { baseApi } from "../../../shared/api/index";
import { IDirection } from "../model/index";

export const directionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getDirectionInfo : build.query<IDirection, number>({
			query : ( directionId ) => ({
				url : `/direction/get/id/${directionId}`,
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
	useGetDirectionInfoQuery
} = directionApi;