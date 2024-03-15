import { useAppSelector } from "../../../shared/index";
import { FavoritesBlock } from "../../../widgets/index";

import './styles.scss';

export default function FavoritesPage() {
    const subjects = useAppSelector((state) => state.subjects)

    return <div className="favorites">
        <FavoritesBlock type={'subjects'} subjects={subjects} fullVer={true} delay={0.1}/>
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
        ]} fullVer={true} delay={0.2}/>
    </div>
}