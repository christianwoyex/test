import * as React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Dimensions } from "react-native"
import { formatThousand } from "../../common/formatPhoneNumber"
const { width } = Dimensions.get("window")
const LoanOfferFirstcard = ({ onLearnMore, loanType = "Small Business Term Loan", offerAmount = "0.00", interestRate = "0", frequency = "", duration = 0, repayment }) => {
	return (
		<View style={styles.container}>
			<View style={{ paddingLeft: 20, paddingRight: 20 }}>
				<Text style={styles.header}>Loan Type</Text>
				<Text style={styles.subTextheader}>{loanType}</Text>
			</View>
			<View style={styles.content}>
				<View style={styles.row}>
					<View style={styles.label}>
						<Text style={styles.header}>Loan Amount</Text>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.subTextheader}>N{formatThousand(`${offerAmount}`)}.00</Text>
					</View>
					<View style={styles.label}>
						<Text style={styles.header}>Tenor</Text>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.subTextheader}>
							{duration} {frequency && frequency === "weekly" ? "Weeks" : "Months"}
						</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.label}>
						<Text style={styles.header}>Interest Rate</Text>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.subTextheader}>{interestRate}%</Text>
					</View>
					<View style={styles.label}>
						<Text style={styles.header}>Repayment</Text>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.subTextheader}>N{formatThousand(`${repayment}.00`)}</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					marginTop: 33,
					borderWidth: 1,
					width: "100%",
					borderColor: "#EBEBEB"
				}}
			></View>
			<TouchableOpacity activeOpacity={0.9} style={styles.linkContainer} onPress={onLearnMore}>
				<Text style={styles.link}>Learn more</Text>
			</TouchableOpacity>
		</View>
	)
}

export default LoanOfferFirstcard

const styles = StyleSheet.create({
	container: {
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#EBEBEB",
		backgroundColor: "#FFFFFF",
		marginTop: 18,
		paddingTop: 27,
		paddingBottom: 8,
		flexDirection: "column",
		alignItems: "stretch"
	},
	header: {
		fontFamily: "Inter-Regular",
		color: "#757575",
		fontSize: 14,
		fontWeight: "400",
		lineHeight: 17,
		textAlign: "left"
	},
	subTextheader: {
		fontFamily: "Inter-Regular",
		fontSize: 18,
		color: "#002D2D",
		fontWeight: "500",
		lineHeight: 22,
		letterSpacing: -0.02,
		textAlign: "left"
	},

	content: {
		display: "flex",
		flexDirection: "row",
		marginTop: 24,
		// alignItems: "stretch",
		// justifyContent: "space-between",
		gap: 40,
		paddingLeft: 20,
		paddingRight: 20
	},
	row: {
		display: "flex",
		alignItems: "stretch"
	},
	label: {
		fontFamily: "Inter-Regular",
		marginTop: 23
	},
	inputContainer: {
		color: "#002D2D",
		fontFamily: "Inter-Regular"
	},
	linkContainer: {
		borderTopWidth: 1,
		borderTopColor: "#EBEBEB",
		display: "flex",
		width: width / 2,
		marginTop: 20,
		flexDirection: "column",
		justifyContent: "center",
		// alignItems: "stretch",
		backgroundColor: "#D6EBEB",
		paddingVertical: 14,
		paddingHorizontal: 10,
		alignItems: "center",
		borderRadius: 35,
		alignSelf: "center",
		marginBottom: 15
	},
	link: {
		fontFamily: "Inter-SemiBold",
		fontSize: 16,
		color: "#008080",
		fontWeight: "700"
	}
})
