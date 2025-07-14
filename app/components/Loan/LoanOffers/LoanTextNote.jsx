import { StyleSheet, Text, View } from "react-native"
import React from "react"

const LoanTextNote = ({ text = "Please wait..." }) => {
	return <Text style={styles.textStyle}>{text}</Text>
}

export default LoanTextNote

const styles = StyleSheet.create({
	textStyle: {
		fontFamily: "Inter-Regular",
		fontSize: 13,
		fontWeight: "400",
		lineHeight: 20,
		letterSpacing: 0,
		textAlign: "left",
		color: "#525252",
		marginTop: 10
	}
})
