import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import PrivateProtected from "./features/auth/components/PrivateProtected";
import PublicProtected from "./features/auth/components/PublicProtected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicProtected />,
        children: [
            {
                index: true,
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    },

    {
        path: "/main",
        element: <PrivateProtected />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "interview/:interviewId",
                element: <Interview />
            }
        ]
    }
]);