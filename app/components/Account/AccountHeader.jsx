import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconArrowBackhead } from "../../../assets/icons"

const AccountHeader = ({ navigation }) => {
	return (
		<View style={styles.header}>
			<TouchableOpacity activeOpacity={0.9} style={styles.arrowBtn} onPress={() => navigation.goBack()}>
				<IconArrowBackhead />
			</TouchableOpacity>
		</View>
	)
}

export default AccountHeader

const styles = StyleSheet.create({
	header: {
		display: "flex",
		justifyContent: "center",
		height: 70,
		width: "100%",
		backgroundColor: "#F2F4F5",
		paddingLeft: 20
	},
	arrowBtn: {
		width: 40,
		height: 40,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFfff",
		borderRadius: 50
	}
})
