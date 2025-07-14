import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconMaskLoanBg, IconGreenleBg, IconPupleBg, IconWhiteArrowForward, IconYellowleBg } from "../../../assets/icons"
const { width, height } = Dimensions.get("window")

const LoanPackageItem = ({ subtext = "", title = "", bgColor = "", current = 0, onPress, bgAsth = { first: "", second: "" } }) => {
	return (
		<TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={onPress}>
			<View style={styles.bgcontainerInner}>
				<View style={[styles.bgcontainer, { backgroundColor: bgColor ? bgColor : "" }]}>
					<View style={styles.iconsContainer}>
						{title.includes("Equity") ? <IconPupleBg /> : null}
						{title.includes("SME") ? <IconGreenleBg /> : null}
						{title.includes("Local") ? <IconYellowleBg /> : null}
						<IconWhiteArrowForward />
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>{title}</Text>
						<Text style={styles.descriptionText}>{subtext}</Text>
					</View>
				</View>
				<IconMaskLoanBg firstColor={bgAsth.first} secondColor={bgAsth.second} />
			</View>
		</TouchableOpacity>
	)
}

export default LoanPackageItem

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	iconsContainer: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},

	bgcontainerInner: {
		height: height / 3.5,
		borderRadius: 12,
		// position:"relative",
		width: "94%",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "flex-end",
		zindex: 0
	},
	bgcontainer: {
		height: height / 3.5,
		borderRadius: 12,
		width: "100%",
		display: "flex",
		marginTop: 16,
		position: "absolute",
		flexDirection: "column",
		justifyContent: "space-between",
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		paddingBottom: 20,
		zindex: 1
	},

	titleText: {
		color: "#FFF",
		fontFamily: "Inter-Regular",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "500",
		marginTop: 10
	},
	descriptionText: {
		color: "#FFF",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "300",
		marginTop: 10,
		letterSpacing: 1
	},
	titleContainer: {
		display: "flex",
		flexDirection: "column",
		width: "85%"
	}
})
