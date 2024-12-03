import { Spin } from "antd";
import { PropsWithChildren, Suspense, memo } from "react";
// import "./style.css";
import NavigationScroll from "@layout/scroll.tsx";
import LogoWithText from "../assets/svg/logo_with_text.svg";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import SideBar from "./side_bar";
import NotificationHeader from "@components/notification";
import SettingHeader from "@components/setting";
type Props = PropsWithChildren<{ customStyle?: React.CSSProperties }>;
export const WrapLayout = memo(({ children }: Props) => {
	return (
		<NavigationScroll>
			<Suspense fallback={<Spin />}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: 20,
					}}
				>
					<div>
						<img src={LogoWithText} width={200} height={"auto"} alt="" />
					</div>
					<div>
						<div
							style={{
								borderRadius: 16,
								borderColor: "#ED2F1D",
								borderWidth: 1,
								padding: "12px 16px",
								display: "flex",
								columnGap: 16,
								backgroundColor: "#F4DEDE33",
							}}
						>
							<NotificationHeader />
							<SettingHeader />
							<Avatar
								alt="Remy Sharp"
								src="/static/images/avatar/1.jpg"
								style={{ width: 32, height: 32 }}
							/>
						</div>
					</div>
				</div>
				<Grid container spacing={0}>
					<Grid item xs={3} sm={3} md={4} lg={3} xl={2}>
						<div style={{}}>
							<SideBar />
						</div>
					</Grid>
					<Grid item xs={9} sm={9} md={8} lg={9} xl={10}>
						<div style={{ flexGrow: 1 }}>{children}</div>
					</Grid>
				</Grid>
			</Suspense>
		</NavigationScroll>
	);
});
