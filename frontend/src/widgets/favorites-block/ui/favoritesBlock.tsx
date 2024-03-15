import { Link } from 'react-router-dom';
import { LectureCard, SubjectCard } from '../../../shared/index';

import './styles.scss';
import { motion } from 'framer-motion';
import { ISubjects } from '../../../entities/index';

interface FavoriteSubjectsProps {
    type : string;
    subjects? : ISubjects;
    lectures? : {
        lectureId : number;
        lectureName : string;
        lectureTeacher : string;
        lectureSemester : number
    }[],
    fullVer? : boolean,
    delay? : number
}

export const FavoritesBlock = (props: FavoriteSubjectsProps) => {
    return <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: props.delay }}
            style={props.fullVer ? {width: "calc(100% - 36px)"} : {}}
            className="favorite-block">
        <h2 className='favorite-block--title'>Избранные {props.type === "subjects" ? "предметы" : "лекции"}</h2>
        <div className='favorite-block--lines' style={(props.fullVer && props.type === 'subjects') ? { flexDirection: "row", width: "calc(100% - 36px)", flexWrap: "wrap" } : {}}>
            {props.type === "subjects"
                ? <>{props.subjects?.subjects.slice(0, props.fullVer ? props.subjects.subjects.length : 2).map((value : any, index) => 
                    <SubjectCard 
                        key={index}
                        subjectId={value.id} 
                        subjectName={value.name} 
                        subjectTeacher={"ФИО препода"} 
                        subjectSemester={value.semester} 
                        fullwidth={props.fullVer ? false : true}
                    />
                )}{}</>
                : <>{props.lectures?.slice(0, props.fullVer ? props.lectures.length : 2).map((value, index) => 
                    <LectureCard 
                        key={index} 
                        lectureId={value.lectureId} 
                        lectureName={value.lectureName} 
                        lectureTeacher={value.lectureTeacher} 
                        lectureSemester={value.lectureSemester}
                    />
                )}{}</>
            }
        </div>
        <Link style={props.fullVer ? {display: "none"} : {}} className="favorite-block--link" to={'favorites'}>Посмотреть все</Link>
    </motion.div>
}