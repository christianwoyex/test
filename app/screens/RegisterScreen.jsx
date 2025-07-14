import * as React from "react"
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native"
import * as SecureStore from "expo-secure-store"
import * as yup from "yup"
import { useFormik } from "formik"
import { observer } from "mobx-react"
const { height } = Dimensions.get("window")

import { BackArrowIcon } from "../../assets/icons"
import CustomTextInput from "../components/common/Input"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomPhoneInput from "../components/common/PhoneInput"
import authStore from "../mobx/AuthStore"
import LoadingModal from "../components/common/LoadingScreen"
import SuccessModalMain from "../components/common/SuccessMainScreen"
import ErrorModal from "../components/common/ErrorScreen"
import { useAuth } from "../context/AuthContext"
import CustomPrimaryButtonWithDisble from "../components/common/CustomPrimaryBtnWithDisable"
import CustomPasswordInput from "../components/common/CustomPasswordInput"
import { formatPhoneNumber, reversePhoneNumber } from "../components/common/phone_format"
import PasswordHintModal from "../components/common/PasswordHint"

function RegisterScreen({ navigation }) {
	const { onRegister } = useAuth()
	const phoneNumRegex =
		/^(\+234|234|0)(701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|908|901|902|903|904|905|906|907|909|908|911|912|913|914|915|916|917)([0-9]{7})$/
	const LoginSchema = yup.object().shape({
		phone: yup
			.string()
			.min(10)
			.max(11, "Phone number must not be more than 11 digits")
			.matches(phoneNumRegex, "Phone Number must be valid number")
			.required("Phone Number is required")
			.label("Phone Number"),
		firstName: yup.string().min(3).max(25, "Maximum characters reached").required().label("First Name"),
		lastName: yup.string().min(3).max(25, "Maximum characters reached").required().label("Last Name"),
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
			phone: "",
			firstName: "",
			lastName: "",
			password: "",
			confirm_password: ""
		},
		onSubmit: async values => {
			let payload = { ...values }
			delete payload.confirm_password
			payload.phoneCode = "234"
			payload.phone = reversePhoneNumber(payload.phone)

			const response = await onRegister(payload)
			await SecureStore.setItemAsync("phone", payload.phone)
			if (response?.data?.data && !response?.data?.data?.user?.is_verified) {
				navigation.navigate("Otp")
			}
		},
		validationSchema: LoginSchema
	})

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ height: 60, paddingLeft: 20, backgroundColor: "#FFF", paddingRight: 20, width: "100%", justifyContent: "center" }}>
				<TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Login")}>
					<BackArrowIcon />
				</TouchableOpacity>
			</View>
			<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.8 }}>
				{authStore.loading && <LoadingModal modalVisible={authStore.loading} />}
				{authStore.error && <ErrorModal modalVisible={authStore.error} error={authStore.errorValue} onRequestClose={() => authStore.clearErrorStatus()} />}
				{authStore.success && <SuccessModalMain modalVisible={authStore.success} message={authStore.successValue} onRequestClose={() => authStore.clearSuccessStatus()} />}
				<View style={styles.loginContainer}>
					<View style={styles.loginTexView}>
						<Text style={styles.loginText}>Register</Text>
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
						<CustomTextInput
							name="firstName"
							label="First Name"
							placeholder="Enter your First Name"
							value={formik.values.fullName}
							// keyboardType="phone-pad"
							inputMode="text"
							onChangeText={formik.handleChange("firstName")}
							onBlur={formik.handleBlur("firstName")}
							error={formik.touched.firstName && formik.errors.firstName}
						/>
						<CustomTextInput
							name="lastName"
							label="Last Name"
							placeholder="Enter your Last Name"
							value={formik.values.lastName}
							// keyboardType="phone-pad"
							inputMode="text"
							onChangeText={formik.handleChange("lastName")}
							onBlur={formik.handleBlur("lastName")}
							error={formik.touched.lastName && formik.errors.lastName}
						/>
						<CustomPasswordInput
							name="password"
							label="Password"
							placeholder="Enter your password"
							value={formik.values.password}
							onChangeText={formik.handleChange("password")}
							onBlur={formik.handleBlur("password")}
							error={formik.touched.password && formik.errors.password}
						/>
						<PasswordHintModal />
						<CustomPasswordInput
							name="confirm_password"
							label="Confirm Password"
							placeholder="Enter your confirm password"
							value={formik.values.confirm_password}
							onChangeText={formik.handleChange("confirm_password")}
							onBlur={formik.handleBlur("confirm_password")}
							error={formik.touched.confirm_password && formik.errors.confirm_password}
						/>

						<View style={{ marginTop: height / 16.5 }}>
							<CustomPrimaryButtonWithDisble
								disabled={
									(formik.isValid && !formik?.values?.phone) || !formik?.values?.firstName || !formik?.values?.lastName || !formik?.values?.password
										? true
										: !formik?.values?.password || !formik?.values?.phone
										? true
										: (!formik.isValid && !formik?.values?.phone) || !formik?.values?.password || !formik?.values?.firstName
										? true
										: false
								}
								onPress={formik.handleSubmit}
								title={"Register"}
							/>
						</View>
					</View>

					<View style={styles.bottomContent}>
						<Text style={styles.regLink}>Have an account?</Text>
						<TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Login")}>
							<Text style={styles.RegTextLink}>Login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
export default observer(RegisterScreen)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	loginContainer: {
		flex: 1,
		display: "flex",
		width: "100%",
		flexDirection: "column",
		margin: "0 auto",
		paddingHorizontal: 24
	},

	loginTexView: {
		color: " #002D2D",
		width: "100%",
		alignSelf: "stretch",
		marginTop: 10
	},
	loginText: {
		fontFamily: "Inter-SemiBold",
		color: "#002D2D",
		fontSize: 25,
		fontWeight: "500",
		lineHeight: 29.4,
		letterSpacing: -0.6,
		marginTop: 0
	},

	customInput: {
		display: "flex",
		width: "100%",
		flexDirection: "column",
		// backgroundColor: "red",
		marginTop: 20
	},

	textInput: {
		display: "flex",
		width: "100%",
		height: 56,
		flexDirection: "column",
		// backgroundColor: "red",
		borderRadius: 3,

		borderColor: "#f87"
	},
	bottomContent: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		height: 50,
		marginTop: 5,
		marginBottom: 30,
		alignItems: "center",
		justifyContent: "center"
	},
	regLink: {
		color: "#525252",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontWeight: "300"
	},
	RegTextLink: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontWeight: "500",
		color: "#1DB954",
		textDecorationLine: "underline",
		marginLeft: 6
	}
})
