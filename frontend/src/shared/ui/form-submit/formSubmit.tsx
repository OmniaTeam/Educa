import { motion } from "framer-motion";

import './styles.scss';

interface FormSubmitProps {
    inputType : string;
    inputValue : string;
    animation : {
        initial : {
            opacity?: number,
            x?: number,
            y?: number
        },
        animate : {
            opacity?: number,
            x?: number,
            y?: number
        },
        transition : {
            duration?: number,
            delay?: number
        }
    }
}

export const FormSubmit = (props : FormSubmitProps) => {
    return <motion.input
        className="form-submit"
        type={props.inputType}
        value={props.inputValue}
        initial={{ opacity: props.animation.initial.opacity }}
        animate={{ opacity: props.animation.animate.opacity }}
        transition={{ duration: props.animation.transition.duration, delay: props.animation.transition.delay }}
    />
}