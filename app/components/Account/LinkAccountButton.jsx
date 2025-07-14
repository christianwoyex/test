import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconCameraForward } from "../../../assets/icons"

const LinkAccountButton = ({ title = "", icon, onPress, righticon, border = false }) => {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
			<View style={[styles.container, { borderColor: !border ? "#D6EBEB" : "#FFFFFF" }]}>
				<View style={styles.leftSection}>
					{icon}
					<Text style={styles.accountFeatureLabel}>{title}</Text>
				</View>
				{righticon}
			</View>
		</TouchableOpacity>
	)
}

export default LinkAccountButton

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 72,
		paddingLeft: 15,
		paddingRight: 30,
		marginTop: 8,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 14,
		borderColor: "#D6EBEB",
		borderWidth: 1,
		backgroundColor: "#FFF"
	},
	accountFeatureLabel: {
		color: "#004D4D",
		fontFamily: "Inter-Regular",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "500",
		letterSpacing: -0.02,
		marginLeft: 20
	},
	leftSection: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	titleText: {
		color: "#3B3B3B",
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "500",
		letterSpacing: -0.02
	}
})
