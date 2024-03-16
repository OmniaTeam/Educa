import { ChangeEvent, FormEvent, useState } from "react"
import { BaseModal, Complete, FormInput, FormSubmit, useAppDispatch, useAppSelector } from "../../../shared/index"
import { addDepartment } from "../model/index"
import { AnimatePresence } from "framer-motion";

import './styles.scss';

export const DepartmentAddForm = () => {
    const dispatch = useAppDispatch()

    const institute = useAppSelector((state) => state.institute)

    const [departmentName, setDepartmentName] = useState<string>('')
    const [instituteDirector, setDepartmentDirector] = useState<string>('')

    const [namingErrorHandle, setNamingErrorHandle] = useState<boolean>(false)
    const [directorErrorHandle, setDirectorErrorHandle] = useState<boolean>(false)

    const [completeModal, setCompleteModal] = useState<boolean>(false)

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (departmentName === "") {
            setNamingErrorHandle(true)
        }
        else if (instituteDirector === "") {
            setDirectorErrorHandle(true)
        }
        else if (departmentName.length !== 0 && instituteDirector.length !== 0) {
            dispatch(addDepartment({ name: departmentName, director: instituteDirector, instituteId: institute.instituteId }))
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
    }

    return <>
        <form onSubmit={onSubmitHandler} className="department-add">
            <p className="department-add--title">Создать кафедру</p>
            <div className="department-add--inputs">
                <FormInput inputType={'text'} labelName={'Наименование'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setDepartmentName(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                <FormInput inputType={'text'} labelName={'ФИО Заведующего'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setDepartmentDirector(e.target.value)
                } } 
                errorHandle={directorErrorHandle}                  
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