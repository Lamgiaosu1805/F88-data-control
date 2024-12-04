import { useState, useEffect } from "react";
import { getCustomerDetail } from "@api/authentication";
import { Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

const renderKeyValue = (key = "", value = "", checkEnd?: boolean) => {
	const check = checkEnd ?? false;
	return (
		<div style={{ height: 50, display: "flex", flexDirection: "row" }}>
			<div
				style={{
					width: "40%",
					paddingLeft: 8,
					borderWidth: check ? 1 : "1px 1px 0 1px",
					borderStyle: "solid",
					borderColor: "black",
					display: "flex",
					alignItems: "center",
				}}
			>
				{key}
			</div>
			<div
				style={{
					fontWeight: "500",
					borderWidth: check ? "1px 1px 1px 0" : "1px 1px 0 0",
					borderStyle: "solid",
					borderColor: "black",
					paddingLeft: 8,
					flex: 1,
					display: "flex",
					alignItems: "center",
				}}
			>
				{value}
			</div>
		</div>
	);
};

const CustomerDetail = () => {
	const [data, setData] = useState<any>([]);
	const id = useLocation().state.id;

	useEffect(() => {
		const fetchData = async () => {
			const res = await getCustomerDetail(id);
			if (res.status == true) {
				setData(res.result.data);
			}
		};

		fetchData();
	}, []);

	console.log(data);
	return (
		<div className="p-4">
			<Paper elevation={2} style={{ padding: 12, borderRadius: 16 }}>
				<h1 className="text-xl font-semibold mb-3">Thông tin khách hàng</h1>

				<div className="mt-3">
					{renderKeyValue("Tên khách hàng", data.customerInfo?.full_name)}
					{renderKeyValue(
						"Giới tính",
						data.identityInfo?.gender == 1 ? "Nữ" : data.identityInfo?.gender == 2 ? "Nam" : ""
					)}
					{renderKeyValue("Địa chỉ thường trú", data.identityInfo?.address)}
					{renderKeyValue("Địa chỉ hộ khẩu", data.identityInfo?.pernament_address)}
					{renderKeyValue("CCCD", data.identityInfo?.cccd)}
					{renderKeyValue("Số điện thoại", data.identityInfo?.phone_number, true)}
				</div>

				<div className="mt-3">
					{renderKeyValue("Thành phố", data.customerInfo?.city)}
					{renderKeyValue("Quận", data.customerInfo?.district)}
					{renderKeyValue("Email", data.customerInfo?.mail)}
					{renderKeyValue("Công việc", data.customerInfo?.job)}
					{renderKeyValue("Nơi làm việc", data.customerInfo?.work_place)}
					{renderKeyValue(
						"Tài sản thế chấp",
						data.formPushInfo?.asset_type_id == 17 ? "Xe máy" : "Ô tô",
						true
					)}
				</div>
			</Paper>
		</div>
	);
};

export default CustomerDetail;
