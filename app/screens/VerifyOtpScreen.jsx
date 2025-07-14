import * as Clipboard from "expo-clipboard"
import OTPTextView from "react-native-otp-textinput"
import * as SecureStore from "expo-secure-store"
// import Clipboard from "@react-native-clipboard/clipboard"
import React, { useState, useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import LoadingModal from "../components/common/LoadingScreen"
import ErrorModal from "../components/common/ErrorScreen"
import SuccessMainModal from "../components/common/SuccessMainScreen"
import authStore from "../mobx/AuthStore"
const { width, height } = Dimensions.get("window")
import { observer } from "mobx-react"
import { useAuth } from "../context/AuthContext"
import CustomPrimaryButtonWithDisble from "../components/common/CustomPrimaryBtnWithDisable"
import { BackArrowIcon } from "../../assets/icons"
import { formatPhoneNumber } from "../components/common/formatPhoneNumber"

const VerifyOtpScreen = ({ navigation }) => {
	const [otpInput, setOtpInput] = useState("")
	const [userPhone, setUserPhone] = useState("")
	const input = useRef(null)
	const { onVerifyOtp } = useAuth()
	const handleCellTextChange = async (text, i) => {
		if (i === 0) {
			const clippedText = await Clipboard.getStringAsync()
			if (clippedText.slice(0, 1) === text) {
				input.current?.setValue(clippedText, true)
			}
		}
	}
	const handleChangeIn = text => {
		setOtpInput(text)
	}
	const handleCloseSuccess = () => {
		authStore.clearSuccessStatus()
		navigation.navigate("ResetPasswordScreen")
	}
	const handleCloseResendSuccess = () => {
		authStore.clearResendSuccessStatus()
	}

	const handleSubmitOtp = async () => {
		if (otpInput.length < 4) authStore.setErrorStatus("Please provide OTP send to your phone number")

		if (otpInput.length === 4) {
			const result = await authStore.verifyForgotPasswordOtp({ otp: otpInput })

			if (result?.error && result?.error?.message === "The user's account is already verified") {
				navigation.navigate("Login")
			}
			if (result?.data?.data && result?.data?.data?.success) {
				navigation.navigate("Login")
			}
		}
	}

	const handleResendOtp = async () => {
		const phone = await SecureStore.getItemAsync("phone")
		const response = await authStore.resendForgotPasswordOtp({ phone, phoneCode: "234" })
	}
	const retrieveUserPhone = async () => {
		const phonenumber = await SecureStore.getItemAsync("phone")
		if (phonenumber) {
			setUserPhone(phonenumber)
		}
	}
	useEffect(() => {
		retrieveUserPhone()
	}, [])
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ height: 70, paddingLeft: 20, backgroundColor: "#FFF", paddingRight: 20, width: "100%", justifyContent: "center" }}>
				<TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: "#FFFFFF", height: 25, width: 25 }} onPress={() => navigation.goBack()}>
					<BackArrowIcon />
				</TouchableOpacity>
			</View>
			<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, width: "100%" }}>
				<View style={styles.verificationTexView}>
					<Text style={styles.verificationText}>OTP Verification</Text>
					<Text style={styles.verificationSubText}>Check your phone, an OTP has been sent to your number {`${formatPhoneNumber(userPhone)}`}</Text>
					<Text style={styles.digitsCodeText}>Enter the 4 digit code</Text>
				</View>

				{authStore.resendsuccess && <SuccessMainModal modalVisible={authStore.resendsuccess} message={authStore.successValue} onRequestClose={handleCloseResendSuccess} />}
				{authStore.success && <SuccessMainModal modalVisible={authStore.success} message={authStore.successValue} onRequestClose={handleCloseSuccess} />}
				{authStore.resendloading && <LoadingModal modalVisible={authStore.resendloadings} />}
				{authStore.loading && <LoadingModal modalVisible={authStore.loading} />}
				{authStore.error && <ErrorModal modalVisible={authStore.error} error={authStore.errorValue} onRequestClose={() => authStore.clearErrorStatus()} />}
				<OTPTextView
					ref={input}
					handleTextChange={text => {
						handleChangeIn(text)
						// handleSubmitOtp()
					}}
					containerStyle={styles.textInputContainer}
					textInputStyle={styles.roundedTextInput}
					handleCellTextChange={handleCellTextChange}
					defaultValue=""
					inputCount={4}
					keyboardType="numeric"
					autoFocus
				/>
				{otpInput.length < 1 && (
					<View style={{ display: "flex", gap: 5, marginTop: 40, flexDirection: "row", width: "100%", paddingHorizontal: 20, alignItems: "center" }}>
						<Text>Having trouble?</Text>
						<TouchableOpacity activeOpacity={0.9} onPress={handleResendOtp}>
							<Text style={styles.resendText}>Resend now</Text>
						</TouchableOpacity>
					</View>
				)}
				<View style={{ width: "100%", paddingHorizontal: 20, marginTop: otpInput.length < 1 ? height / 4 : height / 3 }}>
					<CustomPrimaryButtonWithDisble disabled={otpInput.length < 4 ? true : false} title={"Reset Password"} onPress={handleSubmitOtp} />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center"
		alignItems: "center",
		backgroundColor: "#FFFFFF"
	},
	textInputContainer: {
		width: "100%",
		paddingHorizontal: 20,
		marginBottom: 20,
		marginTop: 10,
		height: 40
	},
	roundedTextInput: {
		height: 70,
		fontFamily: "Inter-SemiBold",
		fontWeight: "bold",
		fontSize: 30,
		color: "#008080",
		borderBottomWidth: 2
	},
	verificationTexView: {
		color: "#002D2D",
		width,
		paddingHorizontal: 20,
		marginTop: 20,
		marginBottom: 20
	},
	verificationText: {
		fontFamily: "Inter-SemiBold",
		color: "#002D2D",
		fontSize: 25,
		fontWeight: "500",
		lineHeight: 50.4
	},
	verificationSubText: {
		marginTop: 2,
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 14,
		lineHeight: 22,
		color: "#575757"
	},
	digitsCodeText: {
		marginTop: 60,
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: 14,
		lineHeight: 22,
		color: "#575757"
	},
	optInput: {
		height: height / 12,
		width: width / 7,
		borderWidth: 2,
		borderColor: "#D6D6D6",
		// marginLeft: 20,
		borderRadius: 8,
		fontSize: 25,
		color: "black",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center"
	},
	optInputContainer: {
		width,
		display: "flex",

		flexDirection: "row",
		justifyContent: "center",
		gap: 20
	},
	otpDisplay: {
		fontSize: 24,
		fontWeight: "bold"
	},
	numberPad: {
		// backgroundColor: "red",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		marginTop: 100
	},
	key: {
		width: Math.round(width / 4),
		height: 50,
		margin: 8,
		borderRadius: 40,
		// backgroundColor: "#00796b", // Royal Green color
		justifyContent: "center",
		alignItems: "center",
		color: "#FFF"
	},
	keyText: {
		color: "#008080",
		fontFamily: "Inter-Regular", // White color
		fontSize: 30,
		fontWeight: "400",
		fontStyle: "normal"
	},
	resendText: {
		color: "#008080",
		fontFamily: "Inter-SemiBold", // White color
		fontSize: 12,
		fontWeight: "400",
		fontStyle: "normal"
	}
})

export default observer(VerifyOtpScreen)
