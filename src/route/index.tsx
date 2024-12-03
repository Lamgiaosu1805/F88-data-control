import { createBrowserRouter } from "react-router-dom";
import { DashBoard } from "@pages/dashboard";
import { AppRoutes } from "./AppRoutes";
import { PrivateRoute } from "@components/private-route";
import { Login } from "@pages/auth/login";
import { WrapLayout } from "@layout/wrap-layout";
import { StaffList } from "@pages/staff";
import { DepartmentList } from "@pages/department";
import { CreateAndUpdateDepartment } from "@pages/department/create_update_department";
import { CreateAndUpdateStaff } from "@pages/staff/create_update_staff";

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
          path: AppRoutes.staff.index,
          element: <StaffList />,
        },
        {
          path: AppRoutes.staff.create_and_update,
          element: <CreateAndUpdateStaff />,
        },
        {
          path: AppRoutes.department.index,
          element: <DepartmentList />,
        },
        {
          path: AppRoutes.department.create_and_update,
          element: <CreateAndUpdateDepartment />,
        },
      ],
    },
  ]);
};
