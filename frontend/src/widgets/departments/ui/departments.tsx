import { AnimatePresence, motion } from "framer-motion";
import { BaseModal, DepartmentCard } from "../../../shared/index";
import { useState } from "react";
import { IDepartments, IInstitute } from "../../../entities/index";
import { DepartmentAddForm } from "../../../futures/index";

import './styles.scss';

interface DepartmentsProps {
    departments : IDepartments;
    institute : IInstitute
}

export const Departments = (props: DepartmentsProps) => {
    const [isAddInstituteModalOpen, setIsAddInstituteModalOpen] = useState<boolean>(false)

    return <>
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            // style={{height: "calc(100% - 36px)", overflowY: "scroll"}}
            className='departments'>
            <div className='departments--heading'>
                <h2 className='departments--title'>{props.institute.instituteName || `Inst Name #${props.institute.instituteId}`}</h2>
                <div className='departments--heading__add' onClick={() => {setIsAddInstituteModalOpen(true)}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M9.42857 12.5714H0V9.42857H9.42857V0H12.5714V9.42857H22V12.5714H12.5714V22H9.42857V12.5714Z" style={{transition: "200ms all"}} />
                    </svg>
                </div>
            </div>
            <div className='departments--cards'>
                {props.departments.departments.map((value : any, index) => 
                    <DepartmentCard 
                        key={index}
                        departmentId={value.id}
                        departmentName={value.name}
                        departmentDirector={value.director} 
                        instituteId={props.institute.instituteId}
                    />
                )}
            </div>
        </motion.div>
        <AnimatePresence>
            {isAddInstituteModalOpen
                && <BaseModal onClose={() => setIsAddInstituteModalOpen(false)}>
                    <DepartmentAddForm />
                </BaseModal>
            }
        </AnimatePresence>
    </>
}