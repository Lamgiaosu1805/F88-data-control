import { useState, useEffect } from "react";
import { getCustomerDetail, updateStatus } from "@api/authentication";
import { Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Button, Modal, Input, Popconfirm } from "antd";
import { toast } from "react-toastify";
const { TextArea } = Input;

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
	const [openModal, setOpenmodal] = useState(false);
	const [cancelReason, setCancelReason] = useState("");
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

	const handleUpdateStatus = async (type: number) => {
		console.log("handleUpdateStatus", type);

		if (type == 3) {
			setOpenmodal(true);
		} else {
			const res = await updateStatus({
				idCustomer: id,
				status: type,
				cancelReson: "",
			});

			if (res.status == true) {
				toast.success("Đã cập nhật trạng thái thành công");
			}
		}
	};

	const confirmReject = async () => {
		if (cancelReason == "") {
			toast.error("Bạn chưa nhập lý do từ chối");
			return;
		}
		const res = await updateStatus({
			idCustomer: id,
			status: 3,
			cancelReson: cancelReason,
		});

		if (res.status == true) {
			toast.success("Đã từ chối thành công");
		}
		setOpenmodal(false);
	};
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
						data.formPushInfo?.asset_type_id == 17 ? "Giấy phép xe máy" : "Giấy phép ô tô",
						true
					)}
				</div>

				<div className="my-10 flex justify-center items-center gap-3">
					<Popconfirm
						title="Cập nhật trạng thái"
						description="Xác nhận cập nhật trạng thái đồng ý?"
						onConfirm={() => handleUpdateStatus(4)}
						okText="Xác nhận"
						cancelText="Không"
					>
						<Button type="primary">Đồng ý</Button>
					</Popconfirm>

					<Popconfirm
						title="Cập nhật trạng thái"
						description="Xác nhận cập nhật trạng thái chưa quyết định?"
						onConfirm={() => handleUpdateStatus(0)}
						okText="Xác nhận"
						cancelText="Không"
					>
						<Button type="default">Chưa quyết định</Button>
					</Popconfirm>
					<Button onClick={() => handleUpdateStatus(3)} danger>
						Từ chối
					</Button>
				</div>
			</Paper>

			{/* Modal */}

			<Modal
				title={<p>Lý do từ chối</p>}
				footer={
					<Button type="primary" danger onClick={confirmReject}>
						Xác nhận từ chối
					</Button>
				}
				open={openModal}
				onCancel={() => setOpenmodal(false)}
			>
				<TextArea
					rows={4}
					placeholder="Nhập lý do từ chối"
					value={cancelReason}
					onChange={(e) => setCancelReason(e.target.value)}
				/>
			</Modal>
		</div>
	);
};

export default CustomerDetail;
