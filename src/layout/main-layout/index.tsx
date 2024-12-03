import { Outlet } from "react-router-dom";
import { Layout } from "antd";

// import "./style.css";
import { PropsWithChildren } from "react";
type Props = PropsWithChildren<{}>;
export const MainLayout = (props: Props) => {
  // const [width, setWidth] = useState<number>(300);
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
