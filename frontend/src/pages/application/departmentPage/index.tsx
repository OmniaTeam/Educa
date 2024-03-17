import { useParams } from 'react-router-dom';
import { DepartmentBlock } from '../../../widgets/index';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/index';
import { getDepartment } from './api/index';

import './styles.scss';
import { getDirections } from './api/getDirections';

export default function DepartmentPage() {
    const { id } = useParams()

    const dispatch = useAppDispatch()

    const department = useAppSelector((state) => state.department)
    const directions = useAppSelector((state) => state.directions)

    useEffect(() => {
        dispatch(getDepartment(Number(id))).unwrap()
        dispatch(getDirections(Number(id))).unwrap()
    }, [department, directions])

    return <div className='department-page' style={{ width: "100%", height: "100%", overflowY: "scroll" }}>
        <DepartmentBlock department={department} directions={directions}/>
    </div>
}