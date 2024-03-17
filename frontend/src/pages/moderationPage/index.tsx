import { motion } from "framer-motion";
import { LandingLayout } from "../../shared/index";
import { Link } from "react-router-dom";

export default function ModerationPage() {
    return <LandingLayout>
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5}}
            className='hero'>
            <div className='hero--container'>
                <p className='hero--description'>
                    {"Ожидайте модерации".split('').map((value, index) => 
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + (index * 0.015) }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {value}
                        </motion.span>
                    )}
                </p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className='hero--link'
                >
                    <Link to="/auth">Войти в систему</Link>
                </motion.div>
            </div>
        </motion.section>
    </LandingLayout>
}