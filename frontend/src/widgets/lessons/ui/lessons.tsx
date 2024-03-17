import { LessonCard } from "../../../futures/lesson/index";

import './styles.scss';

export const Lessons = () => {
    return <div className="lessons-cards">
        <LessonCard 
            lessonName={"Промежуточная аттестация №1"} 
            lessonQuestionsCount={12} 
            lessonQuestionsRightCount={12} 
            lessonStatus={true} 
            lessonBlockedStatus={false}
        />
        <LessonCard 
            lessonName={"Промежуточная аттестация №2"} 
            lessonQuestionsCount={15} 
            lessonQuestionsRightCount={11} 
            lessonStatus={true} 
            lessonBlockedStatus={false}
        />
        <LessonCard 
            lessonName={"Промежуточная аттестация №3"} 
            lessonQuestionsCount={20} 
            lessonQuestionsRightCount={2} 
            lessonStatus={false} 
            lessonBlockedStatus={false}
        />
        <LessonCard 
            lessonName={"Промежуточная аттестация №4"} 
            lessonQuestionsCount={7} 
            lessonQuestionsRightCount={0} 
            lessonStatus={false} 
            lessonBlockedStatus={true}
        />
        <LessonCard 
            lessonName={"Промежуточная аттестация №5"} 
            lessonQuestionsCount={7} 
            lessonQuestionsRightCount={0} 
            lessonStatus={false} 
            lessonBlockedStatus={true}
        />
    </div>
}