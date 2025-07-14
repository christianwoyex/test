import React from "react"
import { Text, Button, View, StyleSheet, TouchableOpacity } from "react-native"
import AppColors from "../../config/colors"
export const AppButton = ({ backColor = "", onPress, title = "title" }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={onPress}>
				<Text style={styles.btnText}>{title}</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		alignItems: "center",
		marginBottom: 30
	},
	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		height: 55,
		color: "#FFF",
		width: "100%",
		backgroundColor: AppColors.primary
	},
	btnText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFF"
	}
})
