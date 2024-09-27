import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import HomeProductCategory from "../pages/HomeProductCategory";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Profile from "../pages/Profile";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import Dashboard from "../pages/Dashboard";
import ResetPassword from "../pages/ResetPassword";
import OrderPage from "../pages/OrderPage";
import Contact from "../pages/Contact";
import About from "../pages/About";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "password-reset/:userId/:token",
                element: <ResetPassword />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "product-category",
                element: <HomeProductCategory />
            },
            {
                path: "product/:id",
                element: <ProductDetail />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "orders",
                element: <OrderPage />
            },
            {
                path: "my-account",
                element: <Profile />
            },
            {
                path: 'success',
                element: <Success />
            },
            {
                path: "cancel",
                element: <Cancel />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "admin-dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    }
                ]
            },
            {
                path: "contact-us",
                element: <Contact />
            },
            {
                path: "about-us",
                element: <About />
            }
        ]
    }
])

export default router