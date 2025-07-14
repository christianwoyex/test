import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { IconCreditCard } from "../../../assets/icons"

export const CustomExpiryDateInput = ({ label, placeholder, error, onChangeText, ...props }) => {
	const [value, setValue] = useState("")

	const handleTextChange = text => {
		setValue(text)
		if (onChangeText) {
			onChangeText(text)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>

			<TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={"#B1B1B1"} value={value} onChangeText={handleTextChange} {...props} />

			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16
	},
	label: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 8,
		color: "#525252"
	},
	input: {
		height: 56,
		fontFamily: "Inter-Regular",
		borderColor: "#D9D9D9",
		borderWidth: 1,
		padding: 8,
		borderRadius: 8,
		fontSize: 16
	},
	error: {
		color: "red",
		marginTop: 8
	}
})

export default CustomExpiryDateInput
