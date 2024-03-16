import { motion } from 'framer-motion';
import { Lectures } from '../../../../widgets/index';
import { ILectures, ISubject } from '../../../../entities/index';

import './styles.scss';

interface StudentSubjectPageProps {
    subject : ISubject;
    lectures : ILectures;
    userRole : string
}

export const StudentSubjectPage = (props: StudentSubjectPageProps) => {
    return <div className='subject'>
        <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className='subject--heading'>
            <h2 className='subject--heading__title'>{props.subject.subjectName}</h2>
        </motion.div>
        <Lectures lectures={props.lectures} userRole={props.userRole} semester={props.subject.subjectSemester} subject={props.subject}/>
    </div>
}