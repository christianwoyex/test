import { StyleSheet, Text, View } from "react-native"
import React from "react"
import DuePaymentTop from "./DuePaymentTop"

const RepaymentHistory = () => {
	return (
		<View style={styles.container}>
			<DuePaymentTop title="EMI History" desc="You've chosen Recurring Card Payments for your repayment method." />

			<View style={styles.histroycard}></View>
		</View>
	)
}

export default RepaymentHistory

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F2F4F5",
		paddingLeft: 20,
		paddingRight: 20
	},
	histroycard: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		height: 100,
		justifyContent: "space-between",
		borderRadius: 12,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: "#FFF",
		marginTop: 20,
		marginBottom: 30
	}
})
