import { TouchableOpacity, StyleSheet, Text } from "react-native"
import React from "react"
import AppColors from "../../config/colors"

const CustomPrimaryButtonWithDisble = ({ title = "custom Text", onPress, disabled = false }) => {
	return (
		<TouchableOpacity activeOpacity={0.9} disabled={disabled} style={[styles.buttonOutline, { backgroundColor: disabled ? "#B0B0B0" : "#006060" }]} onPress={onPress}>
			<Text style={styles.btnTextOutline}>{title}</Text>
		</TouchableOpacity>
	)
}

export default CustomPrimaryButtonWithDisble

const styles = StyleSheet.create({
	buttonOutline: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		height: 55,
		color: "#FFF",
		width: "100%",
		marginTop: 20
	},
	btnTextOutline: {
		color: AppColors.white,
		fontSize: 16,
		fontFamily: "Inter-SemiBold",
		fontWeight: "600"
	}
})
