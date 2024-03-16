import { motion } from 'framer-motion';
import { Lectures } from '../../../../widgets/index';
import { useAppSelector } from '../../../../shared/index';
import { ISubject } from '../../../../entities/index';

import './styles.scss';

interface TeacherSubjectPageProps {
    subject : ISubject;
    userRole : string
}

export const TeacherSubjectPage = (props: TeacherSubjectPageProps) => {
    const lectures = useAppSelector((state) => state.lectures)

    return <div className='subject'>
        <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className='subject--heading'>
            <h2 className='subject--heading__title'>{props.subject.subjectName}</h2>
        </motion.div>
        <Lectures lectures={lectures} userRole={props.userRole} semester={props.subject.subjectSemester} subject={props.subject} />
    </div>
}