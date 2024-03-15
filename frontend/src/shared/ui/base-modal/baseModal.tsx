import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import './styles.scss';

interface BaseModalProps {
    onClose: () => void;
    children: ReactNode;
}

export const BaseModal = (props: BaseModalProps) => {
    return (
        <motion.div
            className="modal--overlay"
            onClick={props.onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="modal--content"
                key="modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
            >
                {props.children}
            </motion.div>
        </motion.div>
    );
};
