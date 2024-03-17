import { motion } from 'framer-motion';
import { Lectures } from '../../../../widgets/index';
import { useEffect, useState } from 'react';

import './styles.scss';

interface TeacherSubjectPageProps {
    subjectId : number;
    userRole : string
}

export const TeacherSubjectPage = (props: TeacherSubjectPageProps) => {
    const [subjectName, setSubjectName] = useState<string>('')
    const [subjectSemester, setSubjectSemester] = useState<number>(-1)

    useEffect(() => {
        const fetchSubjectData = async () => {
            try {
                const response = await fetch(`https://educa.theomnia.ru/api/subject/get/id/${props.subjectId}`);
                if (response.ok) {
                    const data = await response.json();
                    // Установка полученных данных в состояния
                    setSubjectName(data.name);
                    setSubjectSemester(data.semester);
                } else {
                    console.error('Failed to fetch subject data');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchSubjectData();
    }, [props.subjectId])

    return <div className='subject'>
        <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className='subject--heading'>
            <h2 className='subject--heading__title'>{subjectName}</h2>
        </motion.div>
        <Lectures subjectId={props.subjectId} userRole={props.userRole} semester={subjectSemester} subjectName={subjectName} />
    </div>
}