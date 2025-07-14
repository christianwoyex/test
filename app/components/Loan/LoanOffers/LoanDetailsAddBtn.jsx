import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconActiveDot, IconAddGuarantor, IconAddRepayment, IconArrowForward, IconForwardLarge, IconInActiveDot } from "../../../../assets/icons"

const AddLoanDetailsBtn = ({ indicatorIcon, onPress, bgColor = "#000000", borderColor = "", icon = 1, title = "Pending Loans", desc = "", titleColor = "" }) => {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.bgcontainer, { backgroundColor: bgColor ? bgColor : "", borderColor: borderColor ? borderColor : "" }]}>
			<View style={styles.innerContent}>
				{icon === 1 && <IconAddGuarantor />}
				{icon === 2 && <IconAddRepayment />}
				<View style={{ justifyContent: "center" }}>
					<Text style={[styles.titleText, { color: titleColor ? titleColor : "#404040" }]}>{title}</Text>
					{desc && <Text style={styles.descText}>{desc}</Text>}
				</View>
			</View>
			<View>
				{icon === 1 && <IconForwardLarge />}
				{icon === 2 && <IconArrowForward />}
				<View style={{ position: "absolute", top: "-50%", right: "-50%" }}>{indicatorIcon}</View>
			</View>
		</TouchableOpacity>
	)
}

export default AddLoanDetailsBtn

const styles = StyleSheet.create({
	bgcontainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 16,
		borderWidth: 1,
		paddingHorizontal: 15,
		marginTop: 10,
		borderRadius: 12
	},
	innerContent: {
		width: "75%",
		flexDirection: "row",
		alignItems: "center",
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
		fontSize: 12,
		fontWeight: "500",
		lineHeight: 17,
		letterSpacing: 0,
		textAlign: "left",
		color: "#404040"
	}
})
