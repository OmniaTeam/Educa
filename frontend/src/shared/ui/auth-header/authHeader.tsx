import { motion } from 'framer-motion';

import './styles.scss';
import { useNavigate } from 'react-router-dom';

export const AuthHeader = () => {
    const navigator = useNavigate();

    return (
        <header className='auth-header'>
            <div className="auth-header--container">
                <motion.h2
                    onClick={() => {navigator('/')}}
                    style={{ cursor: "pointer" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }} // Используем кривую easeOut
                    className='auth-header--container__title'
                >
                    EDUCA
                </motion.h2>
                <motion.div
                    className='auth-header--container__line'
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.4, type: "tween", ease: "easeInOut" }} // Используем кривую easeInOut
                ></motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }} // Используем кривую easeOut
                    className='auth-header--container__title'
                >
                    OMNIA
                </motion.h2>
            </div>
        </header>
    );
}
