import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@route/AppRoutes";
import { useAuthenticationStore } from "@hooks/authentication";
import { Paper } from "@mui/material";
import { Table, TableProps, DatePicker } from "antd";

const { RangePicker } = DatePicker;

interface DataType {
	// id: string;
	date: Date;
	totalGuests: number;
}

const columns: TableProps<DataType>["columns"] = [
	{
		title: "Ngày",
		dataIndex: "date",
		key: "date",
		render: (date) => <p className="font-semibold">{date.toLocaleDateString("vi-VN")}</p>,
		sorter: (a, b) => a.date.getTime() - b.date.getTime(),
		// baseURL: 'http://192.168.1.68:2993'
	},
	{
		title: "Tổng số khách hàng",
		dataIndex: "totalGuests",
		key: "totalGuests",
		sorter: (a, b) => a.totalGuests - b.totalGuests,
		// dataIndex: "tags",
	},
];

export const DashBoard = memo(() => {
	const navigate = useNavigate();
	const { dispatchLogOut } = useAuthenticationStore();
	const [rangePicker, setRangePicker] = useState<any>(null);
	// const onNavigateStaff = () => {
	// 	navigation(AppRoutes.staff.index);
	// };

	const [data, setData] = useState<DataType[]>([
		{
			date: new Date(),
			totalGuests: 32,
		},
		{
			date: new Date("2024-12-01"),
			totalGuests: 12,
		},
	]);

	const onLogout = () => {
		// localStorage.removeItem(COMMONKEY.TOKEN)
		dispatchLogOut();
	};

	const onDateChange = (values: any) => {
		console.log(values);
		// if (!values) {
		// 	setLoading(true);
		// 	fetchData();
		// 	setLoading(false);
		// 	return;
		// }
		const [startDate, endDate] = values.map((date: any) => new Date(date));

		// Set startDate to the start of the day (00:00:00.000) and endDate to the end of the day (23:59:59.999)
		startDate.setHours(0, 0, 0, 0);
		endDate.setHours(23, 59, 59, 999);

		const filtedData = data.filter((item) => {
			const date = new Date(item.date);

			// console.log('D', date, startDate, endDate);
			return date >= startDate && date <= endDate;
		});

		setData(filtedData);
	};

	console.log("HI", rangePicker, data);
	return (
		<div style={{ padding: 12 }}>
			{/* <button
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
      </button> */}
			<Paper elevation={2} style={{ padding: 12, borderRadius: 16 }}>
				<RangePicker
					value={rangePicker}
					style={{ marginBottom: 12 }}
					onChange={setRangePicker}
					format="DD/MM/YYYY"
				/>
				<Table<DataType>
					columns={columns}
					dataSource={
						rangePicker
							? data.filter(
									(item) =>
										item.date >= rangePicker[0].$d &&
										item.date.getTime() <= new Date(rangePicker[1].$d).setHours(23, 59, 59, 999)
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  )
							: data
					}
					onRow={(record) => ({
						onClick: () => navigate(AppRoutes.customers.list, { state: { date: record.date || null } }),
					})}
				/>
			</Paper>
		</div>
	);
});
