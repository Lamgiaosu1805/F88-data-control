import { memo, useEffect, useState } from "react";
import { AppRoutes } from "@route/AppRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Input,
  Table,
  TableProps,
} from "antd";
import Filter from "@assets/svg/filter.svg";
import AddStaff from "@assets/images/add_staff.png";
import { DownloadOutlined } from "@ant-design/icons";
import { callApiCommon } from "@hooks/callAPI";
import { createDepartmentApi, getDepartmentListApi } from "@api/department";
import { useForm } from "antd/es/form/Form";
import PopupNotification from "@helpers/popup-notification";
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
    dataIndex: "name",
    key: "name",
    render: (text, record, index) => index,
    align: "center",
    width: 20,
  },
  {
    title: "Tên phòng ban",
    dataIndex: "tenPhongBan",
    key: "tenPhongBan",
    width: 250,
    align: "center",
  },
  {
    title: "Tùy chọn",
    align: "center",
    dataIndex: "",
    key: "",
    render: (record) => {
      return record.id;
    },
  },
];
type FieldType = {
  tenPhongBan: string;
};
export const CreateAndUpdateDepartment = memo(() => {
  const navigation = useNavigate();
  const [form] = useForm();
  const { state } = useLocation();
  const isUpdate = state?.id ? "Cập nhật" : "Thêm";
  const OnSubmit = (value: FieldType) => {
    console.log("value", value);
    callApiCommon(
      createDepartmentApi,
      value,
      true,
      (res) => {
        if (res.status) {
          form.resetFields();
          PopupNotification({
            type: "success",
            message: res.result.message,
          });
        } else {
          PopupNotification({
            type: "error",
            message: res.result.message,
          });
        }
      },
      (err) => {
        PopupNotification({
          type: "error",
          message: err,
        });
      }
    );
  };

  return (
    <WrapContent
      breadCrumb={[
        {
          href: AppRoutes.department.index,
          title: <span className="text-black">Danh sách phòng ban</span>,
        },
        {
          href: AppRoutes.department.create_and_update,
          title: <span className="text-black">{`${isUpdate} phòng ban`}</span>,
        },
      ]}
      label={`${isUpdate} phòng ban`}
      rightContentNode={<img src={Filter} />}
      rightHeaderNode={
        <Button
          type="primary"
          danger
          icon={<img src={AddStaff} />}
          size={"large"}
          onClick={() => {
            navigation(AppRoutes.department.create_and_update);
          }}
        >
          Thêm phòng ban
        </Button>
      }
    >
      <div>
        <Form onFinish={OnSubmit} name="form" form={form} layout="vertical">
          <Form.Item<FieldType>
            rules={[{ required: true, message: "Vui lòng nhập tên phòng ban" }]}
            name="tenPhongBan"
            required
            label="Tên phòng ban"
            hasFeedback
          >
            <Input name="tenPhongBan" placeholder="Tên phòng ban" />
          </Form.Item>
          <Grid
            container
            sx={{ paddingTop: 1, paddingBottom: 1 }}
            justifyContent={"center"}
            direction={"row"}
            alignItems={"center"}
          >
            <Grid item>
              <Button danger type="primary" htmlType="submit">
                {`${isUpdate} phòng ban`}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </div>
    </WrapContent>
  );
});
