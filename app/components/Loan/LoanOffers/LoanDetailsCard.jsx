import { observer } from "mobx-react"
import * as React from "react"
import { View, StyleSheet, Text } from "react-native"
import { Dimensions } from "react-native"
import offerStore from "../../../mobx/LoanOfferStore"
import { formatThousand } from "../../common/formatPhoneNumber"
const { width } = Dimensions.get("window")
const LoanDetailsCard = ({ pickedOffer }) => {
	return (
		<View style={styles.container}>
			<View style={{ paddingLeft: 20, paddingRight: 20 }}>
				<Text style={styles.header}>Loan Type</Text>
				<Text style={styles.subTextheader}>{offerStore?.selectedOfferDetails?.loan_type?.name}</Text>
			</View>
			<View
				style={{
					marginTop: 25,
					borderWidth: 1,
					width: "100%",
					borderColor: "#EBEBEB"
				}}
			></View>
			<View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 25 }}>
				<Text style={styles.header}>Loan Amount</Text>
				<Text style={styles.subTextheader}>N{formatThousand(`${offerStore?.selectedOffer?.amount / 100}`)}.00</Text>
			</View>
			<View style={styles.content}>
				<View style={styles.row}>
					<View style={styles.label}>
						<Text style={styles.header}>Interest Rate</Text>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.subTextheader}>{offerStore?.selectedOffer?.interest_rate}%</Text>
					</View>
					<View style={styles.label}>
						<Text style={styles.header}>Repayment</Text>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.subTextheader}>
							N{formatThousand(`${((offerStore?.selectedOffer?.amount / 100) * offerStore?.selectedOffer?.interest_rate) / 100 + offerStore?.selectedOffer?.amount / 100}`)}.00
						</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.label}>
						<Text style={styles.header}>Tenor</Text>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.subTextheader}>
							{offerStore?.selectedOfferDetails.loan_application?.duration}{" "}
							{offerStore?.selectedOfferDetails.loan_application?.payment_frequency && offerStore?.selectedOfferDetails.loan_application?.payment_frequency === "weekly" ? "Weeks" : "Months"}
						</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

export default observer(LoanDetailsCard)

const styles = StyleSheet.create({
	container: {
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#EBEBEB00",
		backgroundColor: "#FFF",
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
		lineHeight: 22,
		textAlign: "left"
	},
	subTextheader: {
		fontFamily: "Inter-Regular",
		fontSize: 20,
		color: "#002D2D",
		fontWeight: "500",
		lineHeight: 22,
		letterSpacing: -0.02,
		textAlign: "left"
	},

	content: {
		display: "flex",
		flexDirection: "row",
		marginTop: 10,
		marginBottom: 10,
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
	}
})
