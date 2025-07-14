import { StyleSheet, Text, View } from "react-native"
import React from "react"

const PasswordHintModal = () => {
	return (
		<View style={{ marginBottom: 20 }}>
			<Text style={styles.textDesc}>Password must be atleast 8 characters long, is alphanumeric and must contain atleast one (1) uppercase and special character</Text>
		</View>
	)
}

export default PasswordHintModal

const styles = StyleSheet.create({
	textDesc: {
		color: "#2E2E2E",
		fontFamily: "Inter-Regular",
		fontSize: 11,
		fontStyle: "italic",
		fontWeight: "300",
		lineHeight: 18,
		textAlign: "justify"
	}
})
