import { AnimatePresence } from "framer-motion";
import { IDepartment, IDirections } from "../../../entities/index";
import { BaseModal, DirectionCard } from "../../../shared/index";
import { useState } from "react";
import { DirectionAddForm } from "../../../futures/index";

import './styles.scss';

interface DirectionBlockProps {
    directions : IDirections,
    department : IDepartment
}

export const DirectionsBlock = (props: DirectionBlockProps) => {
    const [isAddDirectionModalOpen, setIsAddDirectionModalOpen] = useState<boolean>(false)

    return <>
        <div className="directions-block">
            <div className='directions-block--heading'>
                <h2 className='directions-block--title'>Направления</h2>
                <div className='directions-block--heading__add' onClick={() => { setIsAddDirectionModalOpen(true) }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M9.42857 12.5714H0V9.42857H9.42857V0H12.5714V9.42857H22V12.5714H12.5714V22H9.42857V12.5714Z" style={{transition: "200ms all"}} />
                    </svg>
                </div>
            </div>
            <div className="directions-block--cards">
                {props.directions.directions.map((value : any, index) =>
                    <DirectionCard key={index} directionName={value.name} directionId={value.id} />
                )}
            </div>
        </div>
        <AnimatePresence>
            {isAddDirectionModalOpen
                && <BaseModal onClose={() => setIsAddDirectionModalOpen(false)}>
                    <DirectionAddForm departmentId={props.department.departmentId}/>
                </BaseModal>
            }
        </AnimatePresence>
    </>
}