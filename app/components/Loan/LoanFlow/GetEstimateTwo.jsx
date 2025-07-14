import { StyleSheet, Text, View } from "react-native"
import React from "react"
import TextTopSection from "./TextTopSection"
import { IconPiggyGreen } from "../../../../assets/icons"
import CustomPrimaryButton from "../../common/PrimaryButton"
import { TouchableOpacity } from "@gorhom/bottom-sheet"

const GetEstimateTwo = () => {
	return (
		<View>
			<TextTopSection />
			<View style={styles.middleSection}>
				<IconPiggyGreen />
				<Text style={styles.amountText}>N1.000,000</Text>
				<Text style={styles.possibleLoanAmount}>Possible Loan amount</Text>
			</View>
			<View style={{ marginTop: 30 }}>
				<CustomPrimaryButton title={"Apply Now"} />
			</View>
			<View style={styles.bottomContent}>
				<Text style={styles.regLink}>Not an existing business?</Text>
				<TouchableOpacity>
					<Text style={styles.RegTextLink}>Click here</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default GetEstimateTwo

const styles = StyleSheet.create({
	middleSection: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
		backgroundColor: "#FFFFFF",
		paddingTop: 40,
		paddingBottom: 40,
		borderRadius: 12
	},
	amountText: {
		color: "#002D2D",
		fontFamily: "Inter-Regular",
		fontSize: 36,
		fontStyle: "normal",
		fontWeight: "500",
		// lineHeight: 0,
		letterSpacing: -0.72,
		marginTop: 10
	},
	possibleLoanAmount: {
		color: "#525252",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: 18,
		marginTop: 10
	},
	bottomContent: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		height: 50,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 60
	},
	regLink: {
		fontFamily: "Inter-Regular",
		color: "#525252",
		fontSize: 16,
		fontWeight: "300"
	},
	RegTextLink: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "300",
		color: "#525252",
		textDecorationLine: "underline",
		marginLeft: 6
	}
})
