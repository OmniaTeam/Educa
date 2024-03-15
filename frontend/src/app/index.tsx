import { Routing } from "../pages/index";
import { withProviders } from "./providers/index";

import './index.scss';

const App = () => {
    return (
        <Routing />
    );
}

export default withProviders(App);