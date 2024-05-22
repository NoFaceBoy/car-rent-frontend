import ErrorPage from "elements/layout/Error/ErrorPage";
import ItemPage from "elements/layout/Main/Item/ItemPage";
import Catalog from "elements/layout/Main/Catalog/Catalog";
import Home from "elements/layout/Main/Home/Home";
import RootLayout from "elements/layout/RootLayout";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Cart from "elements/layout/Main/Cart/Cart";
import Success from "elements/layout/Main/Reservation/Success/Success";
import Footer from "elements/layout/Footer/Footer";
import Login from "elements/layout/Login/Login";
import Sign from "elements/layout/Login/Sign";
import Reservation from "elements/layout/Main/Reservation/Reservation";
import ReservationHistory from "elements/layout/Main/Reservation/ReservationHistory";



export default function Router() {


    return <RouterProvider router={createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <RootLayout><ErrorPage /></RootLayout>,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "/catalog",
                    element: <Catalog />
                },
                {
                    path: "/catalog/:id",
                    loader: ({ params }) => Number(params.id),
                    element: <ItemPage />
                },
                {
                    path: "/cart",
                    element: <Cart />
                },
                {
                    path: "/reservation",
                    element: <Reservation />
                },
                {
                    path: "/cart/success",
                    element: <Success />
                },
                {
                    path: "/reservation/history",
                    element: <ReservationHistory />
                }

            ]
        },
        {
            path: "/login",
            element: <><Outlet /><Footer /></>,
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: "sign",
                    element: <Sign />,
                }
            ]
        }


    ])} />;
}