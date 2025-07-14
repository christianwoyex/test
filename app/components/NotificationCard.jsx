import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import LoanTemTextItem from "./Loan/LoanOffers/LoanTemTextItem"
import { formatThousand } from "./common/formatPhoneNumber"
//Destructure the card Prop[s]
const NotificationCard = ({ loanType = "Small Business Term Loan", amount = "0", duration = "", frequency = "", interestRate = "", repayment = "", onLearnMore, onApply }) => {
	return (
		<View style={styles.cardStyles}>
			<View style={{ width: "100%", paddingHorizontal: 30, paddingTop: 30, paddingBottom: 15 }}>
				<Text style={styles.loanType}>Loan Type: {loanType}</Text>
				<LoanTemTextItem subtitle={`Loan Amount: N${formatThousand(`${amount}`)}.00`} />
				<LoanTemTextItem subtitle={`Interest Rate:  ${interestRate}%`} />
				<LoanTemTextItem subtitle={`Term: ${duration} ${frequency && frequency === "weekly" ? "Weeks" : "Months"} `} />
				<LoanTemTextItem subtitle={`${frequency && frequency === "weekly" ? "Weekly" : "Monthly"}  Payment:  N${formatThousand(repayment / duration)}`} />
			</View>
			<View style={{ width: "100%", height: 1, backgroundColor: "#D1D1D1" }}></View>
			<View style={styles.actionAreaStyle}>
				<Pressable onPress={onApply} style={{ width: 80, alignItems: "center", justifyContent: "center", height: 40 }}>
					<Text style={styles.buttonText}>Apply</Text>
				</Pressable>
				<Pressable style={{ width: 80, alignItems: "center", justifyContent: "center", height: 40 }} onPress={onLearnMore}>
					<Text style={styles.buttonText}>Learn More</Text>
				</Pressable>
			</View>
		</View>
	)
}

export default NotificationCard

const styles = StyleSheet.create({
	cardStyles: {
		width: "100%",
		height: 225,
		backgroundColor: "#ECECEC",
		borderRadius: 2,
		marginBottom: 50
	},
	loanType: {
		fontFamily: "Inter-SemiBold",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 15,
		lineHeight: 18,
		color: "#000000",
		marginBottom: 10
	},
	actionAreaStyle: {
		display: "flex",
		flexDirection: "row",
		// backgroundColor: "green",
		paddingHorizontal: 50,
		height: 50,
		justifyContent: "space-between",
		alignItems: "center"
	},
	buttonText: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 13,
		lineHeight: 16,
		color: "#000000"
	}
})
