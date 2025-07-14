import { StyleSheet, Text, View } from "react-native"
import { Toast } from "toastify-react-native"
import React, { useState } from "react"
import LoanDetailsCard from "./LoanOffers/LoanDetailsCard"
import TitleTopSectionLoanOffer from "./LoanOffers/TopInfoSection"
import CustomPrimaryButton from "../common/PrimaryButton"
// import CustomOutlineButton from "../common/CustomOutlineButton"
import AddLoanDetailsBtn from "./LoanOffers/LoanDetailsAddBtn"
import { observer } from "mobx-react"
import offerStore from "../../mobx/LoanOfferStore"
import PaymentModal from "../common/PaymentModal"
import LoadingModal from "../common/LoadingScreen"
import SuccessModal from "../common/SuccessMainScreen"
import ErrorModal from "../common/ErrorScreen"
import { IconActiveDot, IconInActiveDot } from "../../../assets/icons"
import { useQuery } from "@tanstack/react-query"

const showToast = () => {
	Toast.error("Please add guarantor's details")
}
const showRepaymentToast = () => {
	Toast.error("Please add your loan repayment details")
}

const LoanDetailsOffer = ({ navigation }) => {
	const handleInititatePayment = async () => {
		const resp = await offerStore.initiatePayment()
	}

	const handleProceed = () => {
		if (!offerStore.guarantor?.name1) return showToast()

		if (!offerStore.cardinserted) return showRepaymentToast()

		navigation.navigate("LoanTermScreen")
	}
	const handleClearError = () => {
		offerStore.toggleVerifyError("")
	}
	const handleClearInitiateError = () => {
		offerStore.toggleInitializeError("")
	}
	const handleClearSuccess = () => {
		offerStore.toggleVerifySuccess("")
	}

	const { isPending, isError, data, refetch } = useQuery({
		queryKey: ["offer_details"],
		queryFn: offerStore.getLoanOffersDetails
	})
	return (
		<View style={styles.container}>
			<TitleTopSectionLoanOffer title="Loan Details" />
			<LoanDetailsCard />
			<View style={{ marginTop: 20 }}>
				<AddLoanDetailsBtn
					onPress={() => navigation.navigate("AddGuarantor")}
					bgColor={"#FFFFFF"}
					titleColor="#002D2D"
					title="Add Guarantor"
					desc="For this loan application, you need to indicate a guarantor."
					icon={1}
					borderColor={
						!offerStore.guarantor.relationship2 || !offerStore.guarantor?.email1 || !offerStore.guarantor?.email2 || !offerStore?.guarantor?.name1 || !offerStore.guarantor?.phone1
							? "#FFFFFF"
							: "#FFD700"
					}
				/>
				{offerStore.repstatus && <PaymentModal modalVisible={offerStore.repstatus} />}
				{offerStore.loadingInitiate && <LoadingModal modalVisible={offerStore.loadingInitiate} />}
				{offerStore.loadingVerify && <LoadingModal modalVisible={offerStore.loadingVerify} />}
				{offerStore.initiateError && <ErrorModal modalVisible={offerStore.initiateError} error={offerStore.msgInitiateError} onRequestClose={handleClearInitiateError} />}
				{offerStore.verifyerror && <ErrorModal modalVisible={offerStore.verifyerror} error={offerStore.msgVerifyError} onRequestClose={handleClearError} />}
				{offerStore.verifysuccess && <SuccessModal modalVisible={offerStore.verifysuccess} message={offerStore.msgVerifySuccess} onRequestClose={handleClearSuccess} />}

				<AddLoanDetailsBtn
					onPress={handleInititatePayment}
					bgColor="#F2F4F5"
					titleColor="#002D2D"
					title="Repayment Method"
					icon={2}
					desc=""
					borderColor={offerStore.cardinserted ? "#8A2BE2" : "#D6DBE0"}
				/>
			</View>
			<View style={{ marginTop: 30, marginBottom: 40 }}>
				<CustomPrimaryButton title={"Continue"} onPress={handleProceed} />
				{/* <CustomOutlineButton title="Loan Calculator" /> */}
			</View>
		</View>
	)
}

export default observer(LoanDetailsOffer)

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	}
})
