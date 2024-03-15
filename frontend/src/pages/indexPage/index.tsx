import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LandingLayout } from '../../shared/index';
import { Preload } from '../../widgets/index';

import './styles.scss';

export default function IndexPage() {
    return (
        <LandingLayout>
            <Preload/>
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                className='hero'>
                <div className='hero--container'>
                    <h1 className='hero--title'>
                        {"EDUCA".split('').map((value, index) => 
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 2.2 + (index * 0.07) }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {value}
                            </motion.span>
                        )}
                    </h1>
                    <p className='hero--description'>
                        {"Легко учиться, удобно преподавать: ваше образование в одном месте".split('').map((value, index) => 
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 2.4 + (index * 0.015) }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {value}
                            </motion.span>
                        )}
                    </p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.8 }}
                        className='hero--link'
                    >
                        <Link to="/auth">Войти в систему</Link>
                    </motion.div>
                </div>
            </motion.section>
        </LandingLayout>
    );
}
