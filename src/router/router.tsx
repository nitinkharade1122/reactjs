import { Suspense, lazy } from "react";
import { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import BaseLayout from "src/core";
import SidebarLayout from "src/core/layout/SidebarLayout";

import {
  ERROR_PAGE,
  LOGIN,
  SIGNUP,
  TRANSACTIONS,
} from "./../shared/constants/constants";
import { GuardedRoute } from "./guarded-routes";

import Dashboard from "src/modules/Dashboard/Dashboard";
import { SuspenseLoader } from "src/shared/components/index";
import * as ROUTES from "../shared/constants/routes";
import Auth from "src/auth/login/Auth";
import UserDashboard from "../modules/Dashboard/UserDashboard";
import ListOfTenants from "src/auth/login/ListOfTenants";

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Login = Loader(lazy(() => LOGIN));
const ErrorPage = Loader(lazy(() => ERROR_PAGE));

const SignUp = Loader(lazy(() => SIGNUP));

// Dashboards

const Transactions = Loader(lazy(() => TRANSACTIONS));

const routes: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.ADMIN_LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.AUTH,
        element: <Auth />,
      },
      {
        path: ROUTES.LIST_OF_TENANTS,
        element: <ListOfTenants />,
      },
    ],
  },

  {
    path: "signup",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "",
    element: <SidebarLayout />,
    children: [
      {
        path: ROUTES.TENANT,
        element: <Dashboard title="Tenant Management" />,
      },
      {
        path: ROUTES.USER,
        element: <Dashboard title="User Management" />,
      },
      {
        path: ROUTES.ROLE,
        element: <Dashboard title="Role Management" />,
      },
      {
        path: ROUTES.USER_DASHBOARD,
        element: <UserDashboard />,
      },
    ]
  },

  {
    path: ROUTES.ERROR_PAGE,
    element: <ErrorPage />,
  },
  {
    path: ROUTES.DASHBOARDS,
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={ROUTES.TRANSACTIONS} replace />,
      },
      {
        path: ROUTES.TRANSACTIONS,
        element: <GuardedRoute component={Transactions} />,
      },
    ],
  },
];

export default routes;
