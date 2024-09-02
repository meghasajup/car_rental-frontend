import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { HomePage } from "../pages/user/HomePage";
import { AboutPage } from "../pages/user/AboutPage";
import { LoginPage } from "../pages/user/LoginPage";
import { RegisterPage } from "../pages/user/RegisterPage";
import { ErrorPage } from "../pages/user/ErrorPage";
import { ContactPage } from "../pages/user/ContactPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "contact",
                element: <ContactPage />
            }
        ],
    },
])