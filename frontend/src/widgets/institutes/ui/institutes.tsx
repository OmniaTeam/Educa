import { AnimatePresence, motion } from "framer-motion";
import { IInstitutes } from "../../../entities/institutes/index";
import { InstituteCard } from "../../../shared/ui/institute-card/index";
import { BaseModal } from "../../../shared/index";
import { useState } from "react";
import { InstituteAddForm } from "../../../futures/index";

import './styles.scss';

interface InstitutesProps {
    institutes : IInstitutes
}

export const Institutes = (props: InstitutesProps) => {
    const [isAddInstituteModalOpen, setIsAddInstituteModalOpen] = useState<boolean>(false)

    return <>
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            // style={{height: "calc(100% - 36px)", overflowY: "scroll"}}
            className='institutes'>
            <div className='institutes--heading'>
                <h2 className='institutes--title'>Институты</h2>
                <div className='institutes--heading__add' onClick={() => {setIsAddInstituteModalOpen(true)}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M9.42857 12.5714H0V9.42857H9.42857V0H12.5714V9.42857H22V12.5714H12.5714V22H9.42857V12.5714Z" style={{transition: "200ms all"}} />
                    </svg>
                </div>
            </div>
            <div className='institutes--cards'>
                {props.institutes.institutes.map((value : any, index) => 
                    <InstituteCard 
                        key={index}
                        instituteId={value.id}
                        instituteName={value.name}
                        instituteDirector={value.director}
                    />
                )}
            </div>
        </motion.div>
        <AnimatePresence>
            {isAddInstituteModalOpen
                && <BaseModal onClose={() => setIsAddInstituteModalOpen(false)}>
                    <InstituteAddForm />
                </BaseModal>
            }
        </AnimatePresence>
    </>
}