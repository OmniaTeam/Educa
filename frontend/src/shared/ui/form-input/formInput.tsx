import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';

import './styles.scss';

interface FormInputProps {
    inputType : string;
    labelName : string;
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
    },
    onChangeHandle : (e : ChangeEvent<HTMLInputElement>) => void; 
}

export const FormInput = (props : FormInputProps) => {
    return <motion.div
        className="form-input"
        initial={{ opacity: props.animation.initial.opacity, x: props.animation.initial.x }}
        animate={{ opacity: props.animation.animate.opacity, x: props.animation.animate.x }}
        transition={{ duration: props.animation.transition.duration, delay: props.animation.transition.delay }}
    >
        <input
            type={props.inputType}
            placeholder=""
            onChange={props.onChangeHandle}
        />
        <label>{props.labelName}</label>
    </motion.div>
}

FormInput.displayName = 'FormInput';