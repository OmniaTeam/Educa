import { motion } from 'framer-motion';

import './styles.scss';

interface WelcomeCardProps {
    userName : string;
    userRole : string;
    userInstitute? : string;
    userDepartment? : string;
    userDirection? : string;
    userPosition? : string
}

export const WelcomeCard = (props: WelcomeCardProps) => {
    return <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="welcome-card">
        <h2 className="welcome-card--title">👋 Привет, {props.userName}</h2>
        <div className="welcome-card--meta">
            <p className="welcome-card--meta__info">Статус: {
                props.userRole === "Student" ? "Студент" : "Сотдруник ЛГТУ"
            }</p>
            <p className="welcome-card--meta__info" style={{ display: props.userRole === "Admin" ? "none" : ""}}>Институт: {props.userInstitute}</p>
            <p className="welcome-card--meta__info" style={{ display: props.userRole === "Admin" ? "none" : ""}}>Кафедра: {props.userDepartment}</p>
            <p className="welcome-card--meta__info" style={{ display: (props.userRole === "Admin" || props.userRole === "Teacher") ? "none" : ""}}>Направление: {props.userDirection}</p>
            <p className="welcome-card--meta__info" style={{ display: props.userRole === "Student" ? "none" : ""}}>Должность: {
                props.userRole === "Admin" ? "Администратор сервиса" : props.userPosition
            }</p>
        </div>
    </motion.div>
}