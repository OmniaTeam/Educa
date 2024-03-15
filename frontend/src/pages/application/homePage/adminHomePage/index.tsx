import { IUser } from '../../../../entities/index';
import { WelcomeCard } from '../../../../shared/index';

import './styles.scss';

interface AdminHomePageProps {
    user : IUser;
}

export default function AdminHomePage(props: AdminHomePageProps) {
    return <div>
        <WelcomeCard userName={props.user.userFio.split(' ')[1]} userRole={props.user.userRole}/>
    </div>
}