import { ChangeEvent, useState } from "react";
import { BaseModal } from "../base-modal/index";
import { AnimatePresence, motion } from "framer-motion";
import { Complete, ConspectModal, FormInput, FormSubmit } from "../index";

import MarkdownEditor from "../markdown-editor/MarkdownEditor";

import './styles.scss';
import { FileUpload } from "../../../futures/index";

interface LectureCardProps {
    lectureId: number;
    lectureName: string;
    lectureSemester: number;
    isTeacher?: boolean;
    subjectName: string;
    lectureText: string;
    lectureFiles: boolean;
    lectureSummary: boolean
}

export const LectureCard = (props: LectureCardProps) => {
    const [isModalReaderOpen, setIsReaderModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isConspectEdit, setIsConspectEdit] = useState<boolean>(false);
    const [isLectureReader, setIsLectureReader] = useState<boolean>(false);
    const [isLectureTextReader, setIsLectureTextReader] = useState<boolean>(false);
    const [isMarked, setIsMarked] = useState<boolean>(false);
    const [isFilePinningModalOpen, setIsFilePinningModalOpen] = useState<boolean>(false)

    const [sumaryText, setSummaryText] = useState<string>('');
    const [lectureText, setLectureText] = useState<string>(props.lectureText);
    
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sumaryId, setSumaryId] = useState<number>(-1)

    const [completeModal, setCompleteModal] = useState<boolean>(false)

    const handleToggleMark = async () => {
        try {
            const response = await fetch('https://educa.theomnia.ru/api/favorites/' + (isMarked ? 'unset' : 'set') + '/favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lectureId: props.lectureId,
                }),
            });
            if (response.ok) {
                setIsMarked(prevState => !prevState);
            } else {
                console.error('Failed to toggle mark');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleDownloadLecture = async () => {
        try {
            const response = await fetch(`https://educa.theomnia.ru/api/files/list/${props.lectureId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const file_id = data[0].id;
                    window.open(`https://educa.theomnia.ru/api/files/download/id/${file_id}`);
                } else {
                    console.error('No files found for this lecture');
                }
            } else {
                console.error('Failed to fetch lecture files');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleGetSummary = async () => {
        try {
            const response = await fetch(`https://educa.theomnia.ru/api/summary/get/lecture/${props.lectureId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const summaryText = data[0].text;
                    const summaryId = data[0].id
                    setSummaryText(summaryText)
                    setSumaryId(summaryId)
                    setIsReaderModalOpen(true);
                } else {
                    console.error('No data found for this lecture');
                }
            } else {
                console.error('Failed to fetch lecture data');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handlQeuestion = async () => {
        try {
            setIsQuestionModalOpen(false)
            setIsLoading(true);
            const response = await fetch(`https://educa.theomnia.ru/api/request/question/lecture/id/${props.lectureId}`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: question,
                    }),
                }
            );
            if (response.ok) {
                const data = await response.text();
                setAnswer(data)
                console.log(data)
            } else {
                console.error('No have answer')
            }
        } catch (error) {
            console.error('Network error', error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleSummaryChange = async () => {
        try {
            const response = await fetch(`https://educa.theomnia.ru/api/summary/edit`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id : sumaryId,
                    lectureId : props.lectureId,
                    text : sumaryText
                })
            });
            if (response.ok) {
                setIsReaderModalOpen(false)
                setIsLectureReader(false)
                setCompleteModal(true);
            } else {
                console.error('Doest work')
            }
        } catch (error) {
            console.error('Network error', error)
        }
    }

    const handleLectureChange = async () => {
        try {
            const response = await fetch(`https://educa.theomnia.ru/api/lecture/edit/text/${props.lectureId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: lectureText
            });
            if (response.ok) {
                setIsLectureTextReader(false)
                setIsLectureReader(false)
                setCompleteModal(true);
            } else {
                console.error('Doest work')
            }
        } catch (error) {
            console.error('Network error', error)
        }
    }
    
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
                        : <motion.div
                            className="lecture-card--top__mark"
                            onClick={handleToggleMark}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            style={{cursor: "pointer", display: props.isTeacher ? "none" : ""}}
                            >
                            <svg
                                width="14"
                                height="24"
                                viewBox="0 0 14 24"
                                fill={isMarked ? "#FFF500" : "none"}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.409 0.501V0.105017L11.4242 0.500631C11.4391 0.500059 11.4546 0.5 11.482 0.5C12.3634 0.5 13.0806 1.2103 13.091 2.09179V22.8309L7.3916 17.3797L7.04603 17.0491L6.70043 17.3796L1 22.831V2.19538L1.00098 2.09276C1.00937 1.21189 1.72642 0.5 2.61 0.5C2.63907 0.5 2.6519 0.500103 2.6603 0.500484L2.67164 0.501H2.683H11.405H11.409Z"
                                    stroke="black"
                                />
                            </svg>
                        </motion.div>
                    }
                </div>
                <div className="lecture-card--meta">
                    <p className="lecture-card--meta__info">Предмет: {props.subjectName}</p>
                    <p className="lecture-card--meta__info">Курс: {Math.round(props.lectureSemester / 2)}</p>
                    <p className="lecture-card--meta__info">Семестр: {props.lectureSemester % 2 === 0 ? "Весна" : "Осень"}</p>
                </div>
            </div>
            {props.isTeacher
                ? <>{!props.lectureFiles
                    ? <div className="lecture-card--links">
                        <button className="lecture-card--link" onClick={() => setIsFilePinningModalOpen(true)}>Прикрепить файл</button>
                        <button className="lecture-card--link" onClick={() => setIsLectureReader(true)}>Посмотреть</button>
                    </div>
                    : <div className="lecture-card--links">
                        <button className="lecture-card--link" onClick={handleDownloadLecture}>Скачать лекцию</button>
                        <button className="lecture-card--link" onClick={() => setIsLectureReader(true)}>Посмотреть</button>
                        <button className="lecture-card--link" style={props.isTeacher ? {display: "none"} : {}} onClick={() => setIsQuestionModalOpen(true)}>Задать вопрос</button>
                    </div>
                }{}</>
                : <>{!props.lectureFiles
                    ? <div className="lecture-card--links">
                        <button className="lecture-card--link" onClick={() => {}}>Ожидайте настройки</button>
                    </div>
                    : <div className="lecture-card--links">
                        <button className="lecture-card--link" onClick={handleDownloadLecture}>Скачать лекцию</button>
                        <button className="lecture-card--link" onClick={() => setIsLectureReader(true)}>Посмотреть</button>
                        <button className="lecture-card--link" style={props.isTeacher ? {display: "none"} : {}} onClick={() => setIsQuestionModalOpen(true)}>Задать вопрос</button>
                    </div>
                }{}</>
            }
        </div>
        <AnimatePresence>
            { completeModal
                && <BaseModal onClose={() => setCompleteModal(false)}>
                    <div className='modal--details'>
                        <Complete/>
                    </div>
                </BaseModal>
            }
        </AnimatePresence>
        <AnimatePresence>
            {isLoading && (
                <BaseModal onClose={() => setIsLoading(false)}>
                    <div>Загрузка...</div>
                </BaseModal>
            )}
        </AnimatePresence>
        <AnimatePresence>
            {!isLoading && answer !== '' && (
                <BaseModal onClose={() => setAnswer('')}>
                    <div>{answer}</div>
                </BaseModal>
            )}
        </AnimatePresence>
        <AnimatePresence>
            {isQuestionModalOpen
                && <BaseModal onClose={() => setIsQuestionModalOpen(false)}>
                    <div className="lecture-download">
                        <h3 className="lecture-download--title">Задайте вопрос по лекции</h3>
                        <div className="lecture-download--buttons">
                            <FormInput inputType={"text"} labelName={"Введите вопрос"} animation={{
                                initial: {}, animate: {}, transition: {}
                            }} onChangeHandle={(e: ChangeEvent<HTMLInputElement>) => {
                                setQuestion(e.target.value)
                            } }/>
                            <FormSubmit inputType={"submit"} inputValue={"Задать"} animation={{
                                initial: {}, animate: {}, transition: {}}} clickHandle={handlQeuestion}/>
                        </div>
                    </div>
                </BaseModal>
            }
        </AnimatePresence>
        <AnimatePresence>
            {isLectureReader
                && <BaseModal onClose={() => setIsLectureReader(false)}>
                    <div className="lecture-download">
                        <h3 className="lecture-download--title">{props.lectureName}</h3>
                        <div className="lecture-download--buttons">
                            <button className="lecture-download--link" onClick={() => setIsLectureTextReader(true)}>Посмотреть лекцию</button>
                            <button className="lecture-download--link" onClick={props.lectureSummary ? handleGetSummary : () => {}}>{props.lectureSummary ? "Посмотреть конспект" : "Ожидайте генерацию конспекта"}</button>
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
                                <h3 className="lecture-conspect--title">{props.lectureName} - Коспект</h3>
                                <div className="lecture-conspect--heading__edit" onClick={() => setIsConspectEdit(true)}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.621 0.25 13.863 0.15C14.105 0.0500001 14.359 0 14.625 0C14.8917 0 15.15 0.0500001 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.771 2.4 17.863 2.65C17.955 2.9 18.0007 3.15 18 3.4C18 3.66667 17.9543 3.921 17.863 4.163C17.7717 4.405 17.6257 4.62567 17.425 4.825L4.25 18H0ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" />
                                    </svg>
                                </div>
                            </div>
                            : <h3 className="lecture-conspect--title">{props.lectureName} - Коспект</h3>
                        }
                        {isConspectEdit
                            ? <textarea onChange={(e) => setSummaryText(e.target.value)} className="lecture-conspect--text" name="" id="" style={{width: "calc(100% - 6px)", height: "300px", resize: "none"}}>
                                {sumaryText}
                            </textarea>
                            : <MarkdownEditor editable={false} initialText={sumaryText} />
                        }
                        {isConspectEdit
                            ? <FormSubmit inputType={"button"} inputValue={"Сохранить"} animation={{
                                initial: {},
                                animate: {},
                                transition: {}
                            }} clickHandle={handleSummaryChange} />
                            : <div></div>
                        }
                        
                    </div>
                </ConspectModal>
            }
        </AnimatePresence>
        <AnimatePresence>
            {isLectureTextReader
                && <ConspectModal onClose={() => {
                        setIsLectureTextReader(false)
                        setIsConspectEdit(false)
                    }}>
                    <div className="lecture-conspect">
                        {props.isTeacher
                            ? <div className="lecture-conspect--heading">
                                <h3 className="lecture-conspect--title">{props.lectureName} - Лекция</h3>
                                <div className="lecture-conspect--heading__edit" onClick={() => setIsConspectEdit(true)}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.621 0.25 13.863 0.15C14.105 0.0500001 14.359 0 14.625 0C14.8917 0 15.15 0.0500001 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.771 2.4 17.863 2.65C17.955 2.9 18.0007 3.15 18 3.4C18 3.66667 17.9543 3.921 17.863 4.163C17.7717 4.405 17.6257 4.62567 17.425 4.825L4.25 18H0ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" />
                                    </svg>
                                </div>
                            </div>
                            : <h3 className="lecture-conspect--title">{props.lectureName} - Лекция</h3>
                        }
                        {isConspectEdit
                            ? <textarea onChange={(e) => setLectureText(e.target.value)} className="lecture-conspect--text" name="" id="" style={{width: "calc(100% - 6px)", height: "300px", resize: "none"}}>
                                {lectureText}
                            </textarea>
                            : <MarkdownEditor editable={false} initialText={lectureText} />
                        }
                        {isConspectEdit
                            ? <FormSubmit inputType={"button"} inputValue={"Сохранить"} animation={{
                                initial: {},
                                animate: {},
                                transition: {}
                            }} clickHandle={handleLectureChange} />
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
                        <h3 className="lecture-download--tistle">{props.lectureName}</h3>
                        <div className="lecture-download--buttons">
                            <a className="lecture-download--link" href="">Удалить лекцию</a>
                            <a className="lecture-download--link" href="">Удалить конспект</a>
                        </div>
                    </div>
                </BaseModal>
            }
        </AnimatePresence>
        <AnimatePresence>
            {isFilePinningModalOpen
                && <BaseModal onClose={() => setIsFilePinningModalOpen(false)}>
                    <FileUpload lectureId={props.lectureId}/>
                </BaseModal>
            }
        </AnimatePresence>
    </>
}