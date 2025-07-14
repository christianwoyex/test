import { StyleSheet, Text, TouchableOpacity } from "react-native"
import React from "react"
import { IconArrowWithColor } from "../../../assets/icons"

const MorebuttonRepayment = ({ text = "See All", color = "", onPress }) => {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.container, { color: color ? color : "#6B7D90" }]}>
			<Text style={[styles.textLabel, { color: color ? color : "#6B7D90" }]}>{text}</Text>
			<IconArrowWithColor color={color} />
		</TouchableOpacity>
	)
}

export default MorebuttonRepayment

const styles = StyleSheet.create({
	container: {
		height: 30,
		borderRadius: 12,
		paddingLeft: 8,
		paddingRight: 8,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	textLabel: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		marginRight: 10,
		fontStyle: "normal",
		fontWeight: "500"
	}
})
