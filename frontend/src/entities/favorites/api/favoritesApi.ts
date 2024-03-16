import { baseApi } from "../../../shared/api/index";
import { IFavorites } from "../model/index";

export const favoritesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getAllFavorite : build.query<IFavorites, any>({
			query : () => ({
				url : "/favorites/get/user",
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
	useGetAllFavoriteQuery
} = favoritesApi;