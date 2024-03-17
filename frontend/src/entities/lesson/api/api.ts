import { ILesson } from "../index";
import { baseApi } from "../../../shared/api/index";

export const lessonApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getLessonById : build.query<ILesson, any>({
            query : ( args ) => ({
                url : "/lessons/" + args,
                headers : {
                    "Content-Type": "application/json",
                },
                method : "GET",
                redirect : "follow"
            })
        }),
        getLessons : build.query<ILesson[], any>({
            query : () => ({
                url : "/lessons/",
                headers : {
                    "Content-Type": "application/json",
                },
                method : "GET",
                redirect : "follow"
            })
        })
    })
})

export const {
    useGetLessonByIdQuery,
    useGetLessonsQuery
} = lessonApi;