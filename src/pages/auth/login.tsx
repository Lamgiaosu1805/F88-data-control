import { memo, useState } from "react";
import { useAuthenticationStore } from "@hooks/authentication";
import BG_LOGIN from "@assets/images/bg_login.png";
import BG_Ellipse from "@assets/images/bg_ellipse_login.png";
import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	// IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import { Formik } from "formik";
// import * as Yup from "yup";
import LogoWithText from "@assets/svg/logo_with_text.svg";
import EyesInput from "@assets/svg/eyes_input.svg";
// import { callApiCommon } from "@hooks/callAPI";
import PopupNotification from "@helpers/popup-notification";
// const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}":;\'<>?,./`~\-]).+$/;
interface PostLoginType {
	username: string;
	password: string;
	isLoginAdmin: boolean;
	checked: boolean;
}

export const Login = memo(() => {
	const { dispatchLoginSuccess, dispatchLogin } = useAuthenticationStore();
	const [loading, setLoading] = useState(false);
	const [hidePassword, setHidePassword] = useState(true);
	return (
		<Box
			sx={{
				alignItems: "center",
				justifyContent: "center",
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				backgroundImage: `url(${BG_Ellipse})`,
				backgroundSize: "50% 100%",
				backgroundPosition: "right",
				backgroundRepeat: "no-repeat",
				rowGap: 8,
			}}
		>
			<div>
				<img src={LogoWithText} alt="" className="select-none" />
			</div>
			<div
				style={{
					backgroundImage: `url(${BG_LOGIN})`,
					backgroundSize: "60% 95%",
					backgroundPosition: "bottom right",
					backgroundRepeat: "no-repeat",
					backgroundColor: "white",
					width: "60%",
					borderRadius: 24,
					boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.20)",
					padding: "32px 32px 60px 32px",
				}}
			>
				<Box>
					<Grid container spacing={0}>
						<Grid item container xs={5} sx={{ marginTop: 0, marginLeft: 4 }} direction={"column"}>
							<h1
								style={{
									textAlign: "center",
									fontWeight: "bold",
									fontSize: 24,
									marginBottom: 32,
								}}
							>
								ĐĂNG NHẬP
							</h1>
							<Formik
								initialValues={{
									username: "",
									password: "",
									isLoginAdmin: false,
									checked: true,
								}}
								onSubmit={async (values: PostLoginType) => {
									{
										try {
											console.log("values", values);
											setLoading(true);
											dispatchLogin(
												{
													isLoginAdmin: true,
													password: values.password,
													username: values.username,
												},
												(res) => {
													setLoading(false);
													if (res?.status) {
														dispatchLoginSuccess(res.result);
														PopupNotification({
															type: "success",
															message: "Đăng nhập thành công",
														});
													} else {
														PopupNotification({
															type: "error",
															message: res?.message,
														});
													}
												},
												(err) => {
													setLoading(false);
													PopupNotification({
														type: "error",
														message: err ?? "Lỗi hệ thống vui lòng thử lại sau !",
													});
												}
											);
										} catch (error) {
											setLoading(false);
											PopupNotification({
												type: "error",
												message: "Lỗi hệ thống vui lòng thử lại sau !",
											});
										}
									}
								}}
								// validationSchema={Yup.object().shape({
								// 	username: Yup.string()
								// 		.min(6, "Tên đăng nhập ít nhất 6 ký tự")
								// 		.required("Vui lòng nhập tên đăng nhập."),
								// 	password: Yup.string()
								// 		.min(6, "Mật khẩu ít nhất 6 ký tự")
								// 		.matches(
								// 			regexPassword,
								// 			"Mật khẩu chứ ít nhất 1 số, 1 chữ in hoa và 1 ký tư đặc biệt"
								// 		)
								// 		.required("Vui lòng nhập mật khẩu."),
								// })}
							>
								{({
									values,
									errors,
									handleChange,
									handleBlur,
									handleSubmit,
									// touched, handle khi focus vao input
								}) => (
									<form noValidate onSubmit={handleSubmit}>
										<FormControl fullWidth error={Boolean(errors.username)}>
											<TextField
												id="outlined-read-only-input"
												label="Tài khoản"
												name="username"
												value={values.username}
												onChange={handleChange}
												onBlur={handleBlur}
												sx={{
													color: "#9CA3AF",
													height: 54,
												}}
											/>
											<FormHelperText
												error
												id="standard-weight-helper-text-password-login"
												style={{
													visibility: errors.username ? "visible" : "hidden",
													display: "block",
												}}
												className="h-8"
											>
												{errors.username}
											</FormHelperText>
										</FormControl>
										<FormControl fullWidth error={Boolean(errors.password)}>
											<TextField
												id="outlined-read-only-input"
												label="Mật khẩu"
												value={values.password}
												onChange={handleChange}
												onBlur={handleBlur}
												name="password"
												type={!hidePassword ? "text" : "password"}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<img
																alt=""
																onClick={() => setHidePassword(!hidePassword)}
																src={hidePassword ? EyesInput : EyesInput}
																className="cursor-pointer"
															/>
														</InputAdornment>
													),
												}}
											/>
											<FormHelperText
												error
												id="standard-weight-helper-text-password-login"
												style={{
													visibility: errors.password ? "visible" : "hidden",
													display: "block",
												}}
											>
												{errors.password}
											</FormHelperText>
										</FormControl>
										<FormControlLabel
											control={
												<Checkbox
													checked={values.checked}
													color="error"
													defaultValue={""}
													onChange={handleChange}
												/>
											}
											name="checked"
											label="Lưu mật khẩu"
										/>
										<Button
											type="submit"
											color="error"
											variant="contained"
											style={{
												borderRadius: 8,
												height: "48px",
												marginTop: 20,
												marginBottom: 24,
											}}
											startIcon={<>{loading && <CircularProgress color="info" size={20} />}</>}
											fullWidth
											disabled={loading}
										>
											<span
												style={{
													fontWeight: "bold",
													fontSize: 16,
												}}
											>
												ĐĂNG NHẬP
											</span>
										</Button>
									</form>
								)}
							</Formik>
						</Grid>
					</Grid>
				</Box>
			</div>
		</Box>
	);
});
