import { motion } from 'framer-motion';
import { Form } from '../../futures/index';

import "./styles.scss"

export default function AuthPage() {
    return <main>
        <motion.section
            className="auth"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <Form/>
        </motion.section>
    </main>
}