import { Table } from "antd";
import { useLocation } from "react-router-dom";
const CustomerList = () => {
	const state = useLocation().state as any;

	const columns = [
		{
			title: "Tên khách hàng",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone",
			key: "phone",
		},
	];
	return (
		<div>
			<h1 className="text-xl font-semibold mb-3">
				Danh sách khách hàng ngày {state.date.toLocaleDateString("vi-VN")}
			</h1>
			<Table columns={columns} />
		</div>
	);
};

export default CustomerList;
