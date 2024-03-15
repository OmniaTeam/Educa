import { ReactNode } from "react";

import './styles.scss';

import dots from '../../../assets/dots.svg'

interface LandingLayoutProps {
    children : ReactNode
}

export const LandingLayout = (props: LandingLayoutProps) => {
    return <main className="main">
        <img className="main--dots" src={dots} alt="" />
        {props.children}
    </main>
}