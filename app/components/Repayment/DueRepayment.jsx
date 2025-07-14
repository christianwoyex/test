import { StyleSheet, Text, View } from "react-native"
import React from "react"
import NextDuePaymentCard from "./NextDuePaymentCard"
import RepaymentSubText from "./RepaymentSubText"
import { AppButton } from "../common/AppButton"
import PaymentMethodCard from "./PaymentMethodCard"
import DuePaymentTop from "./DuePaymentTop"
import LoadingModal from "../common/LoadingScreen"
import ErrorModal from "../common/ErrorScreen"
import SuccessModal from "../common/SuccessMainScreen"
import repaymentStore from "../../mobx/RepaymentStore"
import { observer } from "mobx-react"
import { useQueryClient } from "@tanstack/react-query"

const DueRepayment = ({ navigation, repayment }) => {
	const queryClient = useQueryClient()
	const handleRepay = async () => {
		const response = await repaymentStore.repayLoan()
		if (response?.success) {
			queryClient.invalidateQueries({
				queryKey: ["repayments"]
			})
		}
	}
	const handleCloseSuccess = () => {
		repaymentStore.toggleSuccess("")
	}
	const handleCloseError = () => {
		repaymentStore.toggleError("")
	}

	return (
		<View style={styles.container}>
			{repaymentStore.repayloading && <LoadingModal modalVisible={repaymentStore.repayloading} />}
			{repaymentStore.repayerror && <ErrorModal modalVisible={repaymentStore.repayerror} error={repaymentStore.msgError} onRequestClose={() => handleCloseError()} />}
			{repaymentStore.repaysuccess && (
				<SuccessModal headerTitle="Congratulations!" modalVisible={repaymentStore.repaysuccess} message={repaymentStore.msgSuccess} onRequestClose={() => handleCloseSuccess()} />
			)}
			<DuePaymentTop />
			<NextDuePaymentCard repayment={repayment} />
			<View style={{ marginTop: 20 }}>
				<RepaymentSubText title="Repayment Method" />
				<View style={{ marginTop: 20, width: "100%" }}>
					<PaymentMethodCard />
					<AppButton title="Repay Now" onPress={handleRepay} />
				</View>
			</View>
		</View>
	)
}

export default observer(DueRepayment)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F2F4F5",
		paddingLeft: 20,
		paddingRight: 20
	}
})
