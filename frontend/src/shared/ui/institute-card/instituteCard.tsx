import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BaseModal } from "../index";

import './styles.scss';
import { InstituteChangeForm } from "../../../futures/index";

interface InstituteCardProps {
    instituteId : number,
    instituteName : string,
    instituteDirector : string
}

export const InstituteCard = (props: InstituteCardProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    return <>
        <div className="institute-card">
            <div className="institute-card--heading">
                <h3 className="institute-card--heading__title">{props.instituteName || `Inst Name #${props.instituteId}`}</h3>
                <div className="institute-card--actions">
                    <div className="institute-card--actions__edit" onClick={() => setIsEditModalOpen(true)}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.621 0.25 13.863 0.15C14.105 0.0500001 14.359 0 14.625 0C14.8917 0 15.15 0.0500001 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.771 2.4 17.863 2.65C17.955 2.9 18.0007 3.15 18 3.4C18 3.66667 17.9543 3.921 17.863 4.163C17.7717 4.405 17.6257 4.62567 17.425 4.825L4.25 18H0ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" fill="black" />
                        </svg>
                    </div>
                    <div className="institute-card--actions__delete" onClick={() => setIsDeleteModalOpen(true)}>
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.375 20C2.75625 20 2.22675 19.7826 1.7865 19.3478C1.34625 18.913 1.12575 18.3896 1.125 17.7778V3.33333H0V1.11111H5.625V0H12.375V1.11111H18V3.33333H16.875V17.7778C16.875 18.3889 16.6549 18.9122 16.2146 19.3478C15.7744 19.7833 15.2445 20.0007 14.625 20H3.375ZM14.625 3.33333H3.375V17.7778H14.625V3.33333ZM5.625 15.5556H7.875V5.55556H5.625V15.5556ZM10.125 15.5556H12.375V5.55556H10.125V15.5556Z" fill="black" />
                        </svg>
                    </div>
                </div>
            </div>
            <p className="institute-card--info">Директор: {props.instituteDirector}</p>
            <Link className="institute-card--link" to={`/application/institute/${props.instituteId}`}>Перейти к институту</Link>
        </div>
        <AnimatePresence>
            {isEditModalOpen
                && <BaseModal onClose={() => setIsEditModalOpen(false)}>
                    <InstituteChangeForm instituteId={props.instituteId} instituteName={props.instituteName} instituteDirector={props.instituteDirector}/>
                </BaseModal>
            }
        </AnimatePresence>
        <AnimatePresence>
            {isDeleteModalOpen
                && <BaseModal onClose={() => setIsDeleteModalOpen(false)}>
                    <div className="institute-delete">
                        <h3 className="institute-delete--title">{props.instituteName}</h3>
                        <div className="institute-delete--buttons">
                            <a className="institute-delete--link" href="">Удалить институт</a>
                        </div>
                    </div>
                </BaseModal>
            }
        </AnimatePresence>
    </>
}