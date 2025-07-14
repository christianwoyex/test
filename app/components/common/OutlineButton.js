import React from "react"
import { TouchableHighlight, Text, View, StyleSheet } from "react-native"
import AppColors from "../../config/colors"
export const AppButtonOutline = ({ backColor = "" }) => {
	return (
		<View style={styles.container}>
			<TouchableHighlight style={styles.button}>
				<Text style={styles.btnText}>Login</Text>
			</TouchableHighlight>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		alignItems: "center"
	},
	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#006060",
		height: 60,
		color: "#FFF",
		width: "80%",
		backgroundColor: "transparent"
	},
	btnText: {
		color: AppColors.btngrey,
		fontSize: 20,
		fontWeight: "bold"
	}
})
