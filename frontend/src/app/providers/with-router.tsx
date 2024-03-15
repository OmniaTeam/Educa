import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import { AuthProvider } from "./auth-provider/index";

const store = setupStore()

export const withRouter = (component: () => React.ReactNode) => () => (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AuthProvider>
                    {component()}
                </AuthProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
