import { StyleSheet, Text, View } from "react-native"
import React from "react"

const TextTopSection = () => {
	return (
		<View style={{ marginTop: 20 }}>
			<Text style={styles.titleText}>Loan Estimate</Text>
			<Text style={styles.descText}>Start with an estimate of how much loan you can get for your business</Text>
		</View>
	)
}

export default TextTopSection

const styles = StyleSheet.create({
	titleText: {
		color: "#001F3F",
		fontFamily: "Inter-Regular",
		fontSize: 32,
		fontStyle: "normal",
		fontWeight: "500",
		lineHeight: 37,
		letterSpacing: 0.03
	},
	descText: {
		color: "#575757",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 18,
		letterSpacing: -0.013,
		marginTop: 5
	}
})
