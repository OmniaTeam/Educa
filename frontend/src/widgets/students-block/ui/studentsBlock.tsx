import { useEffect, useState } from "react";
import { BaseModal, StudentCard, useAppDispatch, useAppSelector } from "../../../shared/index";
import { AnimatePresence } from "framer-motion";
import { getDirectionStudents } from "../index";
import { StudentAddForm } from "../../../futures/index";

import './styles.scss';

interface StudentsBlockProps {
    directionId : number
}

export const StudentsBlock = (props: StudentsBlockProps) => {
    const dispatch = useAppDispatch()

    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState<boolean>(false)

    const students = useAppSelector((state) => state.students)

    useEffect(() => {
        dispatch(getDirectionStudents(props.directionId)).unwrap()
        .then(() => {console.log("Direction students: ", students)})
    }, [students])

    return <>
        <div className="students-block">
            <div className='students-block--heading'>
                <h2 className='students-block--title'>Студенты</h2>
                <div className='students-block--heading__add' onClick={() => { setIsAddStudentModalOpen(true) }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M9.42857 12.5714H0V9.42857H9.42857V0H12.5714V9.42857H22V12.5714H12.5714V22H9.42857V12.5714Z" style={{transition: "200ms all"}} />
                    </svg>
                </div>
            </div>
            <div className="students-block--cards">
                {students.students.map((value : any, index) =>
                    <StudentCard key={index} studentId={value.id} />
                )}
            </div>
        </div>
        <AnimatePresence>
            {isAddStudentModalOpen
                && <BaseModal onClose={() => setIsAddStudentModalOpen(false)}>
                    <StudentAddForm directionId={props.directionId}/>
                </BaseModal>
            }
        </AnimatePresence>
    </>
}