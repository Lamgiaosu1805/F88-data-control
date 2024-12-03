import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@route/AppRoutes";
import { useAuthenticationStore } from "@hooks/authentication";
import { Paper } from "@mui/material";
import { Table, TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Action",
    key: "action",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
export const DashBoard = memo(() => {
  const navigation = useNavigate();
  const { dispatchLogOut } = useAuthenticationStore();
  const onNavigateStaff = () => {
    navigation(AppRoutes.staff.index);
  };

  const onLogout = () => {
    // localStorage.removeItem(COMMONKEY.TOKEN)
    dispatchLogOut();
  };
  return (
    <div style={{ padding: 12 }}>
      <h1>Welcome to dashboard of VNFITE</h1>
      <button
        style={{
          borderWidth: 1,
          padding: "10px 20px",
          borderRadius: 8,
          backgroundColor: "blue",
        }}
        onClick={onNavigateStaff}
        type="button"
      >
        Staff
      </button>
      <button
        style={{
          borderWidth: 1,
          padding: "10px 20px",
          borderRadius: 8,
          backgroundColor: "blue",
        }}
        onClick={onLogout}
        type="button"
      >
        Logout
      </button>
      <Paper elevation={2} style={{ padding: 12, borderRadius: 16 }}>
        <Table<DataType> columns={columns} dataSource={data} />
      </Paper>
    </div>
  );
});
