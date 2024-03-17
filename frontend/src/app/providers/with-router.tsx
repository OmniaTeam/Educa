import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store";

const store = setupStore()

export const withRouter = (component: () => React.ReactNode) => () => (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                {component()}
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
