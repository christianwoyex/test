import { StyleSheet, Text, View } from "react-native"
import React from "react"

const RepaymentSubText = ({ title = "", color }) => {
	return (
		<View>
			<Text style={[styles.title, { color: color ? color : "#008080" }]}>{title}</Text>
		</View>
	)
}

export default RepaymentSubText

const styles = StyleSheet.create({
	title: {
		fontFamily: "Inter-Regular",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "500"
	}
})
