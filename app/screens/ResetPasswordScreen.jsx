import * as React from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { observer } from "mobx-react"
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { BackArrowIcon } from "../../assets/icons"
import CustomTextInput from "../components/common/Input"
import { SafeAreaView } from "react-native-safe-area-context"
import authStore from "../mobx/AuthStore"
import LoadingModal from "../components/common/LoadingScreen"
import ErrorModal from "../components/common/ErrorScreen"
import SuccessMainModal from "../components/common/SuccessMainScreen"
import CustomPrimaryButtonWithDisble from "../components/common/CustomPrimaryBtnWithDisable"
import CustomPasswordInput from "../components/common/CustomPasswordInput"
import PasswordHintModal from "../components/common/PasswordHint"

const { height } = Dimensions.get("window")

function ResetPasswordScreen({ navigation }) {
	const resetPasswordSchema = yup.object().shape({
		password: yup
			.string()
			.matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/, "Password didn't match the given requirement")
			.required("Password is required")
			.min(8)
			.max(60)
			.label("Password"),
		confirm_password: yup
			.string()
			.oneOf([yup.ref("password"), null], "Passwords must match")
			.required("Confirm Password is required")
	})

	const formik = useFormik({
		enableReinitialize: false,
		validateOnChange: true,
		initialValues: {
			password: "",
			confirm_password: ""
		},
		onSubmit: async values => {
			let payload = { ...values }

			const response = await authStore.resetForgottenPassword(payload)
		},
		validationSchema: resetPasswordSchema
	})
	const handleCloseSuccess = () => {
		authStore.clearSuccessStatus()
		navigation.navigate("Login")
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 0.1, height: 70, paddingLeft: 24, backgroundColor: "#FFF", paddingRight: 24, width: "100%", justifyContent: "center" }}>
				<TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: "#FFFFFF", height: 25, width: 25 }} onPress={() => navigation.goBack()}>
					<BackArrowIcon />
				</TouchableOpacity>
			</View>
			<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
				{authStore.success && <SuccessMainModal modalVisible={authStore.success} message={authStore.successValue} onRequestClose={handleCloseSuccess} />}
				{authStore.loading && <LoadingModal modalVisible={authStore.loading} />}
				{authStore.error && <ErrorModal modalVisible={authStore.error} error={authStore.errorValue} onRequestClose={() => authStore.clearErrorStatus()} />}
				<View style={styles.loginContainer}>
					<View style={styles.loginTexView}>
						<Text style={styles.loginText}>New Password</Text>
						<Text style={styles.descriptionSubText}>Create new password</Text>
					</View>

					<View style={styles.customInput}>
						<View>
							<CustomPasswordInput
								name="password"
								label="Password"
								disabled={authStore.loading}
								placeholder="Enter your password"
								value={formik.values.password}
								inputType="password"
								onChangeText={formik.handleChange("password")}
								onBlur={formik.handleBlur("password")}
								error={formik.touched.password && formik.errors.password}
							/>
							<CustomPasswordInput
								name="confirm_password"
								label="Repeat Password"
								disabled={authStore.loading}
								placeholder="Confirm your new password"
								value={formik.values.confirm_password}
								inputType="password"
								onChangeText={formik.handleChange("confirm_password")}
								onBlur={formik.handleBlur("confirm_password")}
								error={formik.touched.confirm_password && formik.errors.confirm_password}
							/>
						</View>
						<PasswordHintModal />
						<View style={{ marginTop: 30 }}>
							<CustomPrimaryButtonWithDisble
								disabled={!formik.values.password || (!formik.values.confirm_password && formik.isValid) ? true : !formik.values.password || !formik.values.confirm_password ? true : false}
								onPress={formik.handleSubmit}
								title={authStore.loading ? "Loading..." : "Create Password"}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
export default observer(ResetPasswordScreen)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	loginContainer: {
		flex: 0.1,
		backgroundColor: "#FFFFFF",
		display: "flex",
		width: "100%",
		flexDirection: "column",
		margin: "0 auto",
		// paddingTop: 50,
		paddingLeft: 24,
		paddingRight: 24
	},

	loginTexView: {
		color: " #002D2D",
		// width,
		alignSelf: "stretch",
		marginTop: 20
		// font: "500 36px/140% Work Sans, sans-serif "
	},
	loginText: {
		fontFamily: "Inter-SemiBold",
		color: "#002D2D",
		fontSize: 25,
		fontWeight: "500",
		lineHeight: 50.4
	},
	descriptionSubText: {
		marginTop: 2,
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 14,
		lineHeight: 22,
		color: "#575757"
	},
	customInput: {
		display: "flex",
		width: "100%",
		height: height / 1.5,
		justifyContent: "space-between",
		flexDirection: "column",
		marginTop: 40
	},

	textInput: {
		display: "flex",
		width: "100%",
		height: 56,
		flexDirection: "column",
		borderRadius: 3,
		borderColor: "#f87"
	},

	bottomContent: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		height: 50,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	regLink: {
		fontFamily: "Inter-Regular",
		color: "#525252",
		fontSize: 12,
		fontWeight: "300"
	},
	RegTextLink: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontWeight: "300",
		color: "#1DB954",
		textDecorationLine: "underline",
		marginLeft: 6
	}
})
