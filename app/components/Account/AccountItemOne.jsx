import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconArrowForward } from "../../../assets/icons"

const AccountItemOne = ({ title = "", icon, onPress, border = false, bprofile = false }) => {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
			<View style={[styles.container, { borderColor: !border ? "#F2F4F5" : bprofile ? "#EFEFEF" : "#FFFFFF" }]}>
				<View style={styles.leftSection}>
					{icon}
					<Text style={styles.accountFeatureLabel}>{title}</Text>
				</View>
				<IconArrowForward />
			</View>
		</TouchableOpacity>
	)
}

export default AccountItemOne

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 72,
		paddingLeft: 15,
		paddingRight: 15,
		marginTop: 5,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 14,
		borderColor: "#F2F4F5",
		borderWidth: 1,
		backgroundColor: "#FFF"
	},
	accountFeatureLabel: {
		color: "#3B3B3B",
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "500",
		letterSpacing: -0.02,
		marginLeft: 20
	},
	leftSection: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row"
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
