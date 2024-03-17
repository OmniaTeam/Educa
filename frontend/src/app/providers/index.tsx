import { withRouter } from "./with-router";

import compose from "compose-function";

export * from './store';
export const withProviders = compose(withRouter);
