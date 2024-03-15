import { Route, Routes } from "react-router-dom";

import IndexPage from "./indexPage/index";
import AuthPage from "./authPage/index";
import AppLayout from "../app/layouts/appLayout";
import HomePage from "./application/homePage/index";
import SettingsPage from "./application/settingsPage/index";
import SubjectsPage from "./application/subjectsPage/index";
import SubjectPage from "./application/subjectPage/index";
import FavoritesPage from "./application/favoritesPage/index";

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" Component={IndexPage} />
            <Route path="/auth" Component={AuthPage} />
            <Route path="/application" Component={AppLayout}>
                <Route path="" Component={HomePage} />
                <Route path="subjects" Component={SubjectsPage} />
                <Route path="subject/:id" Component={SubjectPage} />
                <Route path="favorites" Component={FavoritesPage} />
                <Route path="settings" Component={SettingsPage} />
            </Route>
        </Routes>
    );
}