import { BackHandler, StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as yup from "yup"
import { useFormik } from "formik"
import { useQuery } from "@tanstack/react-query"

import CustomSelectInputMask from "../../common/CustomSelectInputMask"
import CustomTextInput from "../../common/Input"
import CustomPrimaryButton from "../../common/PrimaryButton"
import SelectBankModal from "../../common/SelectBankData"
import loanStore from "../../../mobx/LoanStore"
import profileStore from "../../../mobx/profileStore"
import LoadingModal from "../../common/LoadingScreen"
import SuccessMainModal from "../../common/SuccessMainScreen"
import ErrorModal from "../../common/ErrorScreen"

const AddAccountMannualForm = ({ navigation }) => {
	const addAccountSchema = yup.object().shape({
		bankCode: yup.string().required().label("Bank"),
		accountNumber: yup.string().min(10).max(10).required().label("Account Number"),
		accountName: yup.string().required().label("Account Name")
	})
	const formik = useFormik({
		enableReinitialize: true,
		validateOnChange: true,
		initialValues: {
			bankCode: loanStore?.pickedBank?.name ? loanStore?.pickedBank?.name : profileStore?.accountInfo?.bank_name ? profileStore?.accountInfo?.bank_name : "",
			accountNumber: profileStore?.accountInfo?.account_number ? profileStore?.accountInfo?.account_number : "",
			accountName: profileStore?.accountInfo?.account_name ? profileStore?.accountInfo?.account_name : ""
		},
		onSubmit: async values => {
			let payload = { ...values }

			if (profileStore?.accountInfo?.account_number) {
				delete payload.bankCode
				payload.bankName = loanStore?.pickedBank?.name

				payload.bankName = loanStore?.pickedBank?.name ? loanStore?.pickedBank?.name : profileStore?.accountInfo?.bank_name
				const res = await profileStore.updateAccountInfo(payload)
			}
			if (!profileStore?.accountInfo?.account_number) {
				delete payload.bankCode
				payload.bankName = loanStore?.pickedBank?.name ? loanStore?.pickedBank?.name : profileStore?.accountInfo?.bank_name
				const response = await profileStore.addAccountInfo(payload)
			}

			// const response = await profileStore.addAccountInfo(payload)
			// if (response?.success) {
			// 	queryClient.invalidateQueries({ queryKey: ["business"] })
			// }
			// if (response?.data?.data && !response?.data?.data?.user?.is_verified) {
			// 	navigation.navigate("Otp")
			// }
		},
		validationSchema: addAccountSchema
	})
	const backActionAccount = () => {
		loanStore.setPickBank()
	}
	const backHandler = BackHandler.addEventListener("hardwareBackPress", backActionAccount)
	backHandler.remove()

	const validateAccountName = async () => {
		if (formik.values.bankCode === "") {
			// formik.setFieldError("bankCode", "Please select bank")
			return
		}
		if (!profileStore?.accountInfo?.bank_name) {
			formik.setFieldValue("accountName", "", false)
		}
		const response = await profileStore.validateAccount({ accountNumber: formik.values.accountNumber, bankCode: loanStore?.pickedBank?.code })

		if (response?.success) {
			formik.setFieldValue("accountName", response?.data?.account_name, true)
		}
	}
	const { isPending: acountInfo } = useQuery({
		queryKey: ["account-info"],
		queryFn: profileStore.getAccountInfo
	})
	useEffect(() => {
		if (formik.values.accountNumber.length < 10) return
		if (formik.values.accountNumber.length === 10) {
			validateAccountName()
		} else {
		}
	}, [formik.values.accountNumber])
	const handleCloseSuccess = () => {
		profileStore.clearSuccessStatus()
		navigation.navigate("finance-data")
	}
	return (
		<View style={{ flex: 1, marginTop: 30 }}>
			{profileStore.loading && <LoadingModal modalVisible={profileStore.loading} />}
			{profileStore.error && <ErrorModal modalVisible={profileStore.error} error={profileStore.errorValue} onRequestClose={() => profileStore.clearErrorStatus()} />}
			{profileStore.success && <SuccessMainModal modalVisible={profileStore.success} message={profileStore.successValue} onRequestClose={() => handleCloseSuccess()} />}
			<Text style={styles.descTextStyles}>Please provide your bank details for loan disbursement.</Text>
			<CustomSelectInputMask value={formik.values.bankCode} error={formik.errors.bankCode} onPress={() => loanStore.setPickBank()} label="Bank" placeholder="Select Bank--" hideIcon={true} />
			<CustomTextInput
				name="accountNumber"
				label="Account Number"
				autoComplete="off"
				KeyboardType="numeric"
				inputMode="numeric"
				placeholder="Add account number"
				value={formik.values.accountNumber}
				onChangeText={formik.handleChange("accountNumber")}
				onBlur={formik.handleBlur("accountNumber")}
				error={formik.touched.accountNumber && formik.errors.accountNumber}
			/>

			<CustomSelectInputMask label="Account Name" placeholder="Add Account Name" value={formik.values.accountName} error={formik.touched.accountName && formik.errors.accountName} hideIcon={false} />
			{/* <CustomTextInput
				name="accountName"
				label="Account Name"
				editable={false}
				placeholder="Add Account Name"
				value={formik.values.accountName}
				onChangeText={formik.handleChange("accountName")}
				onBlur={formik.handleBlur("accountName")}
				error={formik.touched.accountName && formik.errors.accountName}
			/> */}
			<SelectBankModal modalVisible={loanStore.pickBank} onRequestClose={() => loanStore.setPickBank()} />

			<View style={{ marginTop: 20, marginBottom: 40 }}>
				<CustomPrimaryButton title="Save Account Details" onPress={formik.handleSubmit} />
			</View>
		</View>
	)
}

export default observer(AddAccountMannualForm)

const styles = StyleSheet.create({
	descTextStyles: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 16,
		lineHeight: 24,
		letterSpacing: -0.02,
		color: "#666666",
		marginBottom: 25
	}
})
