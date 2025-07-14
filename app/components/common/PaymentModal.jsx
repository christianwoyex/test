import { Modal, StyleSheet, View } from "react-native"
import { observer } from "mobx-react"
import { Paystack } from "react-native-paystack-webview"
import offerStore from "../../mobx/LoanOfferStore"

import authStore from "../../mobx/AuthStore"

const PaymentModal = ({ modalVisible, onRequestClose }) => {
	return (
		<Modal animationType="fade" transparent={true} visible={modalVisible} onBackdropPress={onRequestClose}>
			<View style={{ flex: 1 }}>
				<Paystack
					refNumber={offerStore?.repaymentData.reference}
					paystackKey={offerStore?.repaymentData?.public_key}
					amount={offerStore?.repaymentData?.amount}
					billingEmail={authStore.loggedInUser.email}
					activityIndicatorColor="green"
					currency="NGN"
					onCancel={e => {
						offerStore?.setRepStatus()
					}}
					onSuccess={res => {
						offerStore?.setRepStatus()
						offerStore.verifyPayment({ reference: res?.data?.transactionRef?.reference })
					}}
					autoStart={true}
				/>
			</View>
		</Modal>
	)
}

export default observer(PaymentModal)

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
