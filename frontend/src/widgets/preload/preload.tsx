import { motion } from "framer-motion"
import { PreloadText, PreloadLines } from "../../shared/index"

import './styles.scss'

export const Preload = () => {
    return <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className='preloading'>
        <div className='preloading--content'>
            <h1 className='preloading--title'>
                <PreloadText text={"WELCOME"} />
            </h1>
            <PreloadLines/>
        </div>
    </motion.div>
}