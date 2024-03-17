import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import { FormInput } from "../../../shared/ui/index";
import { FormSubmit } from "../../../shared/ui/index";
import { useNavigate } from "react-router-dom";
import { setUserName, setUserRole, EUserRoles, setUserSurName, setUserLastName } from "../../../entities/user/index";
import { useAppDispatch } from "../../../shared/lib/index";

import './styles.scss';

export const Form = () => {
    const navigator = useNavigate()
    const dispatcher = useAppDispatch()

    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const handleSubmit = () => {
        if (userLogin === "student" && userPassword === "student") {
            dispatcher(setUserName("Student"))
            dispatcher(setUserRole(EUserRoles.student))
            dispatcher(setUserSurName("Student"))
            dispatcher(setUserLastName("Student"))
        }
        if (userLogin === "teacher" && userPassword === "teacher") {
            dispatcher(setUserName("Teacter"))
            dispatcher(setUserRole(EUserRoles.teacher))
            dispatcher(setUserSurName("Teacher"))
            dispatcher(setUserLastName("Teacher"))
        }
        if (userLogin === "admin" && userPassword === "admin") {
            dispatcher(setUserName("Admin"))
            dispatcher(setUserRole(EUserRoles.admin))
            dispatcher(setUserSurName("Admin"))
            dispatcher(setUserLastName("Admin"))
        }
        navigator('/application/')
    }

    return <motion.form
        onSubmit={handleSubmit}
        className="auth-form"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
    >
        <p className="auth-form--title">Войти</p>
        <FormInput inputType={'text'} labelName={'Логин'} animation={{
            initial: {
                opacity: 0,
                x: -30
            },
            animate: {
                opacity: 1,
                x: 0
            },
            transition: {
                duration: 0.5,
                delay: 0.3
            }
        }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
            setUserLogin(e.target.value);
        } }                    
        />
        <FormInput inputType={'password'} labelName={'Пароль'} animation={{
            initial: {
                opacity: 0,
                x: -30
            },
            animate: {
                opacity: 1,
                x: 0
            },
            transition: {
                duration: 0.5,
                delay: 0.4
            }
        }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
            setUserPassword(e.target.value);
        } }                    
        />
        <FormSubmit inputType={'submit'} inputValue={'Войти'} animation={{
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            transition: {
                duration: 0.5,
                delay: 0.5
            }
        }}
        />
    </motion.form>
}