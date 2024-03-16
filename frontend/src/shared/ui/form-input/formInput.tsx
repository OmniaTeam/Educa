import { ChangeEvent, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

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
    errorHandle?: boolean;
    inputValue?: string
}

export const FormInput = (props : FormInputProps) => {
    const [error, setError] = useState<boolean>(false);
    const controls = useAnimation();

    useEffect(() => {
        if (props.errorHandle) {
            setError(true);
            controls.start({
                x: [-15, 0, 15, 0],
                borderColor: '#D40808',
                transition: { 
                    type: "spring",
                    duration: 0.001,
                    damping: 5,
                    restDelta: 0.001 
                }
            });
        } else {
            setError(false);
            controls.start({
                borderColor: '#191818',
                transition: { 
                    type: "spring",
                    duration: 0.001,
                }
            });
        }
    }, [props.errorHandle, controls]);

    return <motion.div
        className="form-input"
        initial={{ opacity: props.animation.initial.opacity, x: props.animation.initial.x }}
        animate={{ opacity: props.animation.animate.opacity, x: props.animation.animate.x }}
        transition={{ duration: props.animation.transition.duration, delay: props.animation.transition.delay }}
    >
        <motion.input
            style={{
                border: error ? "2px solid #D40808" : "2px solid #191818",
            }}
            animate={controls}
            type={props.inputType}
            placeholder=""
            onChange={props.onChangeHandle}
            value={props.inputValue}
        />
        <motion.label animate={controls}>{props.labelName}</motion.label>
    </motion.div>
}

FormInput.displayName = 'FormInput';