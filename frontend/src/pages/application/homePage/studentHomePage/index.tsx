import { IStudent, ISubjects, IUser } from '../../../../entities/index';
import { WelcomeCard } from '../../../../shared/index';
import { FavoritesBlock } from '../../../../widgets/index';

import './styles.scss';

interface StudentHomePageProps {
    user : IUser;
    student : IStudent;
    subjects : ISubjects
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
        <div className='favorite-blocks'>
            <FavoritesBlock type={'subjects'} subjects={props.subjects} delay={0.2}/>
            <FavoritesBlock type={'lectures'} lectures={[
                {
                    lectureId : 0,
                    lectureName : "Наименование предмета",
                    lectureTeacher : "ФИО Препода",
                    lectureSemester : 7
                },
                {
                    lectureId : 0,
                    lectureName : "Наименование предмета",
                    lectureTeacher : "ФИО Препода",
                    lectureSemester : 7
                },
                {
                    lectureId : 0,
                    lectureName : "Наименование предмета",
                    lectureTeacher : "ФИО Препода",
                    lectureSemester : 7
                },
                {
                    lectureId : 0,
                    lectureName : "Наименование предмета",
                    lectureTeacher : "ФИО Препода",
                    lectureSemester : 7
                }
            ]} delay={0.3}/>
        </div>
    </div>
}