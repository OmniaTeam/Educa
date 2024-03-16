import { ChangeEvent, FormEvent, useState } from "react"
import { BaseModal, Complete, FormInput, FormSubmit, useAppDispatch } from "../../../shared/index"
import { addInstitute } from "../model/index"
import { AnimatePresence } from "framer-motion";

import './styles.scss';

export const InstituteAddForm = () => {
    const dispatch = useAppDispatch()

    const [institueName, setInstituteName] = useState<string>('')
    const [instituteDirector, setInstituteDirector] = useState<string>('')

    const [namingErrorHandle, setNamingErrorHandle] = useState<boolean>(false)
    const [directorErrorHandle, setDirectorErrorHandle] = useState<boolean>(false)

    const [completeModal, setCompleteModal] = useState<boolean>(false)

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (institueName === "") {
            setNamingErrorHandle(true)
        }
        else if (instituteDirector === "") {
            setDirectorErrorHandle(true)
        }
        else if (institueName.length !== 0 && instituteDirector.length !== 0) {
            dispatch(addInstitute({ name: institueName, director: instituteDirector }))
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
        <form onSubmit={onSubmitHandler} className="institutes-add">
            <p className="institutes-add--title">Создать институт</p>
            <div className="institutes-add--inputs">
                <FormInput inputType={'text'} labelName={'Наименование'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setInstituteName(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                <FormInput inputType={'text'} labelName={'ФИО Директора'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setInstituteDirector(e.target.value)
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