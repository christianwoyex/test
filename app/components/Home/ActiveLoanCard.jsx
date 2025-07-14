import { Dimensions, StyleSheet, Text, View } from "react-native"
import React from "react"

import { EyeIcon, NairaIcon } from "../../../assets/icons"
import { formatThousand } from "../common/formatPhoneNumber"
const { height } = Dimensions.get("window")

const ActiveLoanCard = ({ loan }) => {
	return (
		<View style={styles.homeLoanInfo}>
			<View style={styles.loanTextContent}>
				<Text style={styles.loanApprovedText}>Loan {loan?.status}</Text>
				<EyeIcon />
			</View>
			<View style={styles.loanTextContent}>
				<NairaIcon />
				<View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
					<Text style={styles.loanText}>{formatThousand(`${loan?.amount / 100}`)}.</Text>
					<Text style={styles.loanTextAfterDot}>00</Text>
				</View>
			</View>
			<View style={styles.loanTextContent}>
				<Text style={styles.interestText}>Interest Rate</Text>
				<Text style={styles.interestPercent}>{loan?.interest_rate / 100}%</Text>
			</View>
		</View>
	)
}

export default ActiveLoanCard

const styles = StyleSheet.create({
	homeLoanInfo: {
		backgroundColor: "#E7FBF2",
		width: "100%",
		height: height / 3.8,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 14,
		borderColor: "#AEF2D2",
		borderWidth: 1
	},
	loanTextContent: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 10,
		borderRadius: 20
	},
	loanApprovedText: {
		color: "#6B7D90",
		fontFamily: "Inter-SemiBold",
		fontSize: 13,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 20,
		letterSpacing: 0.674,
		marginRight: 19
	},
	loanText: {
		color: "#002D2D",
		fontFamily: "Inter-SemiBold",
		fontSize: 30,
		fontStyle: "normal",
		fontWeight: "600",
		// lineLeight: 20,
		letterSpacing: -2,
		marginLeft: 5
	},
	loanTextAfterDot: {
		color: "#002D2D",
		fontFamily: "Inter-SemiBold",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "600",
		marginTop: 8,
		// lineLeight: 20,
		letterSpacing: 0
		// marginLeft: 5
	},
	interestText: {
		color: "#2B4560",
		fontFamily: "Inter-SemiBold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "400",
		// lineHeight: 14,
		marginRight: 5
	},
	interestPercent: {
		color: "#1DB954",
		fontFamily: "Inter-SemiBold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "400"
		// lineHeight: 14
	}
})
