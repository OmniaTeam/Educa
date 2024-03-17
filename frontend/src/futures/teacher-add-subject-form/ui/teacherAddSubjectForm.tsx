import { AnimatePresence } from "framer-motion"
import { BaseModal, Complete, FormInput, FormSubmit } from "../../../shared/index"
import { ChangeEvent, FormEvent, useState } from "react"
import { IDirections } from "../../../entities/index"

interface TeacherAddSubjectFormProps {
    directions : IDirections,
    teacherId : number
}

export const TeacherAddSubjectForm = (props: TeacherAddSubjectFormProps) => {
    const [selectedDirection, setSelectedDirection] = useState<number>(-1)
    const [subjectName, setSubjectName] = useState<string>('')
    const [subjectSemester, setSubjectSemester] = useState<string>('-1')

    const [completeModal, setCompleteModal] = useState<boolean>(false)

    const [namingErrorHandle, setNamingErrorHandle] = useState<boolean>(false)

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (subjectName === "") {
            setNamingErrorHandle(true);
        } else {
            try {
                const response = await fetch('https://educa.theomnia.ru/api/subject/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: null,
                        name: subjectName,
                        semester: Number(subjectSemester),
                        teacherId: props.teacherId, 
                        directionId: selectedDirection
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
            <p className="student-add--title">Создание предмета</p>
            <div className="student-add--inputs">
                <FormInput inputType={'text'} labelName={'Название'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setSubjectName(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                <FormInput inputType={'text'} labelName={'Семестр'} animation={{
                    initial: {},
                    animate: {},
                    transition: {}
                }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                    setSubjectSemester(e.target.value)
                } } 
                errorHandle={namingErrorHandle}                  
                />
                <select 
                style={{ padding: "16px 0", width: "100%", border: "2px solid #000000", borderRadius: "8px", fontSize: "16px", fontWeight: "700", letterSpacing: "0.05em", backgroundColor: "#ffffff" }}
                value={selectedDirection} onChange={(e: ChangeEvent<HTMLSelectElement>) => {setSelectedDirection(Number(e.target.value)), console.log(e.target.value, Number(e.target.value))}}>
                    <option value={-1}>Выберите направление</option>
                    {props.directions.directions.map((direction : any) => (
                        <option key={direction.id} value={direction.id}>{direction.name}</option>
                    ))}
                </select>
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