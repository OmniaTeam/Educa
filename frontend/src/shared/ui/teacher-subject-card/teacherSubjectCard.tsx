import './styles.scss';

interface TeacherSubjectCardProps {
    subjectName : string
}

export const TeacherSubjectCard = (props: TeacherSubjectCardProps) => {
    return <p className="teacher-subject-card">{props.subjectName}</p>
}