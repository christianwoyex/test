import * as React from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { observer } from "mobx-react"
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { BackArrowIcon } from "../../assets/icons"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomPhoneInput from "../components/common/PhoneInput"
import * as SecureStore from "expo-secure-store"
import { useAuth } from "../context/AuthContext"
import authStore from "../mobx/AuthStore"
import LoadingModal from "../components/common/LoadingScreen"
import ErrorModal from "../components/common/ErrorScreen"
import SuccessMainModal from "../components/common/SuccessMainScreen"
import CustomPrimaryButtonWithDisble from "../components/common/CustomPrimaryBtnWithDisable"
const { width, height } = Dimensions.get("window")

function ForgotPasswordScreen({ navigation }) {
	const forgotPasswordSchema = yup.object().shape({
		phone: yup.string().required("Phone Number is required").min(10).max(11).label("Phone Number")
	})
	const formik = useFormik({
		enableReinitialize: false,
		validateOnChange: true,
		initialValues: {
			phone: ""
		},
		onSubmit: async values => {
			let payload = { ...values }
			payload.phoneCode = "234"
			await SecureStore.setItemAsync("phone", payload.phone)
			const response = await authStore.requestForgotPasswordOtp(payload)
		},
		validationSchema: forgotPasswordSchema
	})

	const handleCloseSuccess = () => {
		authStore.clearSuccessStatus()
		navigation.navigate("VerifyOtpScreen")
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 0.1, height: 70, paddingLeft: 24, backgroundColor: "#FFF", paddingRight: 24, width: "100%", justifyContent: "center" }}>
				<TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: "#FFFFFF", height: 25, width: 25 }} onPress={() => navigation.goBack()}>
					<BackArrowIcon />
				</TouchableOpacity>
			</View>
			<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
				{authStore.loading && <LoadingModal modalVisible={authStore.loading} />}
				{authStore.success && <SuccessMainModal modalVisible={authStore.success} message={authStore.successValue} onRequestClose={handleCloseSuccess} />}
				{authStore.error && <ErrorModal modalVisible={authStore.error} error={authStore.errorValue} onRequestClose={() => authStore.clearErrorStatus()} />}
				<View style={styles.loginContainer}>
					<View style={styles.loginTexView}>
						<Text style={styles.loginText}>Reset Password</Text>
						<Text style={styles.loginTextDesc}>Enter your registered phone number to resent password</Text>
					</View>

					<View style={styles.customInput}>
						<CustomPhoneInput
							name="phone"
							autoComplete="off"
							label="Phone Number"
							placeholder="09035892809"
							value={formik.values.phone}
							keyboardType="phone-pad"
							inputMode="tel"
							// disabled={authStore.loading}
							onChangeText={formik.handleChange("phone")}
							onBlur={formik.handleBlur("phone")}
							error={formik.touched.phone && formik.errors.phone}
						/>

						<View style={{ marginTop: 30 }}>
							<CustomPrimaryButtonWithDisble
								disabled={!formik.values.phone && formik.isValid ? true : formik.errors.phone ? true : false}
								onPress={formik.handleSubmit}
								title={authStore.loading ? "Loading..." : "Reset Password"}
							/>
							<View style={styles.bottomContent}>
								<Text style={styles.regLink}>New user?</Text>
								<TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Register")}>
									<Text style={styles.RegTextLink}>Register</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
export default observer(ForgotPasswordScreen)
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
	loginTextDesc: {
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
		height: height / 1.6,
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
		fontSize: 13,
		fontWeight: "300"
	},
	RegTextLink: {
		fontFamily: "Inter-Regular",
		fontSize: 13,
		fontWeight: "300",
		color: "#1DB954",
		textDecorationLine: "underline",
		marginLeft: 6
	}
})
