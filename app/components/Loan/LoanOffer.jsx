import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import LoanOfferFirstcard from "./LoanOffers/FirstCard"
import TitleTopSectionLoanOffer from "./LoanOffers/TopInfoSection"
import LoanTextNote from "./LoanOffers/LoanTextNote"
import { IconScrollToTop } from "../../../assets/icons"
import offerStore from "../../mobx/LoanOfferStore"
import { observer } from "mobx-react"
import { calculateRepaymentMonthly, calculateRepaymentWeeks } from "../common/formatPhoneNumber"

const LoanOffer = ({ onScrollTop, navigation }) => {
	function LoanOfferSingle({ offer }) {
		const handleSelectOffer = offerType => {
			offerStore.setSelectedOffermain(offerType)
		}

		return (
			<View>
				<LoanOfferFirstcard
					offerAmount={offer?.amount / 100}
					loanType={offer?.loan_type?.name}
					interestRate={offer?.interest_rate}
					frequency={offer?.loan_application?.payment_frequency}
					duration={offer?.loan_application?.duration}
					repayment={
						offer?.loan_application?.payment_frequency === "weekly"
							? calculateRepaymentWeeks(offer?.amount / 100, offer?.loan_application?.duration, Number(offer?.interest_rate))
							: calculateRepaymentMonthly(offer?.amount / 100, offer?.loan_application?.duration, Number(offer?.interest_rate))
					}
					onLearnMore={() => {
						handleSelectOffer(offer)
						navigation.navigate("LoanDetails")
					}}
				/>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<TitleTopSectionLoanOffer subtitle={"According to the details you provided, here are the eligible loan options for you."} />
			{offerStore?.offers?.map(offer => (
				<LoanOfferSingle key={offer?.id} offer={offer} />
			))}
			<View style={{ marginBottom: 80, marginTop: 40 }}>
				<Text style={styles.noteStyle}>Note</Text>
				<LoanTextNote
					text={`Please note that these are just some of the loan options available to you. You can customize your loan by adjusting the loan amount, term, and other parameters. Click on learn more to Use the "Calculate Monthly Payment" or "Calculate Equity Share Details" buttons to estimate your monthly payments or equity sharing terms based on your selections.`}
				/>
				<LoanTextNote
					text={`Ready to move forward? Click on the "Apply Now" button to start the application process for your chosen loan option. If you have any questions or need assistance, our dedicated team is here to help you at every step of the way.`}
				/>
				<LoanTextNote text={`Thank you for considering [Your Business Loan App Name] for your financial needs. We're excited to support your business's growth and success!`} />
			</View>
			<View style={{ marginBottom: 40 }}>
				<Text style={styles.bootomText}> c seedng.africa</Text>
			</View>
			<TouchableOpacity activeOpacity={0.9} style={styles.floatButton} onPress={onScrollTop}>
				<IconScrollToTop />
			</TouchableOpacity>
		</View>
	)
}

export default observer(LoanOffer)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		width: "100%",
		backgroundColor: "#F5F5F5",
		paddingLeft: 20,
		paddingRight: 20
	},
	floatButton: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
		position: "absolute",
		bottom: 50,
		right: 20
	},
	bootomText: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontWeight: "400",
		lineHeight: 17,
		letterSpacing: 0,
		textAlign: "center",
		color: "#9C9C9C"
	},
	noteStyle: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "700",
		lineHeight: 20,
		color: "#000000"
	}
})
