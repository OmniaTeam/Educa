import { motion } from "framer-motion";

import { SidebarButton } from "../../../shared/index";
import { SidebarLink } from "../../../shared/index";

import './styles.scss';

interface SidebarFooterProps {
    animation : {
        initial : {
            opacity? : number,
            x? : number,
            y? : number
        },
        animate : {
            opacity? : number,
            x? : number,
            y? : number
        },
        transition : {
            duration? : number,
            delay? : number
        }
    }
    onClickHandler : () => void
}

export const SidebarFooter = (props: SidebarFooterProps) => {
    return <motion.div 
        className="sidebar-footer"
        initial={{ opacity: props.animation.initial.opacity, x: props.animation.initial.x }}
        animate={{ opacity: props.animation.animate.opacity, x: props.animation.animate.x }}
        transition={{ duration: props.animation.transition.duration, delay: props.animation.transition.delay }}
    >
        <SidebarLink linkPath={"settings"} linkValue={"Настройки"}/>
        <SidebarButton
            buttonValue={"Выйти"}
            onClickHandler={props.onClickHandler}
        />
    </motion.div>
}  