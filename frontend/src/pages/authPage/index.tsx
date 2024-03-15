import { AuthForm } from "../../futures/index";
import { AuthHeader, LandingLayout } from "../../shared/index";

import './styles.scss';

export default function AuthPage() {
    return <LandingLayout>
        <AuthHeader />
        <section className="auth">
            <div className="auth--container">
                <AuthForm />
            </div>
        </section>
    </LandingLayout>
}