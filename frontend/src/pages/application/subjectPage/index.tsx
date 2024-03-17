import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/index";
import { StudentSubjectPage } from "./studentSubjectPage/index";
import { TeacherSubjectPage } from "./teacherSubjectPage/index";
import { useEffect } from "react";
import { getSubject } from "./api/index";
import { getSubjectLectures } from "./api/getSubjectLectures";

export default function SubjectPage() {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()

    const { id } = useParams()

    const subject = useAppSelector((state) => state.subject)
    const user = useAppSelector((state) => state.user)

    useEffect(() => {
        dispatch(getSubject(id)).unwrap()
            .catch((error : Error) => {
                console.log('message', error.message)
            })
    }, [subject.subjectId])

    useEffect(() => {
        dispatch(getSubjectLectures(id)).unwrap()
            .catch((error : Error) => {
                console.log('message', error.message)
            })
    }, [id])
    
    switch (user.userRole) {
        case ("Student"): {
            return <StudentSubjectPage userRole={user.userRole} subjectId={Number(id)} />
        }
        case ("Teacher"): {
            return <TeacherSubjectPage userRole={user.userRole} subjectId={Number(id)}/>
        }
        case ("Admin"): {
            navigator('/application')
        }
    }
}