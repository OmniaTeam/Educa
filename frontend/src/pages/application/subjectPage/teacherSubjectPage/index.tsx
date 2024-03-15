import { motion } from 'framer-motion';
import { Lectures } from '../../../../widgets/index';

import './styles.scss';

interface TeacherSubjectPageProps {
    userRole : string
}

export const TeacherSubjectPage = (props: TeacherSubjectPageProps) => {
    return <div className='subject'>
        <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className='subject--heading'>
            <h2 className='subject--heading__title'>Наименование предмета</h2>
        </motion.div>
        <Lectures lectures={[
            {
                lectureId : 0,
                lectureName : "Наименование предмета",
                lectureTeacher : "ФИО Препода",
                lectureSemester : 7
            },
            {
                lectureId : 0,
                lectureName : "Наименование предмета",
                lectureTeacher : "ФИО Препода",
                lectureSemester : 7
            },
            {
                lectureId : 0,
                lectureName : "Наименование предмета",
                lectureTeacher : "ФИО Препода",
                lectureSemester : 7
            },
            {
                lectureId : 0,
                lectureName : "Наименование предмета",
                lectureTeacher : "ФИО Препода",
                lectureSemester : 7
            }
        ]} userRole={props.userRole} />
    </div>
}