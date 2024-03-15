import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/index";
import { StudentSubjectPage } from "./studentSubjectPage/index";
import { TeacherSubjectPage } from "./teacherSubjectPage/index";
import { useEffect } from "react";
import { getSubject } from "./api/index";

export default function SubjectPage() {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()

    const { subjectId } = useParams()

    const subject = useAppSelector((state) => state.subject)
    const user = useAppSelector((state) => state.user)

    useEffect(() => {
        dispatch(getSubject(subjectId)).unwrap()
            .catch((error : Error) => {
                console.log('message', error.message)
            })
    }, [subject])
    
    switch (user.userRole) {
        case ("Student"): {
            return <StudentSubjectPage userRole={user.userRole} subject={subject}/>
        }
        case ("Teacher"): {
            return <TeacherSubjectPage userRole={user.userRole}/>
        }
        case ("Admin"): {
            navigator('/application')
        }
    }
}