import React, { useCallback, useRef } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useFormik } from "formik"
import * as yup from "yup"
import { observer } from "mobx-react"
import { useQueryClient } from "@tanstack/react-query"

import CustomTextInput from "../../common/Input"
import CustomPrimaryButton from "../../common/PrimaryButton"
import CustomSelectInputMask from "../../common/CustomSelectInputMask"
import profileStore from "../../../mobx/profileStore"
import LoadingModal from "../../common/LoadingScreen"
import SuccessMainModal from "../../common/SuccessMainScreen"
import ErrorModal from "../../common/ErrorScreen"
import BusinessTypeSelectData from "./Sheets/BusinessTypeSelectData"
import GenderSelectBottomSheetModal from "./Sheets/GenderSheet"

const BusinessOrganizationForm = ({ navigation }) => {
	const queryClient = useQueryClient()
	const typeRef = useRef(null)
	const businessOrganizationSchema = yup.object().shape({
		type: yup.string().required().label("Business Type"),
		position: yup.string().min(2).required().label("Position"),
		yearsInOperation: yup.string().required().label("Years in Operation"),
		numEmployees: yup.string().min(1).required().label("Number of Employees")
	})
	const formik = useFormik({
		enableReinitialize: true,
		validateOnChange: true,
		initialValues: {
			type: profileStore.businessInfo.type ? profileStore.businessInfo.type : "",
			position: profileStore.businessInfo.position ? profileStore.businessInfo.position : "",
			yearsInOperation: profileStore.businessInfo.years_in_operation ? profileStore.businessInfo.years_in_operation : "",
			numEmployees: profileStore.businessInfo.num_employees ? profileStore.businessInfo.num_employees : ""
		},
		onSubmit: async values => {
			let payload = { ...values }
			payload.numEmployees = removeNairaSymbolAndCommas(payload.numEmployees)
			const response = await profileStore.updateBusinessData(payload)

			if (response?.success) {
				queryClient.invalidateQueries({ queryKey: ["business"] })
			}
		},
		validationSchema: businessOrganizationSchema
	})
	const handlePresentBusinessType = useCallback(() => {
		typeRef.current?.present()
	}, [])
	const handleSelectBusinessType = text => {
		if (text === "Existing Bussiness") {
			formik.setFieldValue("type", "Existing Bussiness", true)
			typeRef.current?.close()
		} else if (text === "New Ideas") {
			formik.setFieldValue("type", "New Ideas", true)
			typeRef.current?.close()
		}
	}

	const handleCloseSuccess = () => {
		profileStore.clearSuccessStatus()
		navigation.navigate("business-data")
	}

	return (
		<View style={{ flex: 1, marginTop: 30 }}>
			{profileStore.loading && <LoadingModal modalVisible={profileStore.loading} />}
			{profileStore.error && <ErrorModal modalVisible={profileStore.error} error={profileStore.errorValue} onRequestClose={() => profileStore.clearErrorStatus()} />}
			{profileStore.success && <SuccessMainModal modalVisible={profileStore.success} message={profileStore.successValue} onRequestClose={() => handleCloseSuccess()} />}
			<View>
				<CustomSelectInputMask label="Business Type" value={formik.values.type} placeholder="Select Business Type--" onPress={() => handlePresentBusinessType()} hideIcon={true} />
			</View>
			<GenderSelectBottomSheetModal backgroundStyle={{ backgroundColor: "#FFFFFF" }} handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }} ref={typeRef}>
				<BusinessTypeSelectData value={formik.values.type} onPressExisting={() => handleSelectBusinessType("Existing Bussiness")} onPressNew={() => handleSelectBusinessType("New Ideas")} />
			</GenderSelectBottomSheetModal>
			<View>
				<CustomTextInput
					name="position"
					value={formik.values.position}
					onChangeText={formik.handleChange("position")}
					onBlur={formik.handleBlur("position")}
					error={formik.touched.position && formik.errors.position}
					label="Your Position"
					placeholder="Enter position in the business"
				/>
			</View>
			<View>
				<CustomTextInput
					label="Years in Business"
					keyboardType="number-pad"
					placeholder="00"
					name="yearsInOperation"
					value={formik.values.yearsInOperation}
					onChangeText={formik.handleChange("yearsInOperation")}
					onBlur={formik.handleBlur("yearsInOperation")}
					error={formik.touched.yearsInOperation && formik.errors.yearsInOperation}
				/>
			</View>
			<View>
				<CustomTextInput
					label="Number of Employees"
					keyboardType="number-pad"
					placeholder="00"
					name="numEmployees"
					value={formatNumberWithNairaSymbol(formik.values.numEmployees.toString())}
					onChangeText={formik.handleChange("numEmployees")}
					onBlur={formik.handleBlur("numEmployees")}
					error={formik.touched.numEmployees && formik.errors.numEmployees}
					caretHidden={false}
				/>
			</View>

			<View style={{ marginTop: 40, marginBottom: 40 }}>
				<CustomPrimaryButton title="Save Business Address" onPress={formik.handleSubmit} />
			</View>
		</View>
	)
}

export default observer(BusinessOrganizationForm)
function formatNumberWithNairaSymbol(number) {
	// Convert number to string
	const numStr = String(number)

	// Check if the number already contains the Naira symbol
	const hasNairaSymbol = numStr.includes("")

	// Remove any non-digit characters (excluding the Naira symbol)
	const cleanedNumber = numStr.replace(/[^\d.₦]/g, "")

	// Format the number with thousand separators
	const formattedNumber = cleanedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

	// Add the Naira symbol if it wasn't present initially
	const numberWithSymbol = hasNairaSymbol ? formattedNumber : `${formattedNumber}`

	return numberWithSymbol
}

function removeNairaSymbolAndCommas(numberString) {
	const cleanedNumber = numberString.replace(/[^\d.]/g, "")

	return cleanedNumber
}

const styles = StyleSheet.create({})
