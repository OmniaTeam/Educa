import { motion } from "framer-motion"

export const PreloadLines = () => {
    return <div className='preloading--lines'>
        {[{ top: 16, height: 15 }, { top: 56, height: 10 }, { top: 86, height: 5 }, { top: 111, height: 5 }, { top: 136, height: 5 }].map((value, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                style={{
                    position: "absolute",
                    top: `${value.top}px`,
                    left: 0,
                    right: 0,
                    height: value.height,
                    backgroundColor: "#000000",
                }}
            ></motion.div>
        ))}
    </div>
}