import { useEffect, useState } from "react";
import { BaseModal, TeacherSubjectCard, useAppSelector } from "../../../shared/index";
import { AnimatePresence } from "framer-motion";

import './styles.scss';
import { TeacherAddSubjectForm } from "../../../futures/index";

interface TeacherSubjectsProps {
    teacherId: number;
}

export const TeacherSubjects = (props: TeacherSubjectsProps) => {
    const [teacherSubjects, setTeacherSubjects] = useState<any[]>([]);

    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)

    const directions = useAppSelector((state) => state.directions)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://educa.theomnia.ru/api/subject/get/teacher/${props.teacherId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("teacher data: ", data)
                    setTeacherSubjects(data);
                } else {
                    console.error('Ошибка при получении данных:', response.statusText);
                }
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        };

        fetchData();
    }, [props.teacherId]);

    return (<>
        <div className="teacher-subjects">
            {teacherSubjects.map((value, index) => <TeacherSubjectCard key={index} subjectName={value.name} />)}
            <div className="teacher-subjects--add" onClick={() => setIsAddModalOpen(true)}>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.14286 10.8571H0V8.14286H8.14286V0H10.8571V8.14286H19V10.8571H10.8571V19H8.14286V10.8571Z" fill="black" />
                </svg>
            </div>
        </div>
        <AnimatePresence>
            {isAddModalOpen
                && <BaseModal onClose={() => setIsAddModalOpen(false)}>
                    <TeacherAddSubjectForm teacherId={props.teacherId} directions={directions}/>
                </BaseModal>
            }
        </AnimatePresence>
    </>);
};
