import { useAppSelector } from "../../../shared/index";

import StudentSubjectsPage from "./studentSubjectsPage/index";
import TeacherSubjectsPage from "./teacherSubjectsPage/index";

export default function SubjectsPage() {
    const user = useAppSelector((state) => state.user)

    switch (user.userRole) {
        case ("Student"): {
            return <StudentSubjectsPage />
        }
        case ("Teacher"): {
            return <TeacherSubjectsPage />
        }
    }
}