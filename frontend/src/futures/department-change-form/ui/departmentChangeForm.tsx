import { ChangeEvent, FormEvent, useState } from "react"
import { BaseModal, Complete, FormInput, FormSubmit, useAppDispatch } from "../../../shared/index"
import { changeDepartmentInfo } from "../model/changeDepartment";
import { AnimatePresence } from "framer-motion";

import './styles.scss';

interface DepartmentChangeFormProps {
    departmentId : number;
    departmentName : string;
    departmentDirector : string;
    instituteId : number
}

export const DepartmentChangeForm = (props: DepartmentChangeFormProps) => {
    const dispatch = useAppDispatch()

    const [departmentName, setDepartmentName] = useState<string>(props.departmentName)
    const [departmentDirector, setDepartmentDirector] = useState<string>(props.departmentDirector)

    const [namingErrorHandle, setNamingErrorHandle] = useState<boolean>(false)
    const [directorErrorHandle, setDirectorErrorHandle] = useState<boolean>(false)

    const [completeModal, setCompleteModal] = useState<boolean>(false)

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (departmentName === "") {
            setNamingErrorHandle(true)
        }
        else if (departmentDirector === "") {
            setDirectorErrorHandle(true)
        }
        else if (departmentName.length !== 0 && departmentDirector.length !== 0) {
            dispatch(changeDepartmentInfo({
                id: props.departmentId, name: departmentName, director: departmentDirector, instituteId: props.instituteId
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
    }

    return <>
        <form onSubmit={onSubmitHandler} className="institute-change">
            <p className="institute-change--title">Редактировать информацию</p>
            <div className="institute-change--inputs">
                <FormInput inputType={'text'} labelName={'Наименование'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setDepartmentName(e.target.value)
                } } 
                errorHandle={namingErrorHandle}  
                inputValue={departmentName}                
                />
                <FormInput inputType={'text'} labelName={'ФИО Директора'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setDepartmentDirector(e.target.value)
                } } 
                errorHandle={directorErrorHandle}    
                inputValue={departmentDirector}              
                />
            </div>
            <FormSubmit inputType={'submit'} inputValue={'Сохранить'} animation={{
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