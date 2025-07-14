import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import NotificationCard from "./NotificationCard"
import LoanTextNote from "./Loan/LoanOffers/LoanTextNote"
import { IconScrollToTopGray } from "../../assets/icons"
import offerStore from "../mobx/LoanOfferStore"
import loanStore from "../mobx/LoanStore"
import { calculateRepaymentMonthly, calculateRepaymentWeeks } from "./common/formatPhoneNumber"
import { observer } from "mobx-react"
import EmptyData from "./common/EmptyData"
const { height } = Dimensions.get("window")
const NotificationComp = ({ navigation, onScrollTop }) => {
	function LoanOfferSingleNoti({ offer }) {
		const handleSelectNotiOffer = (offerType, loanType) => {
			offerStore.setSelectedOffermain(offerType, loanType)
		}
		const handleViewLoanTypeDetails = loanProduct => {
			loanStore.setSelectLoanTypeDetails(loanProduct)
			navigation.push("EquityScreen")
		}

		return (
			<View>
				<NotificationCard
					key={`${offer?.id}jkfjkjfdjkdf`}
					amount={offer?.amount / 100}
					loanType={offer?.loan_type?.name}
					interestRate={offer?.interest_rate}
					frequency={offer?.loan_application?.payment_frequency}
					duration={offer?.loan_application?.duration}
					repayment={
						offer?.loan_application?.payment_frequency === "weekly"
							? calculateRepaymentWeeks(offer?.amount / 100, offer?.loan_application?.duration, Number(offer?.interest_rate))
							: calculateRepaymentMonthly(offer?.amount / 100, offer?.loan_application?.duration, Number(offer?.interest_rate))
					}
					onApply={() => {
						handleSelectNotiOffer(offer)
						navigation.navigate("LoanDetails")
					}}
					onLearnMore={() => {
						handleViewLoanTypeDetails(offer?.loan_type)
					}}
				/>
			</View>
		)
	}
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.titleText}>Loan Offer</Text>

				<Text style={styles.subText}>Based on information you provided to us below are the loan you are eligible for</Text>

				{offerStore?.offers.length <= 0 && <EmptyData />}
				{offerStore?.offers?.length > 0 && (
					<View>
						{offerStore?.offers?.map(offer => (
							<LoanOfferSingleNoti key={offer?.id} offer={offer} />
						))}
						<View style={{ marginBottom: 80, marginTop: 0 }}>
							<LoanTextNote
								text={`Please note that these are just some of the loan options available to you. You can customize your loan by adjusting the loan amount, term, and other parameters. Click on learn more to Use the "Calculate Monthly Payment" or "Calculate Equity Share Details" buttons to estimate your monthly payments or equity sharing terms based on your selections.`}
							/>
							<LoanTextNote
								text={`Ready to move forward? Click on the "Apply Now" button to start the application process for your chosen loan option. If you have any questions or need assistance, our dedicated team is here to help you at every step of the way.`}
							/>
							<LoanTextNote text={`Thank you for considering Seedng® for your financial needs. We're excited to support your business's growth and success!`} />
						</View>
						<View style={{ marginBottom: 40 }}>
							<Text style={styles.bootomText}> c seedng.africa</Text>
						</View>
						<TouchableOpacity activeOpacity={0.9} style={styles.floatButton} onPress={onScrollTop}>
							<IconScrollToTopGray />
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	)
}

export default observer(NotificationComp)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		paddingTop: 20,
		paddingHorizontal: 20
	},
	titleText: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 24,
		lineHeight: 29,
		color: "#404040"
	},
	subText: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 12,
		lineHeight: 15,
		color: "#525252",
		marginVertical: 10,
		marginBottom: 20
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
	}
})
