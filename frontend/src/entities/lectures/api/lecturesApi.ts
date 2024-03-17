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
		}),
		createNewLecture : build.mutation<ILectures, { name : string, subjectId : number }>({
			query : ( args ) => ({
				url : "/lecture/add",
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
				body : JSON.stringify({
					"id": null,
					"name": args.name,
					"subjectId": args.subjectId,
					"text": "",
					"summary": false,
					"files": false
				})
			})
		})
    }),
});

export const {
    useGetAllLecturesQuery
} = lecturesApi;