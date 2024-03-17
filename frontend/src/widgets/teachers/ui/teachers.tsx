import { useEffect, useState } from 'react';
import { TeacherCard } from '../../index';
import { AnimatePresence } from 'framer-motion';
import { BaseModal } from '../../../shared/index';
import { TeacherAddForm } from '../../../futures/index';

import './styles.scss';

interface TeachersProps {
    departmentId: number;
}

export const Teachers = (props: TeachersProps) => {
    const [teachers, setTeachers] = useState<any[]>([]);

    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch(`https://educa.theomnia.ru/api/teachers/get/department/${props.departmentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTeachers(data);
                } else {
                    console.error('Ошибка при получении данных о преподавателях:', response.statusText);
                }
            } catch (error) {
                console.error('Произошла ошибка при выполнении запроса:', error);
            }
        };

        fetchTeachers();
    }, [props.departmentId]);

    return (<>
        <div className="teachers">
            <div className="teachers--heading">
                <h3 className="teachers--heading__title">Преподаватели</h3>
                <div className="teachers--heading__add" onClick={() => setIsAddModalOpen(true)}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.14286 10.8571H0V8.14286H8.14286V0H10.8571V8.14286H19V10.8571H10.8571V19H8.14286V10.8571Z" fill="black" />
                    </svg>
                </div>
            </div>
            <div className="teachers--cards">
                {teachers.map((teacher: any, index) => <TeacherCard key={index} teacherId={teacher.id} />)}
            </div>
        </div>
        <AnimatePresence>
            {isAddModalOpen
                && <BaseModal onClose={() => setIsAddModalOpen(false)}>
                    <TeacherAddForm departmentId={props.departmentId}/>
                </BaseModal>
            }
        </AnimatePresence>
    </>);
};
