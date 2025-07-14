import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconArrowBackhead } from "../../../assets/icons"

const Repaymentheader = ({ backButton = false, text = true, navigation }) => {
	return (
		<View style={styles.headerContainer}>
			{text && <Text style={styles.heardText}>Repayment</Text>}
			{backButton && (
				<View style={styles.header}>
					<TouchableOpacity activeOpacity={0.9} style={styles.arrowBtn} onPress={() => navigation.goBack()}>
						<IconArrowBackhead />
					</TouchableOpacity>
				</View>
			)}
			<TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Notification")}>
				<Image source={require("../../../assets/images/noti.png")} />
			</TouchableOpacity>
		</View>
	)
}

export default Repaymentheader

const styles = StyleSheet.create({
	headerContainer: {
		display: "flex",
		justifyContent: "center",
		height: 70,
		width: "100%",
		backgroundColor: "#F2F4F5",
		paddingLeft: 15,
		paddingRight: 15,
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
	}
})
