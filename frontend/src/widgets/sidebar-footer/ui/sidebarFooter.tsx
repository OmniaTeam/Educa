import { motion } from "framer-motion";

import { SidebarButton } from "../../../shared/ui/index";
import { SidebarLink } from "../../../shared/ui/index";

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
}

export const SidebarFooter = (props: SidebarFooterProps) => {
    return <motion.div 
        className="sidebar-footer"
        initial={{ opacity: props.animation.initial.opacity, x: props.animation.initial.x }}
        animate={{ opacity: props.animation.animate.opacity, x: props.animation.animate.x }}
        transition={{ duration: props.animation.transition.duration, delay: props.animation.transition.delay }}
    >
        <SidebarLink linkPath={""} linkValue={"Настройки"}/>
        <SidebarButton
            buttonValue={"Выйти"}
            onClickHandler={() => {}}
        />
    </motion.div>
}  