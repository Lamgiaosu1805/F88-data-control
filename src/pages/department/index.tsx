import { memo, useEffect, useState } from "react";
import { AppRoutes } from "@route/AppRoutes";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Divider, Row } from "antd";
import Filter from "@assets/svg/filter.svg";
import AddStaff from "@assets/images/add_staff.png";
import { callApiCommon } from "@hooks/callAPI";
import { getDepartmentListApi } from "@api/department";
import { WrapContent } from "@components/wrapcontent";
import Delete from "@assets/svg/delete.svg";
interface DataType {
  createdAt: string;
  tenPhongBan: string;
  updatedAt: string;
  _id: string;
}

export const DepartmentList = memo(() => {
  const [list, setList] = useState<DataType[]>([]);
  const navigation = useNavigate();
  useEffect(() => {
    callApiCommon(
      getDepartmentListApi,
      undefined,
      true,
      (res) => {
        console.log("ress", res.result.listPhongBan);
        setList(res.result.listPhongBan);
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
          href: AppRoutes.department.index,
          title: <span className="text-black">Danh sách phòng ban</span>,
        },
      ]}
      label="Danh sách phòng ban"
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
          style={{
            backgroundImage: "linear-gradient(180deg, #ED2F1D, #B21E10)",
          }}
        >
          Thêm phòng ban
        </Button>
      }
    >
      {/* <Table<DataType> columns={columns} dataSource={list} rowKey={"_id"} /> */}
      <Row gutter={[20, 20]}>
        {list?.map((value, index) => {
          return (
            <Col key={index}>
              <Card
                // title="Default size card"
                // extra={<p>32 người</p>}
                style={{ width: 350, borderRadius: 16 }}
                hoverable
              >
                <Row justify={"space-between"} align={"middle"}>
                  <Col>
                    <span className="font-semibold text-black text-base">
                      {value?.tenPhongBan || ""}
                    </span>
                  </Col>
                  <Col>
                    <span>
                      {`${index + Math.round(Math.random() * 20)}`} người
                    </span>
                  </Col>
                </Row>
                <Divider
                  orientationMargin={8}
                  style={{ backgroundColor: "#999999", height: 1 }}
                />
                <Row justify={"space-between"} align={"middle"}>
                  <Col>
                    <span>Mã phòng</span>
                  </Col>
                  <Col>
                    <span className="font-semibold text-black text-base">
                      {value?._id?.slice(0, 10)}
                    </span>
                  </Col>
                </Row>
                <Row
                  justify={"space-between"}
                  align={"middle"}
                  className="mt-1"
                >
                  <Col>
                    <span>Trưởng phòng</span>
                  </Col>
                  <Col>
                    <span className="font-semibold text-black text-base">
                      Nghiêm Khắc Híu
                    </span>
                  </Col>
                </Row>
                <Row justify={"end"} className="mt-3">
                  <Button
                    iconPosition="start"
                    icon={<img src={Delete} />}
                    danger
                    type="primary"
                    style={{
                      // backgroundColor: "rgba(237, 47, 29, 1)",
                      borderWidth: 0,
                      borderRadius: 8,
                      backgroundImage:
                        "linear-gradient(180deg, #ED2F1D, #B21E10)",
                    }}
                  >
                    <span className="text-white font-semibold">Chỉnh sửa</span>
                  </Button>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </WrapContent>
  );
});
