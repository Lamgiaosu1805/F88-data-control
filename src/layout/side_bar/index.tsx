import { memo, useCallback } from "react";

import React from "react";
import { Menu, MenuProps } from "antd";
import { AppRoutes } from "@route/AppRoutes";
import Dashboard from "@assets/svg/dashboard.svg";
import { useNavigate } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		label,
		key,
		icon,
		children,
		type,
	} as MenuItem;
}

const items: MenuProps["items"] = [
	getItem("DashBoard", AppRoutes.dashboard),
	getItem("Quản lý nhân viên", "1", <></>, [
		getItem("Danh sách nhân viên", AppRoutes.staff.index),
		getItem("Giao việc", "Option 2"),
	]),
	getItem("Quản lý phòng ban", "department", <> </>, [
		getItem("Danh sách phòng ban", AppRoutes.department.index),
		// getItem("Giao việc", "Option 2"),
	]),
	//   getItem(
	//     "Users",
	//     "Users",
	//     <img src={Dashboard} width={20} height={"auto"} />,
	//     [
	//       getItem("User Management", "User Management"),
	//       getItem("Option 6", "6"),
	//       getItem("Submenu", "sub3", null, [
	//         getItem("Option 7", "7"),
	//         getItem("Option 8", "8"),
	//       ]),
	//     ]
	//   ),

	//   getItem("Catalog", "3", <img src={Dashboard} width={20} height={"auto"} />, [
	//     getItem("Option 9", "9"),
	//   ]),
	//   getItem("Dishes", "4", <img src={Dashboard} width={20} height={"auto"} />, [
	//     getItem("Dishes Managament", "10"),
	//   ]),
	//   getItem("ShipFree", "5", <img src={Dashboard} width={20} height={"auto"} />, [
	//     getItem("ShipFree Managament", "11"),
	//   ]),
	//   { type: "divider" },
];

const SideBar = memo(() => {
	const navigate = useNavigate();
	const onClick: MenuProps["onClick"] = useCallback(
		(e: any) => {
			//   navigate(e?.keyPath[0]);
			console.log("click ", e);
			console.log("click ", e?.keyPath[0]);
			if (e.key.includes("/")) {
				navigate(e?.key);
			}
		},
		[navigate]
	);
	return (
		<>
			<Menu
				onClick={onClick}
				style={{ width: "full", backgroundColor: "white", border: "none", paddingLeft: 12 }}
				defaultSelectedKeys={[AppRoutes.dashboard]}
				defaultOpenKeys={["DashBoard"]}
				mode="inline"
				items={items}
				// expandIcon={false}
			/>
		</>
	);
});
export default SideBar;
