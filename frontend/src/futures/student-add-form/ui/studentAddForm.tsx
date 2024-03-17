import { AnimatePresence } from "framer-motion"
import { BaseModal, Complete, FormInput, FormSubmit } from "../../../shared/index"
import { ChangeEvent, FormEvent, useState } from "react"

import './styles.scss'

interface StudentAddFormProps {
    directionId : number
}

export const StudentAddForm = (props : StudentAddFormProps) => {
    const [studentFio, setStudentFio] = useState<string>('')
    const [studentLogin, setStudentLogin] = useState<string>('')
    const [studentPassword, setStudentPassword] = useState<string>('')
    const [studentSemester, setStudentSemester] = useState<string>('-1')

    const [namingErrorHandle, setNamingErrorHandle] = useState<boolean>(false)

    const [completeModal, setCompleteModal] = useState<boolean>(false)

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (studentFio === "") {
            setNamingErrorHandle(true);
        } else {
            try {
                const response = await fetch('https://educa.theomnia.ru/api/admin/create/student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fio: studentFio,
                        login: studentLogin, // замените на свои данные
                        password: studentPassword, // замените на свои данные
                        semesterNumber: Number(studentSemester), // укажите нужный семестр
                        directionId: props.directionId // укажите нужный ID направления
                    })
                });
                if (response.ok) {
                    setCompleteModal(true); // Показать модальное окно об успешном создании студента
                } else {
                    // Обработка ошибки
                    console.error('Ошибка при создании студента:', response.statusText);
                }
            } catch (error) {
                // Обработка сетевой ошибки
                console.error('Ошибка сети:', error);
            }
        }
    };

    return <>
        <form onSubmit={onSubmitHandler} className="student-add">
            <p className="student-add--title">Создать студента</p>
            <div className="student-add--inputs">
                <FormInput inputType={'text'} labelName={'Фио'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setStudentFio(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                <FormInput inputType={'text'} labelName={'Логин'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setStudentLogin(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                <FormInput inputType={'text'} labelName={'Пароль'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setStudentPassword(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                <FormInput inputType={'text'} labelName={'Семестр'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setStudentSemester(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
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