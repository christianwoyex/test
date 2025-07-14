import React, { useCallback, useMemo, useRef } from "react"
import { View, Text, StyleSheet, Button, TouchableHighlight } from "react-native"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { useEffect } from "react"
import AppColors from "../../config/colors"

const RepaymentOptionBottomSheet = () => {
	// ref
	const bottomSheetModalRef = useRef()

	// variables
	const snapPoints = useMemo(() => ["15%", "30%"], [])

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])
	const handleSheetChanges = useCallback(index => {}, [])

	useEffect(() => {
		setTimeout(() => {
			handlePresentModalPress()
		}, 3000)
	}, [])
	// renders
	return (
		<View style={styles.container}>
			<BottomSheetModal ref={bottomSheetModalRef} handleStyle={{ backgroundColor: "#D9D9D9" }} index={1} enablePanDownToClose={true} snapPoints={snapPoints} onChange={handleSheetChanges}>
				<View style={styles.contentContainer}>
					<Text style={styles.completekycText}>Repayment options</Text>
					<View style={{ width: "100%", height: 1, backgroundColor: "#D9D9D9", marginBottom: 16, marginTop: 16 }}></View>
					<Text style={styles.completekycDesText}>Essential information about you are your business is required to access business loan</Text>

					<View style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
						<View style={styles.buttonContainer}>
							<TouchableHighlight style={styles.buttonOutline} onPress={() => console.log("Continue home")}>
								<Text style={styles.btnTextOutline}>Continue</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</BottomSheetModal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 0.2,
		padding: 24,
		justifyContent: "center"
		// backgroundColor: "grey"
	},
	contentContainer: {
		// flex: 0.2,
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: "red"
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

export default RepaymentOptionBottomSheet
