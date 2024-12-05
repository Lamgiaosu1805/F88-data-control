import { listDataForDate } from "@api/authentication";
import { Paper } from "@mui/material";
import { Button, Table, Tag } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppRoutes } from "@route/AppRoutes";
const CustomerList = () => {
	const state = useLocation().state as any;
	const [data, setData] = useState<any>([]);
	const navigate = useNavigate();
	const date = useLocation().state.date;

	const columns = [
		{
			title: "Tên khách hàng",
			dataIndex: "full_name",
			key: "full_name",
			render: (name: string) => <p className="">{name.toUpperCase()}</p>,
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone_number",
			key: "phone_number",
		},
		{
			title: "Trạng thái chăm sóc",
			dataIndex: "status",
			key: "status",
			render: (status: number) => {
				let tag;

				switch (status) {
					case 4:
						tag = <Tag color="success">Đồng ý</Tag>;
						break;
					case 3:
						tag = <Tag color="error">Từ chối</Tag>;
						break;
					case 0:
						tag = <Tag color="warning">Chưa quyết định</Tag>;
						break;
					default:
						tag = <Tag color="default">Chưa chăm sóc</Tag>;
				}

				return tag;
			},
		},
		{
			title: "Thành phố",
			dataIndex: "city",
			key: "city",
		},
		{
			title: "Action",
			dataIndex: "_id",
			render: (id: string) => (
				<>
					<Button onClick={() => navigate(AppRoutes.customers.detail, { state: { id } })}>
						Chi tiết
					</Button>
				</>
			),
		},
	];

	useEffect(() => {
		const fetchData = async () => {
			const res = await listDataForDate(date);
			if (res.status == true) {
				const convertedData = res.result.data.map((item: any) => {
					return {
						...item.customer_info,
						status: item.status,
					};
				});

				setData(convertedData);
			}
		};

		fetchData();
	}, []);

	console.log("DAATAA", data);
	return (
		<div className="p-4">
			<Paper elevation={2} style={{ padding: 12, borderRadius: 16 }}>
				<h1 className="text-xl font-semibold mb-3">Danh sách khách hàng ngày {state.date}</h1>
				<Table columns={columns} dataSource={data} rowKey={"_id"} />
			</Paper>
		</div>
	);
};

export default CustomerList;
