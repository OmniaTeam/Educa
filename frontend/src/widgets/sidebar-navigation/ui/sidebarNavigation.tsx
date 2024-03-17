import { motion } from 'framer-motion';
import { SidebarLink } from '../../../shared/ui/sidebar-link/index';
import { EUserRoles } from '../../../entities/index';
import { RoleHandler } from '../lib/roleHandler';

import './styles.scss';

interface SidebarNavigationProps {
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
    },
    userRole : EUserRoles
}

export const SidebarNavigation = (props: SidebarNavigationProps) => {
    const links = RoleHandler(props.userRole)
    return <motion.div className='sidebar-navigation'
        initial={{ opacity: props.animation.initial.opacity, x: props.animation.initial.x }}
        animate={{ opacity: props.animation.animate.opacity, x: props.animation.animate.x }}
        transition={{ duration: props.animation.transition.duration, delay: props.animation.transition.delay }}
    >
        { links?.map((value, index) => 
            <SidebarLink key={index} linkPath={value.linkPath} linkValue={value.linkValue}/>
        )}
    </motion.div>
}