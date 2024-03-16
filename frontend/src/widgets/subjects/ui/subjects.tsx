import { motion } from 'framer-motion';
import { SubjectCard } from '../../../shared/index';
import { ISubjects } from '../../../entities/index';

import './styles.scss';

interface SubjectsProps {
    subjects : ISubjects;
    isTeacher? : boolean;
}

export const Subjects = (props: SubjectsProps) => {
    return <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className='subjects'>
        <h2 className='subjects--title'>Мои предметы</h2>
        <div className='subjects--cards'>
            {props.subjects.subjects.map((value : any, index) => 
                <SubjectCard 
                    key={index}
                    subjectId={value.id} 
                    subjectName={value.name} 
                    subjectTeacher={value.teacherFio} 
                    subjectSemester={value.semester}
                    isTeacher={props.isTeacher}
                    subjectInstitute={"Наименование института"}
                />
            )}
        </div>
    </motion.div>
}