import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../shared/index";
import { Sidebar } from "../../futures/index";
import { useEffect } from "react";

import './styles.scss';

import dots from '../../assets/dots.svg';

export default function AppLayout() {
    const navigator = useNavigate()
    const user = useAppSelector((state) => state.user)

    useEffect(() => {
        if (user.userRole === "Guest") {
            navigator('/auth')
        }
    }, [user.userRole])

    return <main>
        <img className="main--dots" src={dots} alt="" />
        <section className="application">
            <div className="application--container">
                <Sidebar user={user}/>
                <Outlet />
            </div>
        </section>
    </main>
}