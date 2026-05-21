import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPet from "../pages/AddPet";
import AllPets from "../pages/AllPets";
import MyListings from "../pages/MyListings";
import MyRequests from "../pages/MyRequests";
import PetDetails from "../pages/PetDetails";
import Wishlist from "../pages/Wishlist";
import PrivateRoute from "./PrivateRoute";
import FoundationPage from "../pages/FoundationPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pets",
        element: <AllPets />,
      },
      {
        path: "pets/:id",
        element: (
          <PrivateRoute>
            <PetDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <FoundationPage title="Dashboard" compact />,
      },
      {
        path: "my-requests",
        element: <MyRequests />,
      },
      {
        path: "add-pet",
        element: <AddPet />,
      },
      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
