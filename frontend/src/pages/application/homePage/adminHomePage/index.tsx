import { IUser } from '../../../../entities/index';
import { WelcomeCard } from '../../../../shared/index';
import { ModerationBlock } from '../../../../widgets/index';

import './styles.scss';

interface AdminHomePageProps {
    user : IUser;
}

export default function AdminHomePage(props: AdminHomePageProps) {
    return <div className='admin-home-page' style={{width: "100%", height: "100%", overflowY: "scroll"}}>
        <WelcomeCard userName={props.user.userFio.split(' ')[1]} userRole={props.user.userRole}/>
        <ModerationBlock/>
    </div>
}