import { ITeacher } from "../../index";
import { baseApi } from "../../../shared/api/index";
import { ISubjects } from "../model/index";

export const subjectsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
		getAllStudentSubjects : build.query<ISubjects, number>({
			query : ( studentId ) => ({
				url : `/students/get/subject/id/${studentId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		getAllFavorite : build.query<{type: string, id: number}[], any>({
			query : () => ({
				url : "/favorites/get/user",
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		getSubjectTeacherInfo : build.query<ITeacher, number>({
			query : ( teacherId ) => ({
				url : `/teachers/get/info/id/${teacherId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
			})
		}),
		getAllTeacherSubjects : build.query<ISubjects, number>({
			query : ( teacherId ) => ({
				url : `/subject/get/teacher/${teacherId}`,
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
    useGetAllStudentSubjectsQuery,
	useGetAllFavoriteQuery,
	useGetSubjectTeacherInfoQuery,
	useGetAllTeacherSubjectsQuery
} = subjectsApi;