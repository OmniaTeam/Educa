import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/index";
import { getStudentInfo, getStudentSubjects } from "./api/index";

import AdminHomePage from "./adminHomePage/index";
import StudentHomePage from "./studentHomePage/index";
import TeacherHomePage from "./teacherHomePage/index";

export default function HomePage() {
    const dispatch = useAppDispatch()

    const user = useAppSelector((state) => state.user)
    const student = useAppSelector((state) => state.student)
    const teacher = useAppSelector((state) => state.teacher)
    const subjects = useAppSelector((state) => state.subjects)

    useEffect(() => {
        if (user.userRole === "Student") {
            dispatch(getStudentInfo({})).unwrap()
            .catch((error : Error) => {
                console.log('message', error.message)
            })
        }
    }, [user])

    useEffect(() => {
        if (user.userRole === "Student") {
            dispatch(getStudentSubjects(student.studentId)).unwrap()
            .catch((error : Error) => {
                console.log('message', error.message)
            })
        }
    }, [student.studentId])

    switch (user.userRole) {
        case ("Admin"): {
            return <AdminHomePage user={user} />
        }
        case ("Student"): {
            return <StudentHomePage user={user} student={student} subjects={subjects} />
        }
        case ("Teacher"): {
            return <TeacherHomePage user={user} teacher={teacher} />
        }
    }
}