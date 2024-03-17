import { ChangeEvent, FormEvent, useState } from "react";
import { BaseModal, Complete, FormInput, FormSubmit, useAppDispatch } from "../../../shared/index";
import { addLectrue } from "../index";
import { AnimatePresence } from "framer-motion";

import './styles.scss'

interface LectureAddFormProps {
    subjectId : number
}

export const LectureAddForm = (props: LectureAddFormProps) => {
    const dispatch = useAppDispatch()

    const [lectureNameState, setLectureNameState] = useState<string>('')
    // const [lectureFile, setLectureFile] = useState<File | null>(null)

    const [namingErrorHandle, setNamingErrorHandle] = useState<boolean>(false)
    // const [fileErrorHandle, setFileErrorHandle] = useState<boolean>(false)

    const [completeModal, setCompleteModal] = useState<boolean>(false)

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (lectureNameState === '') {
            setNamingErrorHandle(true)
        }
        else if (lectureNameState.length !== 0) {
            dispatch(addLectrue({
                name: lectureNameState,
                subjectId: props.subjectId
            }))
            .then((result: any) => {
                const meta = result.meta;
                const requestStatus = meta.requestStatus;
                if (requestStatus === "fulfilled") {
                    setCompleteModal(true)
                }
                console.log('Статус запроса:', requestStatus);
            })
            .catch((error: any) => {
                console.error('Произошла ошибка:', error.message);
            });
        }
        // else if (!lectureFile) {
        //     setFileErrorHandle(true)
        // }
        // else if (lectureName.length !== 0 && lectureFile) {
        //     const formData = new FormData();
        //     formData.append('file', lectureFile);
        //     console.log(lectureFile)
        // }
        // console.log(lectureName)
    }

    return <>
        <form onSubmit={onSubmitHandler} className="lecture-add-form">
            <p className="lecture-add-form--title">Создать лекцию</p>
            <div className="lecture-add-form--inputs">
                <FormInput inputType={'text'} labelName={'Наименование'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setLectureNameState(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                {/* <FormInput inputType={'file'} labelName={'Выберите файл'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    if (e.target.files && e.target.files.length > 0) {
                        setLectureFile(e.target.files[0]);
                    }
                } } 
                errorHandle={fileErrorHandle}                  
                /> */}
            </div>
            <FormSubmit inputType={'submit'} inputValue={'Создать'} animation={{
                initial: {},
                animate: {},
                transition: {}
            }}
            />
        </form>
        <AnimatePresence>
            { completeModal
                && <BaseModal onClose={() => setCompleteModal(false)}>
                    <div className='modal--details'>
                        <Complete/>
                    </div>
                </BaseModal>
            }
        </AnimatePresence>
    </>
}