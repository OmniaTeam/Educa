import { useAppSelector } from "../../../shared/index";
import { FavoritesBlock } from "../../../widgets/index";

import './styles.scss';

export default function FavoritesPage() {
    const subjects = useAppSelector((state) => state.subjects)
    const lectures = useAppSelector((state) => state.lectures)

    return <div className="favorites">
        <FavoritesBlock type={'subjects'} subjects={subjects} fullVer={true} delay={0.1}/>
        <FavoritesBlock type={'lectures'} lectures={lectures} fullVer={true} delay={0.2}/>
    </div>
}