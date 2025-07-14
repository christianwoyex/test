import { Dimensions, StyleSheet, Text, View } from "react-native"
import React from "react"
import MorebuttonRepayment from "./Morebutton"
import { daysUntil, formatNextDueDate, formatThousand } from "../common/formatPhoneNumber"
const { width, height } = Dimensions.get("window")
const NextRepaymentcard = ({ navigation, repayment }) => {
	// console.log(repayment)
	// console.clear()
	return (
		<View style={styles.nextRepLoanInfo}>
			<View style={{ display: "flex", height: "100%", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
				<View style={styles.contentOne}>
					<Text style={styles.labelText}>Amount due </Text>
					<Text style={styles.textSupport}>₦{formatThousand(`${repayment?.amount / 100}`)}</Text>
					<MorebuttonRepayment onPress={() => navigation.navigate("RepaymentHistory")} text="More details" color="#1DB954" />
				</View>
				<View style={styles.contentTwo}>
					<Text style={styles.labelText}>Due date</Text>
					<Text style={styles.textSupportDesc}>{formatNextDueDate(`${repayment?.due_date}`)}</Text>
					<Text style={styles.labelText}>In {daysUntil(`${repayment?.due_date}`)} Days</Text>
				</View>
			</View>
		</View>
	)
}

export default NextRepaymentcard

const styles = StyleSheet.create({
	nextRepLoanInfo: {
		backgroundColor: "#F2F9F9",
		width: "100%",
		flexDirection: "row",
		height: height / 3.5,
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 9,
		borderColor: "#BFDFDF",
		borderWidth: 1,
		marginTop: 15,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	textSupport: {
		color: "#003A3A",
		fontFamily: "Inter-SemiBold",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "600"
	},
	textSupportDesc: {
		color: "#003A3A",
		fontFamily: "Inter-SemiBold",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "300"
	},
	labelText: {
		color: "#96A3B0",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "300",
		letterSpacing: -0.12
	},
	contentOne: {
		height: "70%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between"
	},
	contentTwo: {
		height: "50%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between"
	}
})
