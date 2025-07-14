import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { observer } from "mobx-react"
import { IconArrowBackhead } from "../../../assets/icons"
import { Toast } from "toastify-react-native"
import { useFormik } from "formik"
import * as Yup from "yup"
import CustomTextInput from "../common/Input"
import CustomPrimaryButtonWithDisble from "../common/CustomPrimaryBtnWithDisable"
import loanStore from "../../mobx/LoanStore"
import { formatThousand } from "../common/formatPhoneNumber"

const validationSchema = Yup.object().shape({
	amount: Yup.string().required("Amount is required")
})
// .min(5, "Amount must be at least 10,000").max(5000000, "Amount must not exceed 5,000,000")
const TypeInAmountModal = ({ modalView, setModalView }) => {
	const formik = useFormik({
		enableReinitialize: false,
		validateOnChange: true,
		initialValues: {
			amount: ""
		},
		onSubmit: async values => {
			let payload = { ...values }
			if (formik.values.amount.length <= 5) return
			payload.amount = removeNairaSymbolAndCommas(payload.amount)
			let newAmount = parseInt(payload.amount)
			if (newAmount < loanStore.minMax.minimum_amount || newAmount > loanStore.minMax.maximum_amount) {
				loanStore.toggleOpenKeypad()
				Toast.error(`Enter an amount between N${formatThousand(loanStore.minMax.minimum_amount)} and N${formatThousand(loanStore.minMax.maximum_amount)}`)
				return
			}
			loanStore.setCurrentValue(newAmount)
			loanStore.toggleOpenKeypad()
		},
		validationSchema: validationSchema
	})

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			{true && (
				<Modal animationType="fade" transparent={true} visible={modalView} onRequestClose={() => loanStore.toggleOpenKeypad()}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View style={{ width: "100%" }}>
								<Pressable style={[styles.button, styles.buttonClose]} onPress={() => loanStore.toggleOpenKeypad()}>
									<IconArrowBackhead />
								</Pressable>
							</View>
							<View style={{ width: "100%", flex: 0.8, marginTop: 30 }}>
								<View style={{ marginBottom: 30 }}>
									<Text style={{ fontSize: 18, fontFamily: "Inter-Regular" }}>Enter Loan Amount</Text>
								</View>
								<CustomTextInput
									label="Amount"
									placeholder="e.g 2,000,000"
									name="amount"
									value={formatNumberWithNairaSymbol(formik.values.amount.toString())}
									keyboardType="numeric"
									onChangeText={formik.handleChange("amount")}
									onBlur={formik.handleBlur("amount")}
									error={formik.touched.amount && formik.errors.amount}
								/>
								<View style={{ marginTop: 70 }}>
									<CustomPrimaryButtonWithDisble
										onPress={formik.handleSubmit}
										disabled={!formik.values.amount && formik.isValid ? true : formik.values.amount.length <= 5 && formik.isValid ? true : false}
										title="Continue"
									/>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			)}
		</KeyboardAvoidingView>
	)
}

export default observer(TypeInAmountModal)

function formatNumberWithNairaSymbol(number) {
	// Convert number to string
	const numStr = String(number)

	// Check if the number already contains the Naira symbol
	const hasNairaSymbol = numStr.includes("₦")

	// Remove any non-digit characters (excluding the Naira symbol)
	const cleanedNumber = numStr.replace(/[^\d.₦]/g, "")

	// Format the number with thousand separators
	const formattedNumber = cleanedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

	// Add the Naira symbol if it wasn't present initially
	const numberWithSymbol = hasNairaSymbol ? formattedNumber : `₦${formattedNumber}`

	return numberWithSymbol
}

function removeNairaSymbolAndCommas(numberString) {
	const cleanedNumber = numberString.replace(/[^\d.]/g, "")

	return cleanedNumber
}
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		padding: 0
	},
	modalView: {
		flex: 1,
		width: "100%",
		backgroundColor: "#FFFFFF",
		borderRadius: 0,
		paddingHorizontal: 20,
		paddingVertical: 10,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		marginTop: 20
		// elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF"
	},
	buttonClose: {
		backgroundColor: "transparent"
	},
	textStyle: {
		color: "black",
		fontWeight: "bold",
		fontFamily: "Inter-Regular",
		fontSize: 16,
		textAlign: "justify"
	},
	textDesc: {
		color: "#2E2E2E",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 22,
		textAlign: "justify",
		marginLeft: 5
	},

	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	okButtonText: {
		color: "#1DB954",
		textAlign: "center",
		fontFamily: "Inter-SemiBold",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "500",
		letterSpacing: -0.02
	}
})
