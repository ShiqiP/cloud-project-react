import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from '../page/Main'
import Login from "../page/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/homepage',
                element: <Main />
            }
        ]
    },

])

export default router;