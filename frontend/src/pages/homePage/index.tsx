import { motion } from "framer-motion";
import { getUserInfo } from "../../entities/user/model/selectors";

import './styles.scss';

export default function HomePage() {
    const user = getUserInfo();
    return <div className="home">
        <div className="home--heading">
            <motion.h1 className="home--heading__title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                👋 Привет, {user.userName}
            </motion.h1>
        </div>
    </div>
}