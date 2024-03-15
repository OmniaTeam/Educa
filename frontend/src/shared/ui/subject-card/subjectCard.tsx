import { Link } from "react-router-dom";

import './styles.scss';

interface SubjectCardProps {
    subjectId : number;
    subjectName : string;
    subjectTeacher : string;
    subjectSemester : number;
    fullwidth? : boolean;
    isTeacher? : boolean;
    subjectInstitute? : string 
}

export const SubjectCard = (props: SubjectCardProps) => {
    return <div className="subject-card" style={props.fullwidth ? { 
            width: "calc(100% - 36px)",
            maxWidth: "none"
        } : {}}>
        <div className="subject-card--heading" style={props.fullwidth ? { 
                width: "100%",
                maxWidth: "none"
            } : {}}>
            <div className="subject-card--top" style={props.fullwidth ? { 
                    width: "100%"
                } : {}}>
                <h3 className="subject-card--top__title">{props.subjectName}</h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={props.isTeacher ? {display: "none"} : {}}>
                    <g clipPath="url(#clip0_63_784)">
                        <path d="M16.409 0.501V0.105017L16.4242 0.500631C16.4391 0.500059 16.4546 0.5 16.482 0.5C17.3634 0.5 18.0806 1.2103 18.091 2.09179V22.8309L12.3916 17.3797L12.046 17.0491L11.7004 17.3796L6 22.831V2.19538L6.00098 2.09276C6.00937 1.21189 6.72642 0.5 7.61 0.5C7.63907 0.5 7.6519 0.500103 7.6603 0.500484L7.67164 0.501H7.683H16.405H16.409Z" stroke="black" />
                    </g>
                    <defs>
                        <clipPath id="clip0_63_784">
                        <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="subject-card--meta">
                <p className="subject-card--meta__info">{props.isTeacher ? `Институт: ${props.subjectInstitute}` : `Лектор: ${props.subjectTeacher}`}</p>
                <p className="subject-card--meta__info">Курс: {Math.round(props.subjectSemester / 2)}</p>
                <p className="subject-card--meta__info">Семестр: {props.subjectSemester % 2 === 0 ? "Весна" : "Осень"}</p>
            </div>
        </div>
        <Link className="subject-card--link" to={`/application/subject/${props.subjectId}`}>Перейти к предмету</Link>
    </div>
}