import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { VerifiedIcon } from "../../assets/icons"
import AppColors from "../config/colors"
import { SafeAreaView } from "react-native-safe-area-context"
import authStore from "../mobx/AuthStore"
const { width, height } = Dimensions.get("window")

const VerifiedScreen = ({ navigation }) => {
	const handleContinue = () => {
		authStore.setVerifiedStatus(false)
		navigation.navigate("HomeScreen")
	}
	const handleCompleteKyc = () => {
		authStore.setVerifiedStatus(true)
		navigation.navigate("Profile")
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.iconContainer}>
				<VerifiedIcon />
				<Text style={styles.text}>Verified</Text>
			</View>
			<View style={styles.bottomSection}>
				<TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={() => handleCompleteKyc()}>
					<Text style={styles.btnText}>Complete KYC</Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.9} style={styles.buttonOutline} onPress={() => handleContinue()}>
					<Text style={styles.btnTextOutline}>Continue</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 70,
		paddingBottom: 100,
		justifyContent: "space-between",
		alignItems: "center"
	},

	iconContainer: {
		marginBottom: 30
	},

	text: {
		fontWeight: "400",
		fontSize: 24,
		textAlign: "center",
		fontFamily: "Inter-Regular",
		color: AppColors.black,
		marginTop: 10
	},
	bottomSection: {
		width,
		justifyContent: "center",
		alignItems: "center"
	},
	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		height: 55,
		color: "#FFF",
		width: "80%",
		backgroundColor: AppColors.primary,
		marginBottom: 20
	},
	btnText: {
		fontSize: 16,
		fontFamily: "Inter-SemiBold",
		fontWeight: "600",
		color: "#FFF"
	},
	buttonOutline: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#006060",
		height: 55,
		color: "#FFF",
		width: "80%",
		backgroundColor: "transparent"
	},
	btnTextOutline: {
		color: AppColors.btngrey,
		fontSize: 16,
		fontFamily: "Inter-SemiBold",
		fontWeight: "600"
	}
})

export default VerifiedScreen
