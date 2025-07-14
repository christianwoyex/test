import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { observer } from "mobx-react"
import LottieView from "lottie-react-native"
import { useEffect, useRef } from "react"
import CustomPrimaryButton from "./PrimaryButton"
import loanStore from "../../mobx/LoanStore"

const ErrorKycScreenModal = ({ modalVisible, error = "", onRequestClose, navigation }) => {
	const animationRef = useRef(null)

	useEffect(() => {
		animationRef.current?.play()
	}, [])
	function handleNavigatePrfile() {
		if (loanStore.msgError.includes("profile")) {
			navigation.navigate("Profile")
			loanStore.clearApplyErrorKyc()
		}
		if (loanStore.msgError.includes("KYC")) {
			navigation.navigate("personal-data")
			loanStore.clearApplyErrorKyc()
		}
		if (loanStore.msgError.includes("dob")) {
			navigation.navigate("personal-data")
			loanStore.clearApplyErrorKyc()
		}
		if (loanStore.msgError.includes("business")) {
			navigation.navigate("business-data")
			loanStore.clearApplyErrorKyc()
		}
		if (loanStore.msgError.includes("bank")) {
			navigation.navigate("finance-data")
			loanStore.clearApplyErrorKyc()
		}
	}
	return (
		<Modal animationType="fade" transparent={true} visible={modalVisible} onBackdropPress={onRequestClose}>
			<TouchableWithoutFeedback style={{ flex: 1 }} onPress={onRequestClose}>
				<View style={styles.centeredView}>
					<View style={{ flex: 0.15, alignItems: "center", padding: 20, width: "100%" }}>
						<LottieView resizeMode="center" ref={animationRef} source={require("../../../assets/error_animate.json")} autoPlay={true} loop={true} />
					</View>

					<Text style={styles.loadinTextErr}>Unsuccessful!</Text>
					<Text style={styles.loadinText}>{error}</Text>
					<View style={{ marginTop: 160, width: "100%" }}>
						<CustomPrimaryButton
							onPress={handleNavigatePrfile}
							title={
								loanStore.msgError.includes("KYC")
									? "Complete your KYC"
									: loanStore.msgError.includes("dob")
									? "Complete your KYC"
									: loanStore.msgError.includes("Business")
									? "Add Business Data"
									: loanStore.msgError.includes("profile")
									? "Upload Profile Photo"
									: loanStore.msgError.includes("bank")
									? "Add Financial Data"
									: "Complete your KYC"
							}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
}

export default observer(ErrorKycScreenModal)

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		padding: 20
	},
	loadinText: {
		fontFamily: "Inter-Regular",
		fontSize: 13,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D",
		textAlign: "center",
		lineHeight: 22,
		marginTop: 10
	},
	loadinTextErr: {
		fontFamily: "Inter-SemiBold",
		fontSize: 18,
		fontWeight: "400",
		marginBottom: 5,
		color: "red",
		marginTop: 10
	}
})
