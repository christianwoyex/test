import { StyleSheet, TouchableOpacity, Text, View } from "react-native"
import React from "react"
import { IconLoanStatusNotApproved, IconLoanStatusPending, IconLoanStatusUnderreview } from "../../../../assets/icons"

const StatusLabelItem = ({ bgColor = "#000000", borderColor = "", icon = 1, title = "Pending Loans", desc = "", titleColor = "", onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.bgcontainer, { backgroundColor: bgColor ? bgColor : "", borderColor: borderColor ? borderColor : "" }]}>
			{icon === 1 && <IconLoanStatusUnderreview />}
			{icon === 2 && <IconLoanStatusPending />}
			{icon === 3 && <IconLoanStatusNotApproved />}
			<View>
				<Text style={[styles.titleText, { color: titleColor ? titleColor : "#404040" }]}>{title}</Text>
				<Text style={styles.descText}>{desc}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default StatusLabelItem

const styles = StyleSheet.create({
	bgcontainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		height: 90,
		borderWidth: 1,
		paddingHorizontal: 15,
		marginTop: 10,
		borderRadius: 12,
		gap: 15
	},
	titleText: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "500",
		lineHeight: 22,
		letterSpacing: 0,
		textAlign: "left"
	},
	descText: {
		fontFamily: "Inter-Regular",
		fontSize: 10,
		fontWeight: "500",
		lineHeight: 22,
		letterSpacing: 0,
		textAlign: "left",
		color: "#404040"
	}
})
