import { useEffect, useState } from "react";
import { ModerateUserCard } from "../../../shared/index";
import { motion } from "framer-motion";

import './styles.scss';

export const ModerationBlock = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://educa.theomnia.ru/api/admin/get/user/vkid");
                if (response.ok) {
                    const data = await response.json();
                    console.log("Data:", data)
                    setUsers(data);
                } else {
                    console.error("Failed to fetch users for moderation");
                    setUsers([{fio: "Фамилия Имя Отчество"}])
                }
            } catch (error) {
                console.error("Error fetching users for moderation:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="moderation-block">
            <h2 className="moderation-block--title">Ожидают модерации</h2>
            <div style={users.length === 0 ? {display: "none"} : {}} className="moderation-block--users">
                {users.map((user, index) => (
                    <ModerateUserCard key={index} userFio={user.fio} userId={user.id}/>
                ))}
            </div>
        </motion.div>
    );
};
