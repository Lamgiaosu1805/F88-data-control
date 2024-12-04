import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@route/AppRoutes";
import { Paper } from "@mui/material";
import { Table, TableProps, DatePicker, Button } from "antd";
import { DataForDate } from "@utils/types";
import { getNumberOfDataForDate } from "@api/authentication";

const columns: TableProps<DataForDate>["columns"] = [
	{
		title: "Ngày",
		dataIndex: "date",
		key: "date",
		render: (date) => <p className="font-semibold">{date}</p>,
		// sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	},
	{
		title: "Tổng số khách hàng",
		dataIndex: "count",
		key: "count",
		// sorter: (a, b) => a.count - b.count,
		// dataIndex: "tags",
	},
];

export const DashBoard = memo(() => {
	const navigate = useNavigate();
	const [date, setDate] = useState<any>(null);
	const [data, setData] = useState<DataForDate[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const data = await getNumberOfDataForDate();
			if (data.status == true) {
				setData(data.result);
			}
		};

		fetchData();
	}, []);

	return (
		<div style={{ padding: 12 }}>
			<Paper elevation={2} style={{ padding: 12, borderRadius: 16 }}>
				<div className="flex gap-4">
					<DatePicker placeholder="Chọn ngày" style={{ marginBottom: 12 }} format="DD/MM/YYYY" onChange={setDate} />
					<Button
						type="primary"
						onClick={() =>
							navigate(AppRoutes.customers.list, {
								state: { date: date?.format("DD/MM/YYYY") || "" },
							})
						}
					>
						Xem thông tin ngày
					</Button>
				</div>
				<Table<DataForDate>
					columns={columns}
					dataSource={
						// rangePicker
						// 	? data.filter(
						// 			(item) =>
						// 				new Date(item.date).getTime >= rangePicker[0].$d.getTime() &&
						// 				new Date(item.date).getTime() <=
						// 					new Date(rangePicker[1].$d).setHours(23, 59, 59, 999)
						// 			// eslint-disable-next-line no-mixed-spaces-and-tabs
						// 	  )
						data
					}
					rowKey={"date"}
					onRow={(record) => ({
						onClick: () => navigate(AppRoutes.customers.list, { state: { date: record.date || null } }),
					})}
				/>
			</Paper>
		</div>
	);
});
