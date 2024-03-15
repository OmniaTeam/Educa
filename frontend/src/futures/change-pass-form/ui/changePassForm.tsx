import { motion } from 'framer-motion';
import { FormInput, FormSubmit, useAppDispatch } from '../../../shared/index';
import { ChangeEvent, FormEvent, useState } from 'react';
import { changePassThunk } from '../model/index';

import './styles.scss';

export const ChangePassForm = () => {
    const dispatch = useAppDispatch();

    const [userPassword, setUserPassword] = useState<string>('')
    const [userConfirmPassword, setUserConfirmPassword] = useState<string>('')
    const [userNewPassword, setUserNewPassword] = useState<string>('')
    const [oldPasswordErrorHandle, setOldPasswordErrorHandle] = useState<boolean>(false)
    const [newPasswordErrorHandle, setNewPasswordErrorHandle] = useState<boolean>(false)
    const [confirmPasswordErrorHandle, setConfirmPasswordErrorHandle] = useState<boolean>(false)

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (userPassword === '') {
            setOldPasswordErrorHandle(true)
        }
        else if (userNewPassword === '') {
            setNewPasswordErrorHandle(true)
        }
        else if (userConfirmPassword === '') {
            setConfirmPasswordErrorHandle(true)
        }
        else if (userNewPassword !== userConfirmPassword) {
            setNewPasswordErrorHandle(true)
            setConfirmPasswordErrorHandle(true)
        }
        else if (userPassword.length !== 0 && userNewPassword.length !== 0 && userConfirmPassword.length !== 0 && userNewPassword === userConfirmPassword) {
            dispatch(changePassThunk({ oldPassword: userPassword, newPassword: userNewPassword }))
            .then((result: any) => {
                const meta = result.meta;
                const requestStatus = meta.requestStatus;
                console.log('Статус запроса:', requestStatus);
            })
            .catch((error: any) => {
                console.error('Произошла ошибка:', error.message);
            });

            console.log("changed", userConfirmPassword, userNewPassword);
        }
    }
    return <motion.form
        onSubmit={onSubmitHandler}
        className="change-form"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
    >
        <p className="change-form--title">Изменение пароля</p>
        <div className='change-form--inputs'>
            <FormInput inputType={'password'} labelName={'Старый пароль'} animation={{
                initial: {
                    opacity: 0,
                    x: -30
                },
                animate: {
                    opacity: 1,
                    x: 0
                },
                transition: {
                    duration: 0.3,
                    delay: 0.2
                }
            }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                setUserPassword(e.target.value);
            } } 
            errorHandle={oldPasswordErrorHandle}                  
            />
            <FormInput inputType={'password'} labelName={'Новый пароль'} animation={{
                initial: {
                    opacity: 0,
                    x: -30
                },
                animate: {
                    opacity: 1,
                    x: 0
                },
                transition: {
                    duration: 0.3,
                    delay: 0.3
                }
            }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                setUserNewPassword(e.target.value);
            } }
            errorHandle={newPasswordErrorHandle}  
            />
            <FormInput inputType={'password'} labelName={'Подтвердите новый пароль'} animation={{
                initial: {
                    opacity: 0,
                    x: -30
                },
                animate: {
                    opacity: 1,
                    x: 0
                },
                transition: {
                    duration: 0.3,
                    delay: 0.4
                }
            }} onChangeHandle={function (e: ChangeEvent<HTMLInputElement>): void {
                setUserConfirmPassword(e.target.value);
            } }
            errorHandle={confirmPasswordErrorHandle}
            />
        </div>
        <FormSubmit inputType={'submit'} inputValue={'Изменить'} animation={{
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            transition: {
                duration: 0.3,
                delay: 0.5
            }
        }}
        />
    </motion.form>
}