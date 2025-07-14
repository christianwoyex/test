import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconArrowBackhead } from "../../../../assets/icons"

const EstimateHeader = ({ text = "", backButton = true, navigation, bgColor = "", noti = true }) => {
	return (
		<View style={[styles.headerContainer, { backgroundColor: bgColor ? bgColor : "transparent" }]}>
			{text && <Text style={styles.heardText}>Repayment</Text>}
			{backButton && (
				<View style={styles.header}>
					<TouchableOpacity activeOpacity={0.9} style={styles.backButton} onPress={() => navigation.goBack()}>
						<IconArrowBackhead />
					</TouchableOpacity>
				</View>
			)}
			{noti && (
				<TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Notification")}>
					<Image source={require("../../../../assets/images/noti.png")} />
				</TouchableOpacity>
			)}
		</View>
	)
}

export default EstimateHeader

const styles = StyleSheet.create({
	headerContainer: {
		display: "flex",
		justifyContent: "center",
		height: 50,
		width: "100%",
		backgroundColor: "#F2F4F5",
		// paddingLeft: 15,
		// paddingRight: 15,
		display: "flex",
		marginTop: 5,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	heardText: {
		color: "#002D2D",
		fontFamily: "Inter-SemiBold",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "500"
	},
	backButton: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFF",
		width: 35,
		height: 35,
		borderRadius: 50
	}
})
