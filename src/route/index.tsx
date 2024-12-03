import { createBrowserRouter, Route } from "react-router-dom";
import { DashBoard } from "@pages/dashboard";
import { AppRoutes } from "./AppRoutes";
import { PrivateRoute } from "@components/private-route";
import { Login } from "@pages/auth/login";
import { WrapLayout } from "@layout/wrap-layout";
import CustomerList from "@pages/dashboard/customersList";

export const routerCMS = () => {
	return createBrowserRouter([
		{
			path: AppRoutes.auth.root,
			element: <PrivateRoute isAuthRoute isPrivate={false} />,
			children: [
				{
					path: AppRoutes.auth.login,
					element: <Login />,
				},
			],
		},
		{
			path: AppRoutes.home,
			element: <PrivateRoute isPrivate layout={WrapLayout} />,
			children: [
				{
					path: AppRoutes.dashboard,
					element: <DashBoard />,
				}, // staff management
				{
					path: AppRoutes.customers.list,
					element: <CustomerList />,
				},
			],
		},
	]);
};
