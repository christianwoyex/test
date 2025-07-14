import * as React from "react"
import { View, StyleSheet, Text } from "react-native"

function LoanTemTextItem({ subtitle = "Loan Type" }) {
	return (
		<View style={styles.container}>
			<View style={styles.widthView}></View>
			<View style={{ width: "95%" }}>
				<Text style={styles.textStyles}>{subtitle}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		maxWidth: "100%",
		marginLeft: 10,
		paddingVertical: 5,
		// alignItems: "center",
		flexDirection: "row",
		gap: 10
	},
	widthView: {
		width: 5,
		height: 5,
		borderRadius: 50,
		backgroundColor: "#404040",
		marginTop: 5
	},

	textStyles: {
		color: "#404040",
		fontFamily: "Inter-Regular",
		marginTop: 0,
		fontWeight: "700",
		fontSize: 13,
		lineHeight: 14
	}
})

export default LoanTemTextItem
