import { AnimatePresence, motion } from "framer-motion"

export const PreloadText = (props: { text: string }) => {
    return <AnimatePresence>
        {props.text.split('').map((value, index) => 
            <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.07) }}
                exit={{ opacity: 0, y: -10 }}
            >
                {value}
            </motion.span>
        )}
    </AnimatePresence>
}