import * as React from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { observer } from "mobx-react"
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { BackArrowIcon } from "../../assets/icons"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomPhoneInput from "../components/common/PhoneInput"
import { useAuth } from "../context/AuthContext"
import authStore from "../mobx/AuthStore"
import LoadingModal from "../components/common/LoadingScreen"
import ErrorModal from "../components/common/ErrorScreen"
import CustomPrimaryButtonWithDisble from "../components/common/CustomPrimaryBtnWithDisable"
import CustomPasswordInput from "../components/common/CustomPasswordInput"
import { formatPhoneNumber, reversePhoneNumber } from "../components/common/phone_format"
const { height } = Dimensions.get("window")

function LoginScreen({ navigation }) {
	const { onLogin } = useAuth()
	const LoginSchema = yup.object().shape({
		phone: yup.string().required("Phone Number is required").label("Phone Number"),
		password: yup.string().required()
	})
	const formik = useFormik({
		enableReinitialize: false,
		validateOnChange: true,
		initialValues: {
			phone: "",
			password: ""
		},
		onSubmit: async values => {
			let payload = { ...values }
			payload.phoneCode = "234"

			payload.phone = reversePhoneNumber(payload.phone)
			const response = await onLogin(payload)

			if (response?.data?.data && !response?.data?.data?.user?.is_verified) {
				navigation.navigate("Otp")
			}
		},
		validationSchema: LoginSchema
	})

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 0.1, height: 70, paddingLeft: 24, backgroundColor: "#FFF", paddingRight: 24, width: "100%", justifyContent: "center" }}>
				<TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: "#FFFFFF", height: 25, width: 25 }} onPress={() => navigation.navigate("Register")}>
					<BackArrowIcon />
				</TouchableOpacity>
			</View>
			<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
				{authStore.loading && <LoadingModal modalVisible={authStore.loading} />}
				{authStore.error && <ErrorModal modalVisible={authStore.error} error={authStore.errorValue} onRequestClose={() => authStore.clearErrorStatus()} />}
				<View style={styles.loginContainer}>
					<View style={styles.loginTexView}>
						<Text style={styles.loginText}>Login</Text>
					</View>

					<View style={styles.customInput}>
						<CustomPhoneInput
							name="phone"
							autoComplete="off"
							label="Phone Number"
							placeholder="0903 5892 809"
							value={`${formatPhoneNumber(formik.values.phone)}`}
							keyboardType="phone-pad"
							inputMode="tel"
							disabled={authStore.loading}
							onChangeText={formik.handleChange("phone")}
							onBlur={formik.handleBlur("phone")}
							error={formik.touched.phone && formik.errors.phone}
						/>
						{/* <View style={{ marginTop: 20 }}></View> */}
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
						<View style={{ width: "100%", display: "flex", flexdirection: "row", alignItems: "flex-start" }}>
							<TouchableOpacity activeOpacity={0.9} disabled={authStore.loading} onPress={() => navigation.navigate("ForgotPassword")}>
								<Text style={[styles.RegTextLink, { color: "#000", textDecorationLine: "none" }]}>Forgot Password?</Text>
							</TouchableOpacity>
						</View>
						<View style={{ marginTop: height / 5 }}>
							<CustomPrimaryButtonWithDisble
								disabled={(formik.isValid && !formik?.values?.password) || !formik?.values?.phone ? true : !formik?.values?.password || !formik?.values?.phone ? true : false}
								onPress={formik.handleSubmit}
								title={authStore.loading ? "Loading..." : "Login"}
							/>
						</View>
						<View style={styles.bottomContent}>
							<Text style={styles.regLink}>New user?</Text>
							<TouchableOpacity activeOpacity={0.9} style={{ width: 70 }} disabled={authStore.loading} onPress={() => navigation.navigate("Register")}>
								<Text style={styles.RegTextLink}>Register</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
export default observer(LoginScreen)
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
		marginTop: 5,
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
