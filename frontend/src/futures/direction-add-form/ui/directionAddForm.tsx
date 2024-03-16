import { AnimatePresence } from "framer-motion"
import { BaseModal, Complete, FormInput, FormSubmit, useAppDispatch } from "../../../shared/index"
import { ChangeEvent, FormEvent, useState } from "react"
import { addDirection } from "../index"

interface DirectionAddForm {
    departmentId : number
}

export const DirectionAddForm = (props: DirectionAddForm) => {
    const dispatch = useAppDispatch()

    const [directionName, setDirectionName] = useState<string>('')
    const [namingErrorHandle, setNamingErrorHandle] = useState<boolean>(false)

    const [completeModal, setCompleteModal] = useState<boolean>(false)

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (directionName === "") {
            setNamingErrorHandle(true)
        }
        else {
            dispatch(addDirection({ name: directionName, departmentId: props.departmentId }))
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
                    setDirectionName(e.target.value)
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