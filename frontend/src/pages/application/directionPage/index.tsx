import { useParams } from "react-router-dom";
import { DirectionBlock } from "../../../widgets/direction-block/index";
import { useAppDispatch, useAppSelector } from "../../../shared/index";
import { useEffect } from "react";
import { getDirection } from "./api/index";

import './styles.scss';

export default function DireactionPage() {
    const { id } = useParams()

    const dispatch = useAppDispatch()

    const direction = useAppSelector((state) => state.direction)

    useEffect(() => {
        dispatch(getDirection(Number(id))).unwrap()
        .then(() => {
            console.log("Direction: ", direction)
        })
        .catch((error : Error) => {
            console.log('message', error.message)
        })
    }, [direction])
    
    return <div className="direction-page" style={{ width: "100%", height: "100%", overflowY: "scroll" }}>
        <DirectionBlock direction={direction} />
    </div>
}