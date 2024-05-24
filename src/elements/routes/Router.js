import ErrorPage from "elements/layout/Error/ErrorPage";
import Home from "elements/layout/Main/Home/Home";
import RootLayout from "elements/layout/RootLayout";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Success from "elements/layout/Main/Reservation/Success/Success";
import Footer from "elements/layout/Footer/Footer";
import Login from "elements/layout/Login/Login";
import Sign from "elements/layout/Login/Sign";
import Reservation from "elements/layout/Main/Reservation/Reservation";
import ReservationHistory from "elements/layout/Main/Reservation/ReservationHistory";
import CarListing from "elements/layout/Main/CarListing/CarListing";
import CarPage from "elements/layout/Main/Car/CarPage";
import CarEdit from "elements/layout/Main/Car/CarEdit";



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
                    path: "/cars",
                    element: <CarListing />
                },
                {
                    path: "/cars/:id",
                    loader: ({ params }) => Number(params.id),
                    element: <CarPage />
                },
                {
                    path: "/cars/:id/edit",
                    loader: ({ params }) => Number(params.id),
                    element: <CarEdit />
                },
                {
                    path: "/cars/add",
                    loader: () => null,
                    element: <CarEdit />
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