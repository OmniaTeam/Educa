import { Link } from 'react-router-dom';
import { LectureCard, SubjectCard } from '../../../shared/index';
import { motion } from 'framer-motion';
import { ILectures, ISubjects } from '../../../entities/index';

import './styles.scss';

interface FavoriteSubjectsProps {
    type : string;
    subjects? : ISubjects;
    lectures? : ILectures,
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
                        subjectTeacher={value.teacherFio} 
                        subjectSemester={value.semester} 
                        fullwidth={props.fullVer ? false : true}
                    />
                )}{}</>
                : <>{props.lectures?.lectures.slice(0, props.fullVer ? props.lectures.lectures.length : 2).map((value : any, index) => 
                    <LectureCard 
                        key={index}
                        lectureId={value.id}
                        lectureName={value.name}
                        lectureSemester={value.lectureSemester}
                        subjectName={'Наименование предмета'}
                        lectureText={value.text} lectureFiles={value.files} lectureSummary={value.summary}/>
                )}{}</>
            }
        </div>
        <Link style={props.fullVer ? {display: "none"} : {}} className="favorite-block--link" to={'favorites'}>Посмотреть все</Link>
    </motion.div>
}