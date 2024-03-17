import { motion } from 'framer-motion';
import { Lessons } from '../../widgets/index';

import './styles.scss';

export default function LessonsPage() {
    return <div className='lessons'>
        <div className='lessons--attestations'>
            <motion.h2 className='lessons--attestations__title'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Аттестации
            </motion.h2>
            <Lessons/>
        </div>
        <div className='lessons--exams'>
            <motion.h2 className='lessons--exams__title'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                Экзамен
            </motion.h2>
        </div>
    </div>
}