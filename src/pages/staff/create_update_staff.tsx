import { memo, useEffect, useState } from "react";
import { AppRoutes } from "@route/AppRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { getDepartmentListApi } from "@api/department";
import { callApiCommon } from "@hooks/callAPI";
import { DefaultOptionType } from "antd/es/select";
import { getPositionApi } from "@api/position";
import { createStaffApi } from "@api/staff";
import PopupNotification from "@helpers/popup-notification";
import { WrapContent } from "@components/wrapcontent";
import dayjs from "dayjs";
export const CreateAndUpdateStaff = memo(() => {
  const navigation = useNavigate();
  const { state } = useLocation();
  const isUpdate = state?.id ? "Cập nhật" : "Tạo";
  const [form] = useForm();
  const [department, setDepartment] = useState<DefaultOptionType[]>();
  const [position, setPosition] = useState<DefaultOptionType[]>();

  const OnSubmit = (value: any) => {
    value.ngayVaoLam = dayjs(value.ngayVaoLam["$d"]).format("DD/MM/YYYY");
    value.birth = dayjs(value.birth["$d"]).format("DD/MM/YYYY");
    console.log("values", value);
    callApiCommon(
      createStaffApi,
      value,
      true,
      (res) => {
        PopupNotification({
          type: "success",
          message: res.result.message,
        });
        form.resetFields();
      },
      (err) => {
        console.log(err);
        PopupNotification({
          type: "error",
          message: err?.message,
        });
      }
    );
  };
  useEffect(() => {
    callApiCommon(
      getDepartmentListApi,
      undefined,
      true,
      (res) => {
        setDepartment(
          res.result.listPhongBan?.map((value: any) => ({
            label: value.tenPhongBan,
            value: value._id,
          }))
        );
      },
      (err) => {
        console.log("erorr", err);
      }
    );
    callApiCommon(
      getPositionApi,
      undefined,
      true,
      (res) => {
        setPosition(
          res.result.listChucVu?.map((value: any) => ({
            label: value.tenChucVu,
            value: value._id,
          }))
        );
      },
      (err) => {
        console.log("erorr", err);
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
        {
          href: AppRoutes.staff.create_and_update,
          title: <span className="text-black">{`${isUpdate} nhân viên`}</span>,
        },
      ]}
      label={`${isUpdate} nhân viên`}
      rightContentNode={null}
      rightHeaderNode={null}
    >
      <Form onFinish={OnSubmit} name="form" form={form} layout="horizontal">
        <Row justify={"space-between"}>
          <Col span={10}>
            <Form.Item
              rules={[{ required: true, message: "Vui lòng nhập họ tên viên" }]}
              name="hoTen"
              required
              label="Họ và tên"
              hasFeedback
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
              name="birth"
              required
              label="Ngày sinh"
              hasFeedback
            >
              <DatePicker style={{ width: "100%" }} placeholder="Ngày sinh" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              name="gioiTinh"
              required
              label="Giới tính"
              hasFeedback
            >
              <Radio.Group>
                <Radio value="0">Nam</Radio>
                <Radio value="1">Nữ</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
                {
                  required: true,
                  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Vui lòng nhập đúng định dạng số điện thoại",
                },
              ]}
              name="sdt"
              required
              label="Số điện thoại"
              hasFeedback
            >
              <Input placeholder="Số điện thoại" maxLength={11} />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng nhập tên email" },
                {
                  required: true,
                  message: "Vui lòng nhập đúng định dạng email",
                  pattern: /^\S+@\S+\.\S+$/,
                },
              ]}
              name="email"
              required
              label="Email"
              hasFeedback
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              name="diaChi"
              required
              label="Địa chỉ"
              hasFeedback
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập căn cước công dân",
                },
                {
                  required: true,
                  min: 9,
                  message: "Căn cước công dân ít nhất 9 chữ số",
                },
                {
                  required: true,
                  pattern: /^[0-9]*$/,
                  message: "Vui lòng nhập đúng định dạng căn cước công dân",
                },
              ]}
              name="cccd"
              required
              label="Căn cước công dân"
              hasFeedback
            >
              <Input placeholder="Căn cước công dân" maxLength={12} />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng chọn ngày vào làm" },
              ]}
              name="ngayVaoLam"
              required
              label="Ngày vào làm"
              hasFeedback
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Ngày vào làm"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Vui lòng nhập chức vụ" }]}
              name="chucVu"
              required
              label="Chức vụ"
              hasFeedback
            >
              <Select placeholder="Chức vụ" options={position} />
            </Form.Item>
            <Form.Item
              // rules={[{ required: true, message: "Vui lòng chọn quyền" }]}
              name="roleId"
              // required
              label="Quyền"
              hasFeedback
            >
              <Input placeholder="roleId" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Vui lòng chọn phòng ban" }]}
              name="idPhongBan"
              required
              label="Phòng ban"
              hasFeedback
            >
              <Select placeholder="Chọn phòng ban" options={department} />
            </Form.Item>
          </Col>
        </Row>

        <Grid
          container
          sx={{ paddingTop: 1, paddingBottom: 1 }}
          justifyContent={"center"}
          direction={"row"}
          alignItems={"center"}
        >
          <Grid item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundImage: "linear-gradient(180deg, #ED2F1D, #B21E10)",
                borderWidth: 0,
                width: 233,
                height: 40,
              }}
            >
              <span className="font-medium text-sm">{`${isUpdate} nhân viên`}</span>
            </Button>
          </Grid>
        </Grid>
      </Form>
    </WrapContent>
  );
});