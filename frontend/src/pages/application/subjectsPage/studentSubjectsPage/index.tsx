import { useAppSelector } from '../../../../shared/index';
import { Subjects } from '../../../../widgets/index';

import './styles.scss';

export default function StudentSubjectsPage() {
    const subjects = useAppSelector((state) => state.subjects)

    console.log(subjects)

    return <Subjects subjects={subjects} />
}