import { Modal, StyleSheet, View } from "react-native"
import { observer } from "mobx-react"
import { Paystack } from "react-native-paystack-webview"
import offerStore from "../../mobx/LoanOfferStore"

import authStore from "../../mobx/AuthStore"
import repaymentStore from "../../mobx/RepaymentStore"

const PledgePaymentModal = ({ modalVisible, onRequestClose }) => {
	return (
		<Modal animationType="fade" transparent={true} visible={modalVisible} onBackdropPress={onRequestClose}>
			<View style={{ flex: 1 }}>
				<Paystack
					refNumber={repaymentStore?.pledgePaymentData?.reference}
					paystackKey={repaymentStore?.pledgePaymentData?.public_key}
					amount={repaymentStore?.pledgePaymentData?.amount}
					billingEmail={authStore.loggedInUser.email}
					activityIndicatorColor="green"
					currency="NGN"
					onCancel={e => {
						repaymentStore?.toggleInitiatePledgeStatus()
					}}
					onSuccess={res => {
						repaymentStore?.toggleInitiatePledgeStatus()
						repaymentStore.pledgeVerifyPayment({ reference: res?.data?.transactionRef?.reference })
					}}
					autoStart={true}
				/>
			</View>
		</Modal>
	)
}

export default observer(PledgePaymentModal)

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		padding: 20
	},
	loadinText: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D",
		lineHeight: 27.2,
		textAlign: "center",
		marginTop: 10
	},
	loadinTextErr: {
		fontFamily: "Inter-Regular",
		fontSize: 25,
		fontWeight: "400",

		marginBottom: 5,
		color: "green",
		marginTop: 10
	}
})
