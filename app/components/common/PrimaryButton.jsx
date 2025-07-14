import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

const CustomPrimaryButton = ({ title, onPress, ...props }) => {
	return (
		<TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={onPress} {...props}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#00796b", // Royal Green color
		borderRadius: 8,
		height: 55,
		// paddingVertical: 18,
		paddingHorizontal: 24,
		// height: 40,
		alignItems: "center",
		justifyContent: "center"
	},
	buttonText: {
		color: "#ffffff",
		fontFamily: "Inter-SemiBold", // White color
		fontSize: 16,
		fontWeight: "600"
	}
})

export default CustomPrimaryButton
