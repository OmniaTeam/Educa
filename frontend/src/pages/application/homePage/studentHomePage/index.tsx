import { IStudent, IUser } from '../../../../entities/index';
import { WelcomeCard } from '../../../../shared/index';
// import { FavoritesBlock } from '../../../../widgets';

import './styles.scss';

interface StudentHomePageProps {
    user : IUser;
    student : IStudent;
}

export default function StudentHomePage(props: StudentHomePageProps) {
    return <div style={{
        height: "100%",
        overflowY: "scroll"
    }}>
        <WelcomeCard 
            userName={props.user.userFio.split(' ')[1]}
            userRole={props.user.userRole}
            userInstitute={props.student.studentInstitute}
            userDepartment={props.student.studentDepartment}
            userDirection={props.student.studentDirection}
        />
        {/* <div className='favorite-blocks'>
            <FavoritesBlock type={'subjects'} subjects={props.subjects} delay={0.2}/>
            <FavoritesBlock type={'lectures'} lectures={props.lectures} delay={0.3}/>
        </div> */}
    </div>
}