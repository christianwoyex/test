import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import AppColors from "../../config/colors"

const CustomOutlineButton = ({ title = "custom Text", onPress }) => {
	return (
		<TouchableOpacity activeOpacity={0.9} style={styles.buttonOutline} onPress={onPress}>
			<Text style={styles.btnTextOutline}>{title}</Text>
		</TouchableOpacity>
	)
}

export default CustomOutlineButton

const styles = StyleSheet.create({
	buttonOutline: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#006060",
		height: 55,
		color: "#FFF",
		width: "100%",
		backgroundColor: "transparent",
		marginTop: 20
	},
	btnTextOutline: {
		color: AppColors.btngrey,
		fontSize: 16,
		fontFamily: "Inter-SemiBold",
		fontWeight: "600"
	}
})
