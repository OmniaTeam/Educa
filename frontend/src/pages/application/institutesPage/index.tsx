import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/index";
import { Institutes } from "../../../widgets/institutes/index";
import { useNavigate } from "react-router-dom";
import { getInstitutes } from "./api/index";

export default function InstitutesPage() {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()

    const institutes = useAppSelector((state) => state.institutes)
    const user = useAppSelector((state) => state.user)

    useEffect(() => {
        if (user.userRole !== "Admin") {
            navigator('/auth')
        }
        else {
            dispatch(getInstitutes({})).unwrap()
            .catch((error : Error) => {
                console.log('message', error.message)
            })
        }
    }, [user.userRole, institutes])

    return <Institutes institutes={institutes} />
}