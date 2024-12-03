import { memo, useEffect, useState } from "react";
import { AppRoutes } from "@route/AppRoutes";
import { useNavigate } from "react-router-dom";
import { Button, Table, TableProps } from "antd";
import Filter from "@assets/svg/filter.svg";
import AddStaff from "@assets/images/add_staff.png";
import { callApiCommon } from "@hooks/callAPI";
import { getStaffListApi } from "@api/staff";
import { WrapContent } from "@components/wrapcontent";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "STT",
    dataIndex: "maNV",
    render: (_, __, index) => index + 1,
    align: "center",
  },
  {
    title: "Mã nhân viên",
    dataIndex: "maNV",
    key: "maNV",
    align: "center",
  },
  {
    title: "Họ tên",
    dataIndex: "hoTen",
    key: "hoTen",
    align: "center",
  },
  {
    title: "Địa chỉ",
    dataIndex: "diaChi",
    key: "diaChi",
    align: "center",
  },
  {
    title: "Giới tính",
    key: "gioiTinh",
    dataIndex: "gioiTinh",
    render: (value) => (value == 1 ? "Nữ" : "Nam"),
    align: "center",
  },
  {
    title: "Phòng ban",
    key: "tenPhongBan",
    dataIndex: "tenPhongBan",
    align: "center",
  },
  {
    title: "Tên đăng nhập",
    key: "username",
    dataIndex: "username",
    align: "center",
  },
  {
    title: "Action",
    key: "action",
  },
];

export const StaffList = memo(() => {
  const [data, setData] = useState([]);

  const navigation = useNavigate();
  useEffect(() => {
    callApiCommon(
      getStaffListApi,
      undefined,
      true,
      (res) => {
        console.log("ress", res);
        setData(res.result.data);
      },
      (err) => {
        console.log("err", err);
      }
    );
  }, []);
  return (
    <WrapContent
      breadCrumb={[
        {
          href: AppRoutes.staff.index,
          title: <span className="text-black">Danh sách nhân viên</span>,
        },
      ]}
      label="Danh sách nhân viên"
      rightContentNode={<img src={Filter} />}
      rightHeaderNode={
        <Button
          type="primary"
          danger
          icon={<img src={AddStaff} />}
          size={"large"}
          onClick={() => {
            navigation(AppRoutes.staff.create_and_update);
          }}
          style={{
            backgroundImage: "linear-gradient(180deg, #ED2F1D, #B21E10)",
          }}
        >
          Thêm nhân viên
        </Button>
      }
    >
      <Table<DataType> columns={columns} dataSource={data} rowKey={"_id"} />
    </WrapContent>
  );
});
