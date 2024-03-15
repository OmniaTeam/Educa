import { IUser, ITeacher } from '../../../../entities/index';
import { WelcomeCard } from '../../../../shared/index';

import './styles.scss';

interface TeacherHomePageProps {
    user : IUser;
    teacher : ITeacher
}

export default function TeacherHomePage(props: TeacherHomePageProps) {
    return <div>
        <WelcomeCard 
            userName={props.user.userFio.split(' ')[1]}
            userRole={props.user.userRole}
            userInstitute={props.teacher.teacherInstitute}
            userDepartment={props.teacher.teacherDepartment}
            userPosition={props.teacher.teacherPosition}
        />
    </div>
}