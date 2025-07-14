import { StyleSheet, Text, View, Image } from "react-native"
import React, { useEffect } from "react"
import TitleTopSectionLoanOffer from "./LoanOffers/TopInfoSection"
import LoanTextTop from "./LoanOffers/LoanTextTop"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { IconBrandLogoBlue } from "../../../assets/icons"
import LoanTemTextItem from "./LoanOffers/LoanTemTextItem"
import CustomPrimaryButton from "../common/PrimaryButton"
import authStore from "../../mobx/AuthStore"
import profileStore from "../../mobx/profileStore"
import numberToWords from "../common/functionConvertNumbersToWords"
import { formatThousand } from "../common/formatPhoneNumber"
import offerStore from "../../mobx/LoanOfferStore"
import { observer } from "mobx-react"
import LoadingModal from "../common/LoadingScreen"

const LoanTerm = ({ navigation }) => {
	const queryClient = useQueryClient()

	const { isPending: loading, data } = useQuery({
		queryKey: ["offer-details"],
		queryFn: offerStore.getLoanOffersDetails
	})

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ["offer-details"] })
	}, [])

	return (
		<View style={styles.container}>
			{loading && <LoadingModal modalVisible={true} />}
			{!loading && (
				<View>
					<View style={{ paddingTop: 20, paddingBottom: 20, width: "100%", borderBottomWidth: 1, borderColor: "#D9F9EA", backgroundColor: "#FFFFFF", paddingHorizontal: 20 }}>
						<IconBrandLogoBlue />
						<View style={{ marginTop: 5 }}></View>
						<TitleTopSectionLoanOffer title="Loan Terms" subtitle="" />
						<Text style={{ marginTop: 5, color: "#525252", fontSize: 14, fontWeight: "400", fontFamily: "Inter-Regular", lineHeight: 16.8 }}>
							To access your loan , you’ll need to agree to the{" "}
							<Text style={{ color: "#1DB954", fontSize: 12, fontWeight: "500", fontFamily: "Inter-Regular", lineHeight: 16.8 }}> terms of service </Text> below.{" "}
						</Text>
					</View>
					<View style={styles.cardTypesView}>
						<LoanTextTop />
						<View style={{ marginTop: 30 }}>
							<Text style={styles.textStylesHeader}>Lender:</Text>
							<LoanTemTextItem subtitle="Name: Seedng®" />
							<LoanTemTextItem subtitle={`Address: Lender's address`} />
							<LoanTemTextItem subtitle={`Contact Information: Lender's phone and email address`} />
						</View>
						<View style={styles.marginViewStyle}>
							<Text style={styles.textStylesHeader}>Borrower:</Text>
							<LoanTemTextItem subtitle={`Name: Lender's ${authStore.loggedInUser?.last_name} ${authStore.loggedInUser?.first_name}`} />
							<LoanTemTextItem subtitle={`Address: ${authStore.loggedInUser?.address}`} />
							<LoanTemTextItem subtitle={`Business Name: ${profileStore?.businessInfo?.name}`} />
							<LoanTemTextItem subtitle={`Address: ${profileStore?.businessInfo?.address}`} />
							<LoanTemTextItem subtitle={`Contact Information: ${authStore.loggedInUser?.phone} ${authStore.loggedInUser?.email}`} />
						</View>
						<View style={styles.marginViewStyle}>
							<Text style={styles.textStyleSubHead}>Loan Details:</Text>
							<Text style={styles.textStylesHeader}>1. Loan Amount:{formatThousand(`${offerStore?.selectedOffer?.amount}`)}</Text>

							<LoanTemTextItem
								subtitle={`The Lender agrees to lend the Borrower the principal sum of ${numberToWords(offerStore?.selectedOffer?.amount / 100)} Naira (₦${formatThousand(
									offerStore?.selectedOffer?.amount / 100
								)}) to be used for loan purpose: ${data?.data?.loan_application?.purpose}.`}
							/>
						</View>
						<View style={styles.marginViewStyle}>
							<Text>2. Interest rate:</Text>
							<LoanTemTextItem subtitle={`The loan shall incur interest at an annual rate of ${offerStore.selectedOffer?.interest_rate}%.`} />
						</View>
						<View style={styles.marginViewStyle}>
							<Text>3. Term:</Text>
							<LoanTemTextItem subtitle="The term of this loan shall be [Number of Months] months, commencing on [Loan Start Date], and concluding on [Loan End Date]." />
						</View>
						<View style={styles.marginViewStyle}>
							<Text style={styles.textStylesHeader}>4. Repayment:</Text>
							<LoanTemTextItem subtitle="The Borrower agrees to repay the loan amount in [Number of Equal Payments] equal payments of [$X,XXX] each, due on the [Due Date] of each month." />
						</View>
						<View style={styles.marginViewStyle}>
							<Text style={styles.textStylesHeader}>5. Prepayment:</Text>
							<LoanTemTextItem subtitle="The Borrower agrees to repay the loan amount in [Number of Equal Payments] equal payments of [$X,XXX] each, due on the [Due Date] of each month." />
						</View>
						<View style={styles.marginViewStyle}>
							<Text style={styles.textStylesHeader}>6. Collateral:</Text>
							<LoanTemTextItem subtitle={`If applicable, specify any collateral provided as security for the loan. If no collateral is provided, specify "No Collateral."]`} />
						</View>
						<View style={styles.marginViewStyle}>
							<Text style={styles.textStylesHeader}>7. default:</Text>
							<LoanTemTextItem subtitle="The Borrower will be considered in default if they fail to make any payment due under this Agreement within [Number of Days] days of its due date." />
						</View>
						<View style={styles.marginViewStyle}>
							<Text style={styles.textStylesHeader}>8. Governing Law:</Text>
							<LoanTemTextItem subtitle="This Agreement shall be governed by and construed in accordance with the laws of [Specify Jurisdiction]" />
						</View>
						<View style={styles.marginViewStyle}>
							<Text style={styles.textStylesHeader}>9. Entire Agreement:</Text>
							<LoanTemTextItem subtitle="This Agreement contains the entire agreement between the parties and supersedes all previous agreements and understandings between the parties" />
						</View>
						<View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-end", marginTop: 70, marginBottom: 50 }}>
							<View style={{ width: "50%" }}>
								<CustomPrimaryButton title={"I agree"} onPress={() => navigation.navigate("loan-review")} />
							</View>
						</View>
					</View>
				</View>
			)}
		</View>
	)
}

export default observer(LoanTerm)

const styles = StyleSheet.create({
	container: {},
	cardTypesView: {
		width: "98%",
		marginTop: 20,
		paddingHorizontal: 20
	},
	textStylesHeader: {
		color: "#404040",
		fontFamily: "Inter-Regular",
		marginTop: 0,
		fontWeight: "700",
		fontSize: 12,
		lineHeight: 14
	},
	textStyleSubHead: {
		color: "#404040",
		fontFamily: "Inter-SemiBold",
		marginTop: 20,
		fontWeight: "700",
		fontSize: 14,
		lineHeight: 14,
		marginBottom: 10
	},
	marginViewStyle: {
		marginTop: 10
	},
	creditOrDebit: {
		fontFamily: "Inter-Regular",
		color: "#000000",
		fontSize: 14,
		fontWeight: "400",
		lineHeight: 17,
		letterSpacing: 0,
		textAlign: "left"
	},

	supportedCards: {
		display: "flex",
		height: 40,
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		marginTop: 10,
		// backgroundColor:"red",
		gap: 20
	}
})
