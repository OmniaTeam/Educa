import { motion } from "framer-motion";
import { IUser } from "../../../entities/index";
import { SidebarNavigation } from "../../../widgets/index";
import { SidebarFooter } from "../../../widgets/index";

import './styles.scss';

interface SidebarProps {
    user: IUser
}

export const Sidebar = (props: SidebarProps) => {
    const onExitHandler = async () => await fetch(
        "https://educa.theomnia.ru/api/user/logout", {
            method: "GET",
            headers : {
                "Content-Type": "application/json",
            }
    }).then((result) => {if (result.ok) window.location.reload()})

    return <motion.div className="sidebar"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
    >
        <motion.h2 
            className="sidebar--heading"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
        >
            {props.user.userFio.split(' ')[0]} {props.user.userFio.split(' ')[1][0]}.{props.user.userFio.split(' ')[2][0]}.
        </motion.h2>
        <SidebarNavigation animation={{
            initial: {
                opacity: 0,
                x: -10
            },
            animate: {
                opacity: 1,
                x: 0
            },
            transition: {
                duration: 0.3,
                delay: 0.4
            }
        }} userRole={props.user.userRole}/>
        <SidebarFooter animation={{
            initial: {
                opacity: 0,
                x: -10
            },
            animate: {
                opacity: 1,
                x: 0
            },
            transition: {
                duration: 0.3,
                delay: 0.6
            }
        }} onClickHandler={onExitHandler}/>
    </motion.div>
}