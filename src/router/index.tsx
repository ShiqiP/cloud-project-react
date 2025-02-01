import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../page/Home'
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
                element: <Home />
            }
        ]
    },

])

export default router;