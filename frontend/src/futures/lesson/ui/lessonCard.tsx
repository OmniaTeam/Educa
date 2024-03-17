import { motion } from 'framer-motion';
import { markHandle } from '../lib/index';

import './styles.scss';

interface LessonCardProps {
    lessonName : string;
    lessonQuestionsCount : number;
    lessonQuestionsRightCount : number;
    lessonStatus : boolean;
    lessonBlockedStatus : boolean
}

export const LessonCard = (props: LessonCardProps) => {
    return <motion.div className='lesson-card'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
    >
        <div className='lesson-card--heading'>
            <h3 className='lesson-card--heading__title'>{props.lessonName}</h3>
            <p className='lesson-card--heading__questions'>{props.lessonQuestionsCount} Вопросов</p>
        </div>
        <div className='lesson-card--footer'>
            <div className='footer-information'>
                <p className='footer-information--status' style={{ backgroundColor: props.lessonStatus ? "#1BAD4D" : "#F05353" }}>
                    {props.lessonStatus ? "Пройдено" : "Не пройдено"}
                </p>
                <p className='footer-information--right' style={{
                    backgroundColor: markHandle(props.lessonQuestionsCount, props.lessonQuestionsRightCount)
                }}>
                    {props.lessonQuestionsRightCount} из {props.lessonQuestionsCount} баллов
                </p>
            </div>
            <button className='lesson-card--footer__results'>
                Посмотреть результаты
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 11V13H16L10.5 18.5L11.92 19.92L19.84 12L11.92 4.07996L10.5 5.49996L16 11H4Z" fill="#3B3B3B" />
                </svg>
            </button>
        </div>
        { props.lessonBlockedStatus
            ? <div className='lesson-card--overlay' style={{

            }}>
                <svg style={{zIndex: "1"}} width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.375 32.375C32.375 33.8065 31.6873 35.077 30.625 35.875V42C30.625 42.6962 30.3484 43.3639 29.8562 43.8562C29.3639 44.3484 28.6962 44.625 28 44.625C27.3038 44.625 26.6361 44.3484 26.1438 43.8562C25.6516 43.3639 25.375 42.6962 25.375 42V35.875C24.7784 35.4276 24.3061 34.835 24.0029 34.1537C23.6997 33.4724 23.5757 32.7248 23.6427 31.9821C23.7097 31.2394 23.9654 30.5261 24.3856 29.91C24.8057 29.2939 25.3764 28.7954 26.0434 28.4619C26.7105 28.1284 27.4517 27.9709 28.1967 28.0044C28.9416 28.0379 29.6657 28.2613 30.3001 28.6534C30.9344 29.0455 31.4581 29.5932 31.8212 30.2445C32.1844 30.8959 32.375 31.6293 32.375 32.375Z" fill="#3B3B3B" />
                    <path d="M17.5 12.25C17.5 9.46523 18.6062 6.79451 20.5754 4.82538C22.5445 2.85625 25.2152 1.75 28 1.75C30.7848 1.75 33.4555 2.85625 35.4246 4.82538C37.3938 6.79451 38.5 9.46523 38.5 12.25V17.5H42C43.8565 17.5 45.637 18.2375 46.9497 19.5503C48.2625 20.863 49 22.6435 49 24.5V47.25C49 49.1065 48.2625 50.887 46.9497 52.1997C45.637 53.5125 43.8565 54.25 42 54.25H14C12.1435 54.25 10.363 53.5125 9.05025 52.1997C7.7375 50.887 7 49.1065 7 47.25V24.5C7 22.6435 7.7375 20.863 9.05025 19.5503C10.363 18.2375 12.1435 17.5 14 17.5H17.5V12.25ZM34.125 12.25C34.125 10.6255 33.4797 9.06763 32.331 7.91897C31.1824 6.77031 29.6245 6.125 28 6.125C26.3755 6.125 24.8176 6.77031 23.669 7.91897C22.5203 9.06763 21.875 10.6255 21.875 12.25V17.5H34.125V12.25ZM14 21C13.0717 21 12.1815 21.3687 11.5251 22.0251C10.8687 22.6815 10.5 23.5717 10.5 24.5V47.25C10.5 48.1783 10.8687 49.0685 11.5251 49.7249C12.1815 50.3812 13.0717 50.75 14 50.75H42C42.9283 50.75 43.8185 50.3812 44.4749 49.7249C45.1312 49.0685 45.5 48.1783 45.5 47.25V24.5C45.5 23.5717 45.1312 22.6815 44.4749 22.0251C43.8185 21.3687 42.9283 21 42 21H14Z" fill="#3B3B3B" />
                </svg>
            </div>
            : <div style={{ display: "none" }}></div>
        }
    </motion.div>
}