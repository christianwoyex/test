import { Dimensions, StyleSheet, Text, View } from "react-native"
import React from "react"
const { width, height } = Dimensions.get("window")
const EmptyLoanCard = () => {
	return (
		<View style={styles.emptyCard}>
			<Text style={styles.loanEmptyText}>You owe</Text>
			<Text style={styles.loanEmpText}>₦00.00</Text>
		</View>
	)
}

export default EmptyLoanCard

const styles = StyleSheet.create({
	emptyCard: {
		backgroundColor: "#F9F9F9",
		width: "100%",
		height: height / 4.5,
		justifyContent: "center",
		// alignItems: "center",
		paddingHorizontal: 20,
		borderRadius: 14,
		borderColor: "#F9F9F9",
		borderWidth: 1
	},

	loanEmptyText: {
		color: "#6B7D90",
		fontFamily: "Inter-Regular",
		fontSize: 13,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 20,
		letterSpacing: 0.674,
		marginRight: 19
	},

	loanEmpText: {
		color: "#000000",
		fontFamily: "Inter-SemiBold",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "600",
		// lineLeight: 20,
		letterSpacing: 0.064,
		marginLeft: 5
	}
})
