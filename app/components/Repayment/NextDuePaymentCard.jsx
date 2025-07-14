import { Dimensions, StyleSheet, Text, View } from "react-native"
import React from "react"
import { daysUntil, formatNextDueDate, formatThousand } from "../common/formatPhoneNumber"
const { width, height } = Dimensions.get("window")

const NextDuePaymentCard = ({ repayment }) => {
	return (
		<View style={styles.nextRepLoanInfo}>
			<View style={{ display: "flex", height: "100%", width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
				<View style={styles.contentOne}>
					<Text style={styles.labelText}>You owe</Text>
					<Text style={styles.textSupport}>₦{formatThousand(`${repayment?.data?.amount / 100}`)}</Text>
				</View>
				<View style={styles.contentTwo}>
					<Text style={styles.labelText}>Due date</Text>
					<Text style={styles.textSupportDesc}>{formatNextDueDate(repayment?.data?.due_date)}</Text>
					<Text style={styles.labelText}>In {daysUntil(repayment?.data?.due_date)} Days</Text>
				</View>
				<View style={{ width: "100%" }}>
					<Text style={styles.labelText}>Interest Rate</Text>
					<Text style={styles.labelValue}>{repayment?.data?.loan_offer?.interest_rate}%</Text>
				</View>
			</View>
		</View>
	)
}

export default NextDuePaymentCard

const styles = StyleSheet.create({
	nextRepLoanInfo: {
		backgroundColor: "#FFF",
		width: "100%",
		flexDirection: "column",
		height: height / 2.8,
		// justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 9,
		marginTop: 15,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	textSupport: {
		color: "#003A3A",
		fontFamily: "Inter-Regular",
		fontSize: 30,
		fontStyle: "normal",
		fontWeight: "600"
	},
	textSupportDesc: {
		color: "#003A3A",
		fontFamily: "Inter-SemiBold",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "300"
	},
	labelText: {
		color: "#96A3B0",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "300",
		letterSpacing: -0.12
	},
	contentOne: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between"
	},
	contentTwo: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between"
	}
})
