import { AnimatePresence } from "framer-motion"
import { BaseModal, Complete, FormInput, FormSubmit } from "../../../shared/index"
import { ChangeEvent, FormEvent, useState } from "react"

import './styles.scss'

interface TeacherAddFormProps {
    departmentId : number
}

export const TeacherAddForm = (props : TeacherAddFormProps) => {
    const [teacherFio, setTeacherFio] = useState<string>('')
    const [teacherLogin, setTeacherLogin] = useState<string>('')
    const [teacherPassword, setTeacherPassword] = useState<string>('')
    const [teacherPosition, setTeacherPosition] = useState<string>('')

    const [namingErrorHandle, setNamingErrorHandle] = useState<boolean>(false)

    const [completeModal, setCompleteModal] = useState<boolean>(false)

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (teacherFio === "") {
            setNamingErrorHandle(true);
        } else {
            try {
                const response = await fetch('https://educa.theomnia.ru/api/admin/create/teacher', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fio: teacherFio,
                        login: teacherLogin,
                        password: teacherPassword,
                        position: teacherPosition, 
                        departmentId: props.departmentId
                    })
                });
                if (response.ok) {
                    setCompleteModal(true);
                } else {
                    console.error('Ошибка при создании студента:', response.statusText);
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
            }
        }
    };

    return <>
        <form onSubmit={onSubmitHandler} className="student-add">
            <p className="student-add--title">Создать преподавателя</p>
            <div className="student-add--inputs">
                <FormInput inputType={'text'} labelName={'Фио'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setTeacherFio(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                <FormInput inputType={'text'} labelName={'Логин'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setTeacherLogin(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                <FormInput inputType={'text'} labelName={'Пароль'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setTeacherPassword(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                <FormInput inputType={'text'} labelName={'Должность'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setTeacherPosition(e.target.value)
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