import { Outlet } from "react-router-dom";
import { Sidebar } from "../../futures/index";
import { getUserInfo } from "../../entities/user/model/selectors";

import './styles.scss';

export default function AppLayout() {
    const user = getUserInfo()

    return <main>
        <Sidebar user={user}/>
        <section className="application">
            <div className="application--container">
                <Outlet/>
            </div>
        </section>
    </main>
}