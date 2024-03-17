import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/index";
import { getStudentInfo, getStudentSubjects, getTeacherInfo, getTeacherSubjects } from "./api/index";

import AdminHomePage from "./adminHomePage/index";
import StudentHomePage from "./studentHomePage/index";
import TeacherHomePage from "./teacherHomePage/index";

export default function HomePage() {
    const dispatch = useAppDispatch();

    const { user, student, teacher } = useAppSelector((state) => state);

    useEffect(() => {
        if (user.userRole === "Student") {
            dispatch(getStudentInfo({})).unwrap()
                .catch((error: Error) => {
                    console.log('message', error.message);
                });
            dispatch(getStudentSubjects(student.studentId)).unwrap()
                .catch((error: Error) => {
                    console.log('message', error.message);
                });
        } else if (user.userRole === "Teacher") {
            dispatch(getTeacherInfo({})).unwrap()
                .catch((error: Error) => {
                    console.log('message', error.message);
                });
            dispatch(getTeacherSubjects(teacher.teacherId)).unwrap()
                .catch((error: Error) => {
                    console.log('message', error.message);
                });
        }
    }, [user, student.studentId, teacher.teacherId]);


    switch (user.userRole) {
        case "Admin":
            return <AdminHomePage user={user} />;
        case "Student":
            return <StudentHomePage user={user} student={student} />;
        case "Teacher":
            return <TeacherHomePage user={user} teacher={teacher} />;
        default:
            return null;
    }
}
