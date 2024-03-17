import { useAppSelector } from "../../../shared/lib/index";

export const getLessonInfo = () => {
    return useAppSelector((state) => state.lesson)
}