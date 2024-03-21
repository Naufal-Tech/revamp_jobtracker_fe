/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorComponent } from "./components";
import {
  AddJob,
  Admin,
  AllJob,
  DashboardLayout,
  EditJob,
  Error,
  ForgetPassword,
  HomeLayout,
  InvalidLink,
  Landing,
  Login,
  Profile,
  Register,
  ResetPassword,
  Stats,
  Verified,
} from "./pages";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { loader as adminLoader } from "./pages/Admin";
import { loader as allJobLoader } from "./pages/AllJob";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as editJobLoader } from "./pages/EditJob";
import { loader as statsLoader } from "./pages/Stats";

// Dark theme from index.css
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "verified",
        element: <Verified />,
      },
      {
        path: "invalid",
        element: <InvalidLink />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        errorElement: <ErrorComponent />,
        children: [
          {
            index: true,
            element: <Stats />,
            loader: statsLoader,
            errorElement: <ErrorComponent />,
          },
          {
            path: "add-job",
            element: <AddJob />,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
          },
          {
            path: "all-jobs",
            element: <AllJob />,
            loader: allJobLoader,
            errorElement: <ErrorComponent />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
            errorElement: <ErrorComponent />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
