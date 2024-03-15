import { useAppSelector } from '../../../../shared/index';
import { Subjects } from '../../../../widgets/index';

import './styles.scss';

export default function TeacherSubjectsPage() {
    const subjects = useAppSelector((state) => state.subjects)

    return <Subjects subjects={subjects} isTeacher={true} />
}