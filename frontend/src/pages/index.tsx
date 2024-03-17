import { Route, Routes } from "react-router-dom";

import AuthPage from "./authPage/index";
import AppLayout from "../app/layouts/appLayout";
import HomePage from "./homePage/index";
import LessonsPage from "./lessonsPage/index";

export const Routing = () => {
    return (
        <Routes>
            <Route path="/auth" Component={AuthPage} />
            <Route path="/application" Component={AppLayout}>
                <Route path="" Component={HomePage} />
                <Route path="lessons" Component={LessonsPage} />
            </Route>
        </Routes>
    );
}