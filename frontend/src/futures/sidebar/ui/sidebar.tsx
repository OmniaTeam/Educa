import { motion } from "framer-motion";

import { IUser } from "../../../entities/index";

import { SidebarNavigation } from "../../../widgets/index";
import { SidebarFooter } from "../../../widgets/index";


import './styles.scss';

interface SidebarProps {
    user: IUser
}

export const Sidebar = (props: SidebarProps) => {
    return <motion.div className="sidebar"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
    >
        <motion.h2 
            className="sidebar--heading"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
        >
            {props.user.userSurName} {props.user.userName[0]}.{props.user.userLastName[0]}.
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
                duration: 0.2,
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
                duration: 0.2,
                delay: 0.6
            }
        }}/>
    </motion.div>
}