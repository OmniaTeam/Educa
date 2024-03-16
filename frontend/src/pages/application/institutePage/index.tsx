import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/index";
import { getDepartments, getInstitute } from "./api/index";
import { useEffect } from "react";
import { Departments } from "../../../widgets/index";

export default function InstitutePage() {
    const { id } = useParams()

    const dispatch = useAppDispatch()

    const departments = useAppSelector((state) => state.departments)
    const institute = useAppSelector((state) => state.institute)

    useEffect(() => {
        dispatch(getDepartments(Number(id))).unwrap()
        .then(() => {
            console.log("Deps: ", departments)
        })
        .catch((error : Error) => {
            console.log('message', error.message)
        })
        dispatch(getInstitute(Number(id))).unwrap()
        .then(() => {
            console.log("Inst: ", institute)
        })
        .catch((error : Error) => {
            console.log('message', error.message)
        })
    }, [departments, institute])

    return <Departments departments={departments} institute={institute} />
}