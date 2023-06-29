import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import reducers from "../reducer";
import { configureStore } from "@reduxjs/toolkit";

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware();

const store = configureStore({
  reducer: reducers(history),
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(routeMiddleware),
});

export default store;
export { history };
