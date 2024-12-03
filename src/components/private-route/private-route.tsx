import { Fragment, memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "../../route/AppRoutes";
import { useAuthenticationStore } from "@hooks/authentication";

type Props = {
  isAuthRoute?: boolean;
  layout?: any;
  isPrivate?: boolean;
};
export const PrivateRoute = memo(
  ({ isAuthRoute, isPrivate, layout: Layout = Fragment }: Props) => {
    const { authenticationState } = useAuthenticationStore();
    if (isAuthRoute && authenticationState.user?.accessToken) {
      return <Navigate to={AppRoutes.dashboard} replace />;
    }
    if (isPrivate && !authenticationState.user?.accessToken) {
      return <Navigate to={AppRoutes.auth.login} replace />;
    }
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
);
