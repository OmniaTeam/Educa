import { useState } from "react";
import { BaseModal } from "../base-modal/index";
import { AnimatePresence } from "framer-motion";

import './styles.scss';
import { ConspectModal, FormSubmit } from "../index";

interface LectureCardProps {
    lectureId : number;
    lectureName : string;
    lectureTeacher : string;
    lectureSemester : number;
    isTeacher? : boolean
}

export const LectureCard = (props: LectureCardProps) => {
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false)
    const [isModalReaderOpen, setIsReaderModalOpen] = useState<boolean>(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isConspectEdit, setIsConspectEdit] = useState<boolean>(false)

    return <>
        <div className="lecture-card">
            <div className="lecture-card--heading">
                <div className="lecture-card--top">
                    <h3 className="lecture-card--top__title">{props.lectureName}</h3>
                    {props.isTeacher
                        ? <div className="lecture-card--top__delete" onClick={() => setIsDeleteModalOpen(true)}>
                            <svg width="18" height="21" viewBox="0 0 18 21" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.375 20.25C2.75625 20.25 2.22675 20.0299 1.7865 19.5896C1.34625 19.1494 1.12575 18.6195 1.125 18V3.375H0V1.125H5.625V0H12.375V1.125H18V3.375H16.875V18C16.875 18.6187 16.6549 19.1486 16.2146 19.5896C15.7744 20.0306 15.2445 20.2507 14.625 20.25H3.375ZM14.625 3.375H3.375V18H14.625V3.375ZM5.625 15.75H7.875V5.625H5.625V15.75ZM10.125 15.75H12.375V5.625H10.125V15.75Z" />
                            </svg>
                        </div>
                        : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_63_784)">
                                <path d="M16.409 0.501V0.105017L16.4242 0.500631C16.4391 0.500059 16.4546 0.5 16.482 0.5C17.3634 0.5 18.0806 1.2103 18.091 2.09179V22.8309L12.3916 17.3797L12.046 17.0491L11.7004 17.3796L6 22.831V2.19538L6.00098 2.09276C6.00937 1.21189 6.72642 0.5 7.61 0.5C7.63907 0.5 7.6519 0.500103 7.6603 0.500484L7.67164 0.501H7.683H16.405H16.409Z" stroke="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0_63_784">
                                <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    }
                </div>
                <div className="lecture-card--meta">
                    <p className="lecture-card--meta__info">Предмет: Наименование предмета #{props.lectureId}</p>
                    <p className="lecture-card--meta__info">Лектор: {props.lectureTeacher}</p>
                    <p className="lecture-card--meta__info">Курс: {Math.round(props.lectureSemester / 2)}</p>
                    <p className="lecture-card--meta__info">Семестр: {props.lectureSemester % 2 === 0 ? "Весна" : "Осень"}</p>
                    <p className="lecture-card--meta__info">Формат: Формат файла</p>
                </div>
            </div>
            <div className="lecture-card--links">
                <button className="lecture-card--link" onClick={() => setIsDownloadModalOpen(true)} >Скачать</button>
                <button className="lecture-card--link" onClick={() => setIsReaderModalOpen(true)}>Посмотреть конспект</button>
            </div>
        </div>
        <AnimatePresence>
            {isDownloadModalOpen
                && <BaseModal onClose={() => setIsDownloadModalOpen(false)}>
                    <div className="lecture-download">
                        <h3 className="lecture-download--title">Наименование лекции</h3>
                        <div className="lecture-download--buttons">
                            <a className="lecture-download--link" href="" download>Скачать лекцию</a>
                            <a className="lecture-download--link" href="" download>Скачать конспект</a>
                        </div>
                    </div>
                </BaseModal>
            }
        </AnimatePresence>
        <AnimatePresence>
            {isModalReaderOpen
                && <ConspectModal onClose={() => {
                        setIsReaderModalOpen(false)
                        setIsConspectEdit(false)
                    }}>
                    <div className="lecture-conspect">
                        {props.isTeacher
                            ? <div className="lecture-conspect--heading">
                                <h3 className="lecture-conspect--title">Наименование лекции - Коспект</h3>
                                <div className="lecture-conspect--heading__edit" onClick={() => setIsConspectEdit(true)}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.621 0.25 13.863 0.15C14.105 0.0500001 14.359 0 14.625 0C14.8917 0 15.15 0.0500001 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.771 2.4 17.863 2.65C17.955 2.9 18.0007 3.15 18 3.4C18 3.66667 17.9543 3.921 17.863 4.163C17.7717 4.405 17.6257 4.62567 17.425 4.825L4.25 18H0ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" />
                                    </svg>
                                </div>
                            </div>
                            : <h3 className="lecture-conspect--title">Наименование лекции - Коспект</h3>
                        }
                        {isConspectEdit
                            ? <textarea className="lecture-conspect--text" name="" id="" style={{width: "calc(100% - 6px)", height: "300px", resize: "none"}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </textarea>
                            : <p className="lecture-conspect--text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        }
                        {isConspectEdit
                            ? <FormSubmit inputType={"button"} inputValue={"Сохранить"} animation={{
                                initial: {},
                                animate: {},
                                transition: {}
                            }} />
                            : <div></div>
                        }
                        
                    </div>
                </ConspectModal>
            }
        </AnimatePresence>
        <AnimatePresence>
            {isDeleteModalOpen
                && <BaseModal onClose={() => setIsDeleteModalOpen(false)}>
                    <div className="lecture-download">
                        <h3 className="lecture-download--title">Наименование лекции</h3>
                        <div className="lecture-download--buttons">
                            <a className="lecture-download--link" href="">Удалить лекцию</a>
                            <a className="lecture-download--link" href="">Удалить конспект</a>
                        </div>
                    </div>
                </BaseModal>
            }
        </AnimatePresence>
    </>
}