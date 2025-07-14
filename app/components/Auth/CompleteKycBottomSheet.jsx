import React, { useCallback, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import { useEffect } from "react"
import AppColors from "../../config/colors"

const CompleteKycBottomSheet = ({ onContinue, onCompleteKYC }) => {
	const bottomSheetModalRef = useRef()

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])

	useEffect(() => {
		setTimeout(() => {
			handlePresentModalPress()
		}, 3000)
	}, [])
	return (
		<View style={styles.contentContainer}>
			<View>
				<Text style={styles.completekycText}>Complete KYC</Text>
			</View>
			<View
				style={{
					width: "100%",
					marginVertical: 15,
					height: 2,
					backgroundColor: "#D9D9D9"
				}}
			></View>
			<View>
				<Text style={styles.completekycDesText}>We need essential information about your business to proceed with your business loan application.</Text>
			</View>
			<View style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity activeOpacity={0.9} style={styles.buttonOutline} onPress={onContinue}>
						<Text style={styles.btnTextOutline}>Continue</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={onCompleteKYC}>
						<Text style={styles.btnText}>Complete KYC</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		width: "100%",
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: "#FFFFFF"
	},
	buttonContainer: {
		width: "48%"
	},
	completekycText: {
		color: "#002D2D",
		fontFamily: "Inter-SemiBold",
		fontSize: 22,
		fontStyle: "normal",
		fontWeight: "500",
		lineHeight: 27
	},
	completekycDesText: {
		color: "#4A4A4A",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: 22
	},
	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		height: 55,
		color: "#FFF",
		width: "100%",
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
		width: "100%",
		backgroundColor: "transparent"
	},
	btnTextOutline: {
		color: AppColors.btngrey,
		fontSize: 16,
		fontFamily: "Inter-SemiBold",
		fontWeight: "600"
	}
})

export default CompleteKycBottomSheet
