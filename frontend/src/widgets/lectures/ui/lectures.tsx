import { motion, AnimatePresence } from 'framer-motion';
import { LectureCard, BaseModal } from '../../../shared/index';
import { LectureAddForm } from '../../../futures/index';
import { useEffect, useState } from 'react';

import './styles.scss';

interface LecturesProps {
    subjectId: number;
    subjectName: string;
    userRole: string;
    semester: number;
}

export const Lectures = (props: LecturesProps) => {
    const [addLectureModalIsOpen, setAddLectureModalIsOpen] = useState<boolean>(false);
    const [lectures, setLectures] = useState<any[]>([]);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await fetch(`https://educa.theomnia.ru/api/lecture/get/subject/${props.subjectId}`);
                if (response.ok) {
                    const data = await response.json();
                    setLectures(data);
                } else {
                    console.error('Failed to fetch lectures');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchLectures();
    }, [props.subjectId]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className='lectures'>
                {props.userRole === 'Student' ? (
                    <h2 className='lectures--title'>Лекции</h2>
                ) : (
                    <div className='lectures--heading'>
                        <h2 className='lectures--title'>Лекции</h2>
                        <div className='lectures--heading__add' onClick={() => setAddLectureModalIsOpen(true)}>
                            <svg width='22' height='22' viewBox='0 0 22 22' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M9.42857 12.5714H0V9.42857H9.42857V0H12.5714V9.42857H22V12.5714H12.5714V22H9.42857V12.5714Z'
                                    style={{ transition: '200ms all' }}
                                />
                            </svg>
                        </div>
                    </div>
                )}
                <div className='lectures--cards'>
                    {lectures.map((value: any, index) => (
                        <LectureCard
                            key={index}
                            lectureId={value.id}
                            lectureName={value.name}
                            lectureSemester={props.semester}
                            isTeacher={props.userRole === 'Teacher'}
                            subjectName={props.subjectName}
                            lectureText={value.text}
                            lectureFiles={value.files}
                            lectureSummary={value.summary}
                        />
                    ))}
                </div>
            </motion.div>
            <AnimatePresence>
                {addLectureModalIsOpen && (
                    <BaseModal onClose={() => setAddLectureModalIsOpen(false)}>
                        <LectureAddForm subjectId={props.subjectId} />
                    </BaseModal>
                )}
            </AnimatePresence>
        </>
    );
};
