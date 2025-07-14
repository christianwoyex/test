import * as React from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { observer } from "mobx-react"
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native"
const { height } = Dimensions.get("window")

import { BackArrowIcon } from "../../../assets/icons"
import CustomPrimaryButton from "../../components/common/PrimaryButton"
import { SafeAreaView } from "react-native-safe-area-context"
import profileStore from "../../mobx/profileStore"
import LoadingModal from "../../components/common/LoadingScreen"
import SuccessMainModal from "../../components/common/SuccessMainScreen"
import ErrorModal from "../../components/common/ErrorScreen"
import { useAuth } from "../../context/AuthContext"
import CustomPasswordInput from "../../components/common/CustomPasswordInput"
import PasswordHintModal from "../../components/common/PasswordHint"

function ChangePasswordScreen({ navigation }) {
	const { onLogout } = useAuth()
	const changePassowrdSchema = yup.object().shape({
		password: yup
			.string()
			.matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/, "Password didn't match the given requirement")
			.required("Password is required")
			.min(8)
			.max(60)
			.label("New Password"),
		currentPassword: yup.string().required("Current password is required").label("Current Password")
	})
	const formik = useFormik({
		enableReinitialize: false,
		validateOnChange: true,
		initialValues: {
			currentPassword: "",
			password: ""
		},
		onSubmit: async values => {
			let payload = { ...values }

			const response = await profileStore.changePassword(payload)

			// if (response?.data?.data && !response?.data?.data?.user?.is_verified) {
			// 	navigation.navigate("Otp")
			// }
		},
		validationSchema: changePassowrdSchema
	})
	const handleCloseSuccess = () => {
		profileStore.clearPasswordSuccessStatus()
		onLogout()
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 0.1, height: 70, paddingLeft: 24, backgroundColor: "#FFF", paddingRight: 24, width: "100%", justifyContent: "center" }}>
				<TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: "#FFFFFF", height: 25, width: 25 }} onPress={() => navigation.goBack()}>
					<BackArrowIcon />
				</TouchableOpacity>
			</View>
			<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
				{profileStore.passwordloading && <LoadingModal modalVisible={profileStore.passwordloading} />}
				{profileStore.passworderror && <ErrorModal modalVisible={profileStore.passworderror} error={profileStore.errorValue} onRequestClose={() => profileStore.clearPasswordErrorStatus()} />}
				{profileStore.passwordsuccess && <SuccessMainModal modalVisible={profileStore.passwordsuccess} message={profileStore.successValue} onRequestClose={() => handleCloseSuccess()} />}
				{/* {authStore.loading && <LoadingModal modalVisible={authStore.loading} />}
				{authStore.error && <ErrorModal modalVisible={authStore.error} error={authStore.errorValue} onRequestClose={() => authStore.clearErrorStatus()} />} */}
				<View style={styles.loginContainer}>
					<View style={styles.loginTexView}>
						<Text style={styles.loginText}>Change Password</Text>
					</View>

					<View style={styles.customInput}>
						<CustomPasswordInput
							name="currentPassword"
							label="Current Password"
							// disabled={authStore.loading}
							placeholder="Enter your old password"
							value={formik.values.currentPassword}
							inputType="currentPassword"
							onChangeText={formik.handleChange("currentPassword")}
							onBlur={formik.handleBlur("currentPassword")}
							error={formik.touched.currentPassword && formik.errors.currentPassword}
						/>
						<CustomPasswordInput
							name="password"
							label="New Password"
							placeholder="Enter your new password"
							value={formik.values.password}
							inputType="password"
							onChangeText={formik.handleChange("password")}
							onBlur={formik.handleBlur("password")}
							error={formik.touched.password && formik.errors.password}
						/>
						<PasswordHintModal />

						<View style={{ marginTop: height / 4.5 }}>
							<CustomPrimaryButton onPress={formik.handleSubmit} title={false ? "Loading..." : "Continue"} />
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
export default observer(ChangePasswordScreen)
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

	customInput: {
		display: "flex",
		width: "100%",
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
