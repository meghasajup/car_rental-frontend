import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { HomePage } from "../pages/user/HomePage";
import { AboutPage } from "../pages/user/AboutPage";
import { LoginPage } from "../pages/user/LoginPage";
import { RegisterPage } from "../pages/user/RegisterPage";
import { ErrorPage } from "../pages/user/ErrorPage";
import { ContactPage } from "../pages/user/ContactPage";
import { UserLayout } from "../layout/UserLayout";
import { LoginHomePage } from "../pages/user/LoginHomePage";
import { CarPage } from "../pages/user/CarPage";
import { CarDetails } from "../pages/user/CarDetails";
import { UserAuth } from "./protectedRoutes/UserAuth";
import { ProfilePage } from "../pages/user/ProfilePage";
import { CartPage } from "../pages/user/CartPage";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { AdminHomePage } from "../pages/admin/AdminHomePage";
import { AdminLayout } from "../layout/AdminLayout";
import { AdminAuth } from "./protectedRoutes/AdminAuth";
import { AdminUserManagement } from "../pages/admin/AdminUserManagement";
import { AdminCarManagement } from "../pages/admin/AdminCarManagement";
import { AdminBookingManagement } from "../pages/admin/AdminBookingManagement";
import { AdminReviewManagement } from "../pages/admin/AdminReviewManagement";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { AdminCars } from "../pages/admin/AdminCars";
import { BookingPage } from "../pages/user/BookingPage"
import { PaymentPage } from "../pages/user/PaymentPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
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
    {
        path: "user",
        element: (
            <UserAuth>
                <UserLayout />
            </UserAuth>
        ),
        children: [
            {
                path: "home",
                element: <LoginHomePage />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "car",
                element: <CarPage />
            },
            {
                path: "cart",
                element: <CartPage />
            },
            {
                path: "car-details/:id",
                element: <CarDetails />
            },
            {
                path: "booking/:id",
                element: <BookingPage />
            },
            {
                path: "payment/:id",
                element: <PaymentPage />
            },
            {
                path: "contact",
                element: <ContactPage />
            },
        ]
    },
    {
        path: "admin-login",
        element: <AdminLoginPage />,
    },
    {
        path: "admin",
        element: (
            <AdminAuth>
                <AdminLayout />
            </AdminAuth>
        ),
        children: [
            {
                path: "admin-dashboard",
                element: <AdminHomePage />
            },
            {
                path: "user-management",
                element: <AdminUserManagement />
            },
            {
                path: "car-management",
                element: <AdminCarManagement />
            },
            {
                path: ""
            },
            {
                path: "booking-management",
                element: <AdminBookingManagement />
            },
            {
                path: "review-management",
                element: <AdminReviewManagement />
            },
            {
                path: "admin-profile",
                element: <AdminProfile />
            },
            {
                path: "admin-cars",
                element: <AdminCars />,
            }
        ]
    },
]);
