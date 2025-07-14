import React, { forwardRef, useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"

export const CustomTextInput = forwardRef(({ label, placeholder, error, onChangeText, ...props }, ref) => {
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
			<TextInput ref={ref} style={styles.input} placeholder={placeholder} value={value} onChangeText={handleTextChange} {...props} />
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		marginBottom: 20
	},
	label: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D"
	},
	input: {
		fontFamily: "Inter-Regular",
		minHeight: 56,
		borderColor: "#E6E9EC",
		borderWidth: 1,
		padding: 8,
		borderRadius: 8,
		fontSize: 16
	},
	error: {
		color: "red",
		marginTop: 3,
		fontSize: 12
	}
})

export default CustomTextInput
