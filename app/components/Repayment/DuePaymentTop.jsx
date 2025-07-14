import { StyleSheet, Text, View } from "react-native"
import React from "react"

const DuePaymentTop = ({ title = "Next Repayment", desc = "You've chosen Recurring Card Payments for your repayment method." }) => {
	return (
		<View style={{ marginBottom: 10 }}>
			<Text style={styles.titleTextDue}>{title}</Text>
			<Text style={styles.labelText}>{desc}</Text>
		</View>
	)
}

export default DuePaymentTop

const styles = StyleSheet.create({
	titleTextDue: {
		color: "#002D2D",
		fontFamily: "Inter-SemiBold",
		fontSize: 27,
		fontStyle: "normal",
		fontWeight: "500"
		// lineHeight: 16,
		// marginTop: 30
	},
	labelText: {
		color: "#666666",
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "300",
		letterSpacing: -0.12,
		marginTop: 10,
		lineHeight: 22
	}
})
