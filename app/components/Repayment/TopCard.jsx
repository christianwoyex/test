import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { formatThousand, formatNumber, formatDayOFMonth } from "../common/formatPhoneNumber"

const TopCardRepay = ({ repayemnt }) => {
	return (
		<View style={styles.home}>
			<View style={styles.topContent}>
				<Text style={styles.yourOwnText}>You Owe</Text>
				<View style={{ marginLeft: "-700" }}>
					<Text style={styles.interestText}>Interest Rate</Text>
					<Text style={styles.labelValue}>{repayemnt?.loan_offer?.interest_rate}%</Text>
				</View>
			</View>
			<View>
				<Text style={styles.repaymentamount}>₦{formatThousand(`${((repayemnt?.loan_offer?.interest_rate / 100) * repayemnt?.loan_offer?.amount) / 100 + repayemnt?.loan_offer?.amount / 100}`)}</Text>
			</View>
			<View style={styles.topContent}>
				<View>
					<Text style={styles.labelText}>{repayemnt?.loan_offer?.loan_application?.payment_frequency === "monthly" ? "Monthly" : "Weekly"} repayment</Text>
					<Text style={styles.labelValue}>₦{formatNumber(`${(repayemnt?.amount / 100).toFixed(0)}`)}.00</Text>
				</View>

				<View>
					<Text style={styles.labelText}>Repayment due</Text>
					<Text style={styles.labelValue}>{formatDayOFMonth(`${repayemnt?.due_date}`)}</Text>
				</View>
			</View>
		</View>
	)
}

export default TopCardRepay

const styles = StyleSheet.create({
	home: {
		borderRadius: 12,
		backgroundColor: "#008080",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: 200,
		marginTop: 20,
		marginBottom: 20,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	topContent: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},

	repaymentamount: {
		color: "#F2F4F5",
		fontFamily: "Inter-SemiBold",
		fontSize: 28,
		fontStyle: "normal",
		fontWeight: "600",
		lineHeight: 30,
		letterSpacing: -0.12
	},
	yourOwnText: {
		color: "#F2F4F5",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "300",
		letterSpacing: -0.12
	},
	labelText: {
		color: "#DBF9EB",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300",
		letterSpacing: -0.12
	},
	interestText: {
		color: "#1DB954",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300",
		letterSpacing: -0.12
	},
	labelValue: {
		color: "#DBF9EB",
		fontFamily: "Inter-Regular",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "400",
		letterSpacing: -0.12
	}
})
