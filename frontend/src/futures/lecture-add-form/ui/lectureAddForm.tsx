import { ChangeEvent, FormEvent, useState } from "react";
import { FormInput, FormSubmit } from "../../../shared/index";

import './styles.scss'

export const LectureAddForm = () => {
    const [lectureName, setLectureName] = useState<string>('')
    const [lectureFile, setLectureFile] = useState<File | null>(null)

    const [namingErrorHandle, setNamingErrorHandle] = useState<boolean>(false)
    const [fileErrorHandle, setFileErrorHandle] = useState<boolean>(false)

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (lectureName === '') {
            setNamingErrorHandle(true)
        }
        else if (!lectureFile) {
            setFileErrorHandle(true)
        }
        else if (lectureName.length !== 0 && lectureFile) {
            const formData = new FormData();
            formData.append('file', lectureFile);
            console.log(lectureFile)
        }
        console.log(lectureName)
    }

    return <form onSubmit={onSubmitHandler} className="lecture-add-form">
        <p className="lecture-add-form--title">Добавить лекцию</p>
        <div className="lecture-add-form--inputs">
            <FormInput inputType={'text'} labelName={'Наименование'} animation={{
                initial: {},
                animate: {},
                transition: {}
            }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                setLectureName(e.target.value)
            } } 
            errorHandle={namingErrorHandle}                  
            />
            <FormInput inputType={'file'} labelName={'Выберите файл'} animation={{
                initial: {},
                animate: {},
                transition: {}
            }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                if (e.target.files && e.target.files.length > 0) {
                    setLectureFile(e.target.files[0]);
                }
            } } 
            errorHandle={fileErrorHandle}                  
            />
        </div>
        <FormSubmit inputType={'submit'} inputValue={'Добавить'} animation={{
            initial: {},
            animate: {},
            transition: {}
        }}
        />
    </form>
}