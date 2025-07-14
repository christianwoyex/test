import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import LoanDetailsCard from "./LoanOffers/LoanDetailsCard"
import TitleTopSectionLoanOffer from "./LoanOffers/TopInfoSection"
import CustomPrimaryButton from "../common/PrimaryButton"
import RepaymentItem from "./LoanOffers/RepaymentItem"
import PaymentMethodView from "./LoanOffers/PaymentMethodView"
import LenderAndBrowerAgreement from "./LoanOffers/LenderAndBrowerAgreement"
import { IconArrowWithColor } from "../../../assets/icons"
import offerStore from "../../mobx/LoanOfferStore"
import { observer } from "mobx-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import LoadingModal from "../common/LoadingScreen"
import SuccessModal from "../common/SuccessMainScreen"
import ErrorModal from "../common/ErrorScreen"

const LoanReview = ({ navigation }) => {
	const queryClient = useQueryClient()

	const { isPending: loading, data } = useQuery({
		queryKey: ["offer-details"],
		queryFn: offerStore.getLoanOffersDetails
	})

	const handleSubmitLoanoffer = async () => {
		await offerStore.addGuarantorLoanOffer()
	}
	const handleClearSubmitSuccess = () => {
		offerStore.toggleSubmitOfferSuccess("")
		queryClient.invalidateQueries({ queryKey: ["offers"] })
		navigation.navigate("LoanScreen")
	}
	const handleClearSubmitError = () => {
		offerStore.toggleSubmiterOfferError("")
	}
	const handleClearGuarantorError = () => {
		offerStore.toggleAddGuarantorError("")
	}

	return (
		<View style={styles.container}>
			<TitleTopSectionLoanOffer title="Review" subtitle="" />
			{offerStore.addguarantorError && <ErrorModal modalVisible={offerStore.addguarantorError} error={offerStore.msgAddGuarantorError} onRequestClose={handleClearGuarantorError} />}
			{offerStore.loadingaddguarantor && <LoadingModal modalVisible={offerStore.loadingaddguarantor} />}

			{offerStore.loadingsubmitoffer && <LoadingModal modalVisible={offerStore.loadingsubmitoffer} />}
			{offerStore.submitoffererror && <ErrorModal modalVisible={offerStore.submitoffererror} error={offerStore.msgSubmitOfferError} onRequestClose={handleClearSubmitError} />}
			{offerStore.submitoffersuccess && <SuccessModal modalVisible={offerStore.submitoffersuccess} message={offerStore.msgSubmitOfferSuccess} onRequestClose={handleClearSubmitSuccess} />}

			<LoanDetailsCard pickedOffer={offerStore?.selectedOffer} />
			<View style={{ marginTop: 20, marginBottom: 20 }}>
				<Text style={styles.guarantorText}>Guarantor</Text>
				<View style={styles.guarantorsBg}>
					<RepaymentItem navigation={navigation} name={`${offerStore.guarantor?.name1}`} />
					<View style={{ borderBottomColor: "#F2F4F5", borderBottomWidth: 1 }}></View>
					<RepaymentItem navigation={navigation} name={`${offerStore.guarantor?.name2}`} />
				</View>
			</View>
			<View style={{ marginTop: 40, marginBottom: 20 }}>
				<Text style={styles.repaymentText}>Repayment</Text>
				{/* <View style={styles.guarantorsBg}>
					
				</View> */}
				<PaymentMethodView type={data?.data && data?.data?.payment_methods.length > 0 ? data?.data?.payment_methods[0]?.card_type : "master"} name="Debit Card" />
				<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 5 }}>
					<Text style={styles.methodTextStyle}>Recurring Card Payments </Text>
					<TouchableOpacity activeOpacity={0.9} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
						<Text style={styles.methodTextPrimaryStyle}>Repayment options</Text>
						<IconArrowWithColor color="#1DB954" />
					</TouchableOpacity>
				</View>
				<LenderAndBrowerAgreement />
			</View>
			<View style={{ marginTop: 20, marginBottom: 40 }}>
				<CustomPrimaryButton title={"Submit"} onPress={handleSubmitLoanoffer} />
			</View>
		</View>
	)
}

export default observer(LoanReview)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20
	},
	guarantorText: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontWeight: "500",
		lineHeight: 17,
		letterSpacing: 0,
		textAlign: "left",
		marginBottom: 15
	},
	repaymentText: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontWeight: "500",
		lineHeight: 17,
		letterSpacing: 0,
		textAlign: "left",
		marginTop: 15,
		marginBottom: 15
	},
	guarantorsBg: {
		width: "100%",
		height: 143,
		borderRadius: 14,
		backgroundColor: "#fff"
	},
	methodTextStyle: {
		fontFamily: "Inter-Regular",
		fontSize: 10,
		fontWeight: "300",
		lineHeight: 12,
		letterSpacing: 0,
		textAlign: "left",
		color: "#96A3B0"
	},
	methodTextPrimaryStyle: {
		fontFamily: "Inter-Regular",
		fontSize: 10,
		fontWeight: "300",
		lineHeight: 12,
		letterSpacing: 0,
		textAlign: "left",
		color: "#008080"
	}
})
