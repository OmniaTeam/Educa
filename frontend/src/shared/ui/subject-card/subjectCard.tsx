import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

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
    const [isMarked, setIsMarked] = useState<boolean>(false);

    const handleToggleMark = async () => {
        try {
            const response = await fetch('https://educa.theomnia.ru/api/favorites/' + (isMarked ? 'unset' : 'set') + '/favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subjectId: props.subjectId,
                }),
            });
            if (response.ok) {
                setIsMarked(prevState => !prevState);
            } else {
                console.error('Failed to toggle mark');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

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
                <motion.div
                    className="subject-card--top__mark"
                    onClick={handleToggleMark}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    style={{cursor: "pointer", display: props.isTeacher ? "none" : ""}}
                    >
                    <svg
                        width="14"
                        height="24"
                        viewBox="0 0 14 24"
                        fill={isMarked ? "#FFF500" : "none"}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.409 0.501V0.105017L11.4242 0.500631C11.4391 0.500059 11.4546 0.5 11.482 0.5C12.3634 0.5 13.0806 1.2103 13.091 2.09179V22.8309L7.3916 17.3797L7.04603 17.0491L6.70043 17.3796L1 22.831V2.19538L1.00098 2.09276C1.00937 1.21189 1.72642 0.5 2.61 0.5C2.63907 0.5 2.6519 0.500103 2.6603 0.500484L2.67164 0.501H2.683H11.405H11.409Z"
                            stroke="black"
                        />
                    </svg>
                </motion.div>
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