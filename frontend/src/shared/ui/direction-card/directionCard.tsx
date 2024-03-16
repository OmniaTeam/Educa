import { Link } from "react-router-dom";

import './styles.scss';

interface DirectionCardProps {
    directionName : string,
    directionId : number
}

export const DirectionCard = (props: DirectionCardProps) => {
    return <Link className="direction-card" to={`/application/direction/${props.directionId}`}>{props.directionName}</Link>
}