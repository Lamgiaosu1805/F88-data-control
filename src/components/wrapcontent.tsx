import { HomeOutlined } from "@ant-design/icons";
import { Grid, Paper } from "@mui/material";
import { AppRoutes } from "@route/AppRoutes";
import { Breadcrumb, Divider } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
type WrapContentType = PropsWithChildren<{
  rightHeaderNode: ReactNode | ReactElement;
  rightContentNode: ReactNode | ReactElement;
  breadCrumb: BreadcrumbItemType[];
  label: string;
}>;
export const WrapContent = (props: WrapContentType) => {
  return (
    <div style={{ padding: 24 }}>
      <Grid
        container
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
        sx={{ marginBottom: 1 }}
      >
        <Grid item>
          <Breadcrumb
            items={[
              {
                href: AppRoutes.dashboard,
                title: (
                  <>
                    <HomeOutlined style={{ color: "black" }} />
                    <span className="text-black">Trang chủ</span>
                  </>
                ),
              },
              ...props.breadCrumb,
            ]}
            style={{ marginBottom: 8 }}
            separator={<span className="text-black">{`>`}</span>}
          />
        </Grid>
        <Grid item>{props.rightHeaderNode}</Grid>
      </Grid>

      <Paper elevation={2} style={{ padding: 24, borderRadius: 16 }}>
        <Grid
          container
          sx={{ paddingTop: 1, paddingBottom: 1 }}
          justifyContent={"space-between"}
          direction={"row"}
          alignItems={"center"}
        >
          <Grid item>
            <h2 style={{ fontSize: 24, fontWeight: "500" }}>{props.label}</h2>
          </Grid>
          <Grid item>{props.rightContentNode}</Grid>
        </Grid>
        <Divider orientationMargin={2} style={{ backgroundColor: "#999999" }} />
        {props.children}
      </Paper>
    </div>
  );
};
