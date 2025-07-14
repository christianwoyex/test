import * as React from "react"
import { View, StyleSheet, Text } from "react-native"

function TitleTopSectionLoanOffer({ title = "Loan Offers", subtitle = "", fontSize = 32 }) {
	return (
		<View style={styles.container}>
			<View style={styles.widthView}>
				<Text style={[styles.header, { fontSize: fontSize }]}>{title}</Text>
			</View>
			{subtitle && (
				<View style={styles.widthView}>
					<Text style={styles.content}>{subtitle}</Text>
				</View>
			)}
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
		fontWeight: "500"
	},
	content: {
		color: "#575757",
		marginTop: 0,
		width: "100%",
		fontWeight: "300",
		fontSize: 14
	}
})

export default TitleTopSectionLoanOffer
