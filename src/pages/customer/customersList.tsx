import { listDataForDate } from "@api/authentication";
import { Paper } from "@mui/material";
import { Button, Table } from "antd";
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
		// {
		// 	title: "Email",
		// 	dataIndex: "mail",
		// 	key: "mail",
		// },
		{
			title: "Thành phố",
			dataIndex: "city",
			key: "city",
		},
		{
			title: "Action",
			dataIndex: "_id",
			render: (id: string) => (
				<Button onClick={() => navigate(AppRoutes.customers.detail, { state: { id } })}>Chi tiết</Button>
			),
		},
	];

	useEffect(() => {
		const fetchData = async () => {
			const res = await listDataForDate(date);
			if (res.status == true) {
				const convertedData = res.result.data.map((item: any) => item.customer_info);
				setData(convertedData);
			}
		};

		fetchData();
	}, []);
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
