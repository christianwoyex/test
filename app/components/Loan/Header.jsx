import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import React from "react"
import { ArrowBttnSpecail, IconArrowBackhead } from "../../../assets/icons"

const LoanHeader = ({ border = true, navigation, title = "Loan Packages" }) => {
	return (
		<View style={[styles.container, { borderBottomWidth: 1, borderBottomColor: border ? "#D9D9D9" : "#ffF" }]}>
			<TouchableOpacity activeOpacity={0.9} style={{ width: 20, height: 25 }} onPress={() => navigation.goBack()}>
				<IconArrowBackhead />
			</TouchableOpacity>
			<Text style={styles.headerText}>{title}</Text>
		</View>
	)
}

export default LoanHeader

const styles = StyleSheet.create({
	container: {
		flex: 0.1,
		width: "100%",
		backgroundColor: "#FFFFFF",
		paddingLeft: 20,
		paddingRight: 20,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "start"
	},
	headerText: {
		color: "#002D2D",
		fontFamily: "Inter-Regular",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "400",
		marginLeft: 20
		// lineHeight: 28,
	}
})
