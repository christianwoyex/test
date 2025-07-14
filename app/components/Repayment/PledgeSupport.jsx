import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useMemo, useState } from "react"
import { IconPopPledge, IcongiveBackGreen, RadioActive, RadioInActive } from "../../../assets/icons"
import PledgeMessageModal from "./PledgeMessage"

import CustomPrimaryButtonWithDisble from "../common/CustomPrimaryBtnWithDisable"
import LoadingModal from "../common/LoadingScreen"
import SuccessMainScreen from "../common/SuccessMainScreen"
import ErrorModal from "../common/ErrorScreen"
import repaymentStore from "../../mobx/RepaymentStore"
import { observer } from "mobx-react"
import PledgePaymentModal from "../common/PledgePaymentModal"
import { Toast } from "toastify-react-native"

const PledgeSupportComp = ({ navigation }) => {
	const radioButtons = useMemo(
		() => [
			{
				id: "1", // acts as primary key, should be unique and non-empty string
				label: "Yearly NGN 1,200 /Year",
				status: "yearly",
				value: "1,200"
			},
			{
				id: "2",
				label: "Monthly NGN 1,200 /Year",
				status: "monthly",
				value: "1,200"
			},
			{
				id: "3",
				label: "On Repay NGN 200 /One time",
				status: "one time",
				value: "200"
			},
			{
				id: "4",
				label: "No Pledge",
				status: "no",
				value: "0"
			}
		],
		[]
	)

	const [modalVisible, setModalVisible] = useState(false)
	const [selectedSupport, setSelectSupport] = useState({})
	const showToast = () => {
		Toast.success("Thank you, our dear valued customer")
	}
	const handleSubmitPledge = async () => {
		if (selectedSupport?.value === "0") {
			showToast()
			return
		}
		const amount = parseInt(selectedSupport.value.replace(/,/g, ""))

		const response = await repaymentStore.pledgeInitiatePayment({
			amount,
			frequency: selectedSupport.status
		})
	}
	const handlecCloseInitiateError = () => {
		repaymentStore.toggleClearPledgeError()
	}
	const handleTogglePledgeSuccess = () => {
		repaymentStore.togglePledgeVerySuccess("")
		navigation.navigate("RepayementScreen")
	}
	return (
		<View style={styles.container}>
			{repaymentStore.pledgerror && <ErrorModal modalVisible={repaymentStore.pledgerror} error={repaymentStore.msgPledge} onRequestClose={() => handlecCloseInitiateError()} />}
			{repaymentStore.pledgverifyerror && (
				<ErrorModal modalVisible={repaymentStore.pledgverifyerror} error={repaymentStore.msgPledge} onRequestClose={() => repaymentStore.togglePledgeVeryError("")} />
			)}
			{repaymentStore.pledgverifysuccess && (
				<SuccessMainScreen modalVisible={repaymentStore.pledgverifysuccess} message={repaymentStore.msgPledge} onRequestClose={() => handleTogglePledgeSuccess()} />
			)}
			{repaymentStore.pledgeInitiateloading && <LoadingModal modalVisible={repaymentStore.pledgeInitiateloading} />}
			{repaymentStore.pledgeverifyloading && <LoadingModal modalVisible={repaymentStore.pledgeverifyloading} />}
			{repaymentStore.initiate_success && <PledgePaymentModal modalVisible={repaymentStore.initiate_success} />}
			<View style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center" }}>
				<IcongiveBackGreen />
			</View>
			<View style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row", flexWrap: "wrap" }}>
				<Text style={styles.titletxt}>Pledge your support for other Entrepreneurs</Text>

				<Text style={styles.textBootom}>
					<Text style={styles.jointTextTxt}>Join the Movement:</Text> Entrepreneurs Supporting Entrepreneurs. By pledging your support, you contribute to a thriving ecosystem where today's borrowers
					become tomorrow's backers
				</Text>
			</View>
			<View style={styles.formContainer}>
				{radioButtons.map(item => (
					<View key={item.id} style={{ marginBottom: 15, display: "flex", flexDirection: "row", gap: 15 }}>
						<TouchableOpacity activeOpacity={0.9} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8 }} onPress={() => setSelectSupport(item)}>
							{selectedSupport?.id && selectedSupport?.id === item.id ? <RadioActive /> : <RadioInActive />}

							<Text>{item.label}</Text>
						</TouchableOpacity>
						{selectedSupport?.id && selectedSupport?.id === item.id && (
							<TouchableOpacity activeOpacity={0.9} onPress={() => setModalVisible(!modalVisible)}>
								<IconPopPledge />
							</TouchableOpacity>
						)}
					</View>
				))}
			</View>

			<View>
				<Text style={styles.textBootom}>The pledge is voluntary, by pledging you agree to Seedng terms</Text>
			</View>
			{modalVisible && (
				<PledgeMessageModal
					amount={selectedSupport?.value}
					modalVisible={modalVisible}
					setModalVisible={() => {
						setModalVisible(!modalVisible)
					}}
					onRequestClose={() => {
						setModalVisible(!modalVisible)
					}}
				/>
			)}
			<View style={{ marginTop: 30, marginBottom: 20 }}>
				<CustomPrimaryButtonWithDisble disabled={!selectedSupport?.value ? true : false} title="Pledge Support" onPress={handleSubmitPledge} />
			</View>
		</View>
	)
}

export default observer(PledgeSupportComp)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#F9F9F9"
	},
	titletxt: {
		color: "#001326",
		textAlign: "center",
		fontFamily: "Inter-SemiBold",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "500",
		lineHeight: 27,
		marginTop: 10
	},
	descPledgeTxt: {
		color: "#757575",
		textAlign: "center",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: 22,
		marginTop: 20
	},
	jointTextTxt: {
		color: "#757575",
		// textAlign: "center",
		fontFamily: "Inter-SemiBold",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "900",
		lineHeight: 22,
		marginRight: 5
	},
	formContainer: {
		width: "100%",
		height: 200,
		justifyContent: "center",
		borderColor: "#F2F4F5",
		backgroundColor: "#FFF",
		borderRadius: 12,
		borderWidth: 1,
		padding: 15,
		marginTop: 40,
		marginBottom: 20
	},
	textBootom: {
		color: "#757575",
		textAlign: "center",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: 22,
		marginTop: 20
	}
})
