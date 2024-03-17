import { AnimatePresence } from "framer-motion"
import { BaseModal, Complete, FormInput, FormSubmit, useAppDispatch } from "../../../shared/index"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { changeDirection } from "../index"

interface DirectionChangeFormProps {
    directionId : number
}

export const DirectionChangeForm = (props: DirectionChangeFormProps) => {
    const dispatch = useAppDispatch()

    const [directionName, setDirectionName] = useState<string>('')
    const [departmentId, setDepartmetId] = useState<number>(-1)
    const [namingErrorHandle, setNamingErrorHandle] = useState<boolean>(false)

    const [completeModal, setCompleteModal] = useState<boolean>(false)

    useEffect(() => {
        const fetchDirectionInfo = async () => {
            try {
                const response = await fetch(`https://educa.theomnia.ru/api/direction/get/id/${props.directionId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setDepartmetId(data.departmentId);
                } else {
                    console.error('Ошибка получения информации о направлении');
                }
            } catch (error : any) {
                console.error('Произошла ошибка:', error.message);
            }
        };

        fetchDirectionInfo();
    }, [props.directionId]);

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (directionName === "") {
            setNamingErrorHandle(true)
        }
        else {
            dispatch(changeDirection({ id: props.directionId, name: directionName, departmentId: departmentId }))
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