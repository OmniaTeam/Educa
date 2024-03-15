import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../../../../shared/index"
import { getUserInfo } from "../index"

interface AuthProviderProps {
    children : ReactNode
}

export const AuthProvider = (props: AuthProviderProps) => {
    const dispath = useAppDispatch()

    useEffect(() => {
        dispath(getUserInfo({})).unwrap()
        .catch((error : Error) => {
            console.log('message', error.message)
        })
    }, [])
    
    return (<>
        {props.children}
        {}
    </>)
}