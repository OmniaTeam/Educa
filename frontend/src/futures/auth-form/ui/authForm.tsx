import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FormInput, FormSubmit, useAppDispatch, useAppSelector } from "../../../shared/index";
import { loginThunk } from "../model/index";
import { useNavigate } from "react-router-dom";

import './styles.scss';

export const AuthForm = () => {
    const dispatch = useAppDispatch()
    const navigator = useNavigate()

    const user = useAppSelector((state) => state.user)

    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errorHandle, setErrorHandle] = useState(false)

    useEffect(() => {
        if (user.userRole !== "Guest") {
            navigator('/application')
        }
    }, [user])

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (userLogin.length !== 0 && userPassword.length !== 0) {
            dispatch(loginThunk({ userLogin, userPassword }))
            .then((result: any) => {
                const meta = result.meta;
                const requestStatus = meta.requestStatus;
                if (requestStatus === 'rejected') {
                    setErrorHandle(true)
                }
                else if (requestStatus === "fulfilled") {
                    navigator('/application')
                }
                console.log('Статус запроса:', requestStatus);
            })
            .catch((error: any) => {
                console.error('Произошла ошибка:', error.message);
            });
        }
        setErrorHandle(true)
    }

    return <motion.form
        onSubmit={onSubmitHandler}
        className="auth-form"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
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
        errorHandle={errorHandle}     
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
        errorHandle={errorHandle}
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