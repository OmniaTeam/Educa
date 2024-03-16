import { ChangeEvent, FormEvent, useState } from "react"
import { BaseModal, Complete, FormInput, FormSubmit, useAppDispatch } from "../../../shared/index"
import { changeInstitute } from "../model/changeInstitute";

import './styles.scss';
import { AnimatePresence } from "framer-motion";

interface InstituteChangeFormProps {
    instituteId : number;
    instituteName : string;
    instituteDirector : string
}

export const InstituteChangeForm = (props: InstituteChangeFormProps) => {
    const dispatch = useAppDispatch()

    const [institueName, setInstituteName] = useState<string>(props.instituteName)
    const [instituteDirector, setInstituteDirector] = useState<string>(props.instituteDirector)

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
            dispatch(changeInstitute({id: props.instituteId, name: institueName, director: instituteDirector }))
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
                    setInstituteName(e.target.value)
                } } 
                errorHandle={namingErrorHandle}  
                inputValue={institueName}                
                />
                <FormInput inputType={'text'} labelName={'ФИО Директора'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setInstituteDirector(e.target.value)
                } } 
                errorHandle={directorErrorHandle}    
                inputValue={instituteDirector}              
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