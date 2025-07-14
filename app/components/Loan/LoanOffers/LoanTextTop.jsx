import * as React from "react"
import { View, StyleSheet, Text } from "react-native"

function LoanTextTop({ title = "Small Business Loan", subtitle = "Loan Type" }) {
	return (
		<View style={styles.container}>
			{subtitle && (
				<View style={styles.widthView}>
					<Text style={styles.content}>{subtitle}</Text>
				</View>
			)}
			<View style={styles.widthView}>
				<Text style={styles.header}>{title}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: "stretch",
		display: "flex",
		maxWidth: "100%",
		flexDirection: "column"
	},
	widthView: {
		width: "100%"
	},
	header: {
		color: "#002D2D",
		fontFamily: "Inter-Regular",
		width: "100%",
		fontWeight: "500",
		fontSize: 21
	},
	content: {
		color: "#000000",
		marginTop: 0,
		width: "100%",
		fontWeight: "300",
		fontSize: 14
	}
})

export default LoanTextTop
