import { motion } from "framer-motion";

export const Complete = () => {
    return <div className="complete-screen" style={{ width: 100 }}>
        <svg viewBox="0 0 53.19 53.19">
            <g>
                <motion.circle
                    stroke="#51e051"
                    strokeWidth={3}
                    fill="transparent"
                    cx={26.59}
                    cy={26.59}
                    r={24}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                />
                <motion.path
                    stroke="#51e051"
                    strokeWidth={3}
                    strokeLinecap="round"
                    fill="transparent"
                    d="M12.29 26.59l10.98 10.42 17.49-18.23"
                    initial={{ opacity: 0, pathLength: 0, pathOffset: 1 }}
                    animate={{ opacity: 1, pathLength: 1, pathOffset: 0 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.5
                    }}
                />
            </g>
        </svg>
    </div>
}