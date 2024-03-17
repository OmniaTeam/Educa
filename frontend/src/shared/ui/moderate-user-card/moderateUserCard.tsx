import { useState } from 'react';
import { BaseModal } from '../index';
import { AnimatePresence } from 'framer-motion';
import { ModerationSettings } from '../moderate-settings/index';

import './styles.scss';

interface ModerateUserCardProps {
    userFio : string,
    userId : number
}

export const ModerateUserCard = (props: ModerateUserCardProps) => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false)

    return <>
        <div className="moderate-user-card">
            <p className="moderate-user-card--name">{props.userFio}</p>
            <div className="moderate-user-card--settings" onClick={() => setIsSettingsModalOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.4298 10.98C17.4698 10.66 17.4998 10.34 17.4998 10C17.4998 9.66005 17.4698 9.34005 17.4298 9.02005L19.5398 7.37005C19.7298 7.22005 19.7798 6.95005 19.6598 6.73005L17.6598 3.27005C17.6009 3.16687 17.5071 3.08807 17.3953 3.04775C17.2836 3.00744 17.1611 3.00825 17.0498 3.05005L14.5598 4.05005C14.0398 3.65005 13.4798 3.32005 12.8698 3.07005L12.4898 0.420047C12.4733 0.302388 12.4144 0.194807 12.3242 0.117483C12.234 0.0401581 12.1186 -0.00159773 11.9998 4.67889e-05H7.99984C7.74984 4.67889e-05 7.53984 0.180047 7.50984 0.420047L7.12984 3.07005C6.51984 3.32005 5.95984 3.66005 5.43984 4.05005L2.94984 3.05005C2.89186 3.03038 2.83107 3.02024 2.76984 3.02005C2.59984 3.02005 2.42984 3.11005 2.33984 3.27005L0.339839 6.73005C0.209839 6.95005 0.26984 7.22005 0.45984 7.37005L2.56984 9.02005C2.52984 9.34005 2.49984 9.67005 2.49984 10C2.49984 10.33 2.52984 10.66 2.56984 10.98L0.45984 12.63C0.26984 12.78 0.219839 13.05 0.339839 13.27L2.33984 16.73C2.39879 16.8332 2.49256 16.912 2.60434 16.9523C2.71612 16.9927 2.8386 16.9918 2.94984 16.95L5.43984 15.95C5.95984 16.35 6.51984 16.68 7.12984 16.93L7.50984 19.58C7.53984 19.82 7.74984 20 7.99984 20H11.9998C12.2498 20 12.4598 19.82 12.4898 19.58L12.8698 16.93C13.4798 16.68 14.0398 16.34 14.5598 15.95L17.0498 16.95C17.1098 16.97 17.1698 16.98 17.2298 16.98C17.3998 16.98 17.5698 16.89 17.6598 16.73L19.6598 13.27C19.7798 13.05 19.7298 12.78 19.5398 12.63L17.4298 10.98ZM15.4498 9.27005C15.4898 9.58005 15.4998 9.79005 15.4998 10C15.4998 10.21 15.4798 10.43 15.4498 10.73L15.3098 11.86L16.1998 12.56L17.2798 13.4L16.5798 14.61L15.3098 14.1L14.2698 13.68L13.3698 14.36C12.9398 14.68 12.5298 14.92 12.1198 15.09L11.0598 15.52L10.8998 16.65L10.6998 18H9.29984L9.10984 16.65L8.94984 15.52L7.88984 15.09C7.45984 14.91 7.05984 14.68 6.65984 14.38L5.74984 13.68L4.68984 14.11L3.41984 14.62L2.71984 13.41L3.79984 12.57L4.68984 11.87L4.54984 10.74C4.51984 10.43 4.49984 10.2 4.49984 10C4.49984 9.80005 4.51984 9.57005 4.54984 9.27005L4.68984 8.14005L3.79984 7.44005L2.71984 6.60005L3.41984 5.39005L4.68984 5.90005L5.72984 6.32005L6.62984 5.64005C7.05984 5.32005 7.46984 5.08005 7.87984 4.91005L8.93984 4.48005L9.09984 3.35005L9.29984 2.00005H10.6898L10.8798 3.35005L11.0398 4.48005L12.0998 4.91005C12.5298 5.09005 12.9298 5.32005 13.3298 5.62005L14.2398 6.32005L15.2998 5.89005L16.5698 5.38005L17.2698 6.59005L16.1998 7.44005L15.3098 8.14005L15.4498 9.27005ZM9.99984 6.00005C7.78984 6.00005 5.99984 7.79005 5.99984 10C5.99984 12.21 7.78984 14 9.99984 14C12.2098 14 13.9998 12.21 13.9998 10C13.9998 7.79005 12.2098 6.00005 9.99984 6.00005ZM9.99984 12C8.89984 12 7.99984 11.1 7.99984 10C7.99984 8.90005 8.89984 8.00005 9.99984 8.00005C11.0998 8.00005 11.9998 8.90005 11.9998 10C11.9998 11.1 11.0998 12 9.99984 12Z" fill="black" />
                </svg>
            </div>
        </div>
        <AnimatePresence>
            {isSettingsModalOpen
                && <BaseModal onClose={() => setIsSettingsModalOpen(false)}>
                    <ModerationSettings/>
                </BaseModal>
            }
        </AnimatePresence>
    </>
}