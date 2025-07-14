import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { observer } from "mobx-react"
import { useQueryClient } from "@tanstack/react-query"

import CustomPrimaryButton from "../../common/PrimaryButton"
import CustomTextInput from "../../common/Input"
import BusinessCatData from "./Sheets/BusinessCatData"
import BusinessCategoryBottomSheetModal from "./Sheets/BusinessCategorySheet"
import CustomSelectInputMask from "../../common/CustomSelectInputMask"
import BusinessOperationBottomSheetModal from "./Sheets/BusinessOperationSheet"
import BusinessOperationData from "./Sheets/BusinessOperationData"
import SelectRadioTypeButton from "./Sheets/SheetButton"
import { RadioActive, RadioInActive } from "../../../../assets/icons"

import BusinessIndustryData from "./Sheets/BusinessIndustryData"
import BusinessIndustryModal from "../../common/BusinessIndustryModal"
import profileStore from "../../../mobx/profileStore"
import MultiLineTextInput from "../../common/MultiLineInput"
import LoadingModal from "../../common/LoadingScreen"
import SuccessMainModal from "../../common/SuccessMainScreen"
import ErrorModal from "../../common/ErrorScreen"

const BusinessDetailsForm = ({ navigation }) => {
	const [showBis, setShowBis] = useState(false)
	const queryClient = useQueryClient()
	const categoryRef = useRef(null)
	const industryRef = useRef(null)
	const operationRef = useRef(null)

	const businessDetailsSchema = yup.object().shape({
		category: yup.string().required().label("Business Category"),
		name: yup.string().min(2).required().label("Business Name"),
		averageMonthlySales: yup.string().required().label("Average Monthly Sales"),
		operation: yup.string().min(2).required().label("Business Operation"),
		description: yup.string().required().label("Description"),
		industry: yup.string().required().label("Industry")
	})
	const formik = useFormik({
		enableReinitialize: true,
		validateOnChange: true,
		initialValues: {
			category: profileStore.businessInfo.category ? profileStore.businessInfo.category : "",
			name: profileStore.businessInfo.name ? profileStore.businessInfo.name : "",
			averageMonthlySales: profileStore.businessInfo.average_monthly_sales ? profileStore.businessInfo.average_monthly_sales : "",
			operation: profileStore.businessInfo.operation ? profileStore.businessInfo.operation : "",
			description: profileStore.businessInfo.description ? profileStore.businessInfo.description : "",
			industry: profileStore.businessInfo.industry ? profileStore.businessInfo.industry : ""
		},
		onSubmit: async values => {
			let payload = { ...values }
			payload.averageMonthlySales = removeNairaSymbolAndCommas(payload.averageMonthlySales)
			const response = await profileStore.createBusinessDetails(payload)

			if (response?.success) {
				queryClient.invalidateQueries({ queryKey: ["business"] })
			}
			// if (response?.data?.data && !response?.data?.data?.user?.is_verified) {
			// 	navigation.navigate("Otp")
			// }
		},
		validationSchema: businessDetailsSchema
	})
	const handlePresentBusinessCategory = useCallback(() => {
		categoryRef.current?.present()
	}, [])
	const handlePresentBusinessIndustry = useCallback(() => {
		industryRef.current?.present()
	}, [])
	const handlePresentBusinessOperation = useCallback(() => {
		operationRef.current?.present()
	}, [])

	const handleSelectCag = () => {
		handlePresentBusinessCategory()
	}
	const handleSelectIndustry = () => {
		handlePresentBusinessIndustry()
	}
	const handleOpenOperation = () => {
		handlePresentBusinessOperation()
	}

	const handleSelectCategory = text => {
		if (text === "New Idea") {
			formik.setFieldValue("category", "New Idea", true)
			categoryRef.current?.close()
		} else {
			formik.setFieldValue("category", "Existing Business", true)
			categoryRef.current?.close()
		}
	}
	const handleSelectBisIndustry = text => {
		formik.setFieldValue("industry", text, true)
		setShowBis(!showBis)
	}
	const handleSelectOperation = text => {
		formik.setFieldValue("operation", text, true)
		operationRef.current?.close()
	}

	const operationsData = [
		{
			id: "yterttye",
			value: "Retail and Wholesale Trade"
		},
		{
			id: "ghjsjhjsj",
			value: "Manufacturing and Contractors"
		},
		{
			id: "ytyewtuywu",
			value: "Food and Catering Services"
		},
		{
			id: "73774yuu3u",
			value: "It has a POS Terminal"
		},
		{
			id: "jkdkjsjdfkjdhfh",
			value: "Other operation"
		}
	]
	const data = useMemo(() => BusinessIndustryData.map((industry, index) => `${industry.title}`), [])
	const handleCloseSuccess = () => {
		profileStore.clearSuccessStatus()
		navigation.navigate("business-data")
	}
	const renderItem = useCallback(
		item => (
			<View key={item} style={{ width: "100%" }}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() => handleSelectBisIndustry(item)}
					style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", gap: 10, marginVertical: 5, height: 35 }}
				>
					{formik.values.industry === item ? <RadioActive /> : <RadioInActive />}
					<Text style={{ fontWeight: "400", fontFamily: "Inter-Regular", fontSize: 14, color: "#464646" }}>{item}</Text>
				</TouchableOpacity>
			</View>
		),
		[formik.values.industry, showBis]
	)
	return (
		<KeyboardAvoidingView
			style={{
				width: "100%",
				height: "100%"
			}}
		>
			{profileStore.loading && <LoadingModal modalVisible={profileStore.loading} />}
			{profileStore.error && <ErrorModal modalVisible={profileStore.error} error={profileStore.errorValue} onRequestClose={() => profileStore.clearErrorStatus()} />}
			{profileStore.success && <SuccessMainModal modalVisible={profileStore.success} message={profileStore.successValue} onRequestClose={() => handleCloseSuccess()} />}
			<View>
				<View style={{ marginTop: 20 }}>
					<CustomSelectInputMask
						hideIcon={true}
						value={formik.values.category}
						label="Business Category"
						onPress={() => handleSelectCag()}
						error={formik.errors.category}
						placeholder="Select Business category.."
					/>
				</View>
				<BusinessCategoryBottomSheetModal backgroundStyle={{ backgroundColor: "#FFFFFF" }} handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }} ref={categoryRef}>
					<BusinessCatData value={formik.values.category} onPressNewIdea={() => handleSelectCategory("New Idea")} onPressExisting={() => handleSelectCategory("Existing Business")} />
				</BusinessCategoryBottomSheetModal>
				<BusinessOperationBottomSheetModal backgroundStyle={{ backgroundColor: "#FFFFFF" }} handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }} ref={operationRef}>
					<BusinessOperationData>
						<>
							{operationsData.map(operation => (
								<SelectRadioTypeButton
									key={operation.id}
									icon={formik.values.operation === operation.value ? <RadioActive /> : <RadioInActive />}
									onPress={() => handleSelectOperation(operation.value)}
									title={operation.value}
								/>
							))}
						</>
					</BusinessOperationData>
				</BusinessOperationBottomSheetModal>

				<BusinessIndustryModal modalVisible={showBis} onRequestClose={() => setShowBis(!showBis)}>
					{data.map(renderItem)}
				</BusinessIndustryModal>

				<View style={{ marginTop: 15 }}>
					<CustomTextInput
						label="Business Name"
						placeholder="Enter Business name"
						name="name"
						autoComplete="off"
						value={formik.values.name}
						// keyboardType="text"
						inputMode="text"
						// disabled={authStore.loading}
						onChangeText={formik.handleChange("name")}
						onBlur={formik.handleBlur("name")}
						error={formik.touched.name && formik.errors.name}
					/>
				</View>
				<View style={{ marginTop: 0 }}>
					<CustomSelectInputMask
						hideIcon={true}
						value={formik.values.operation}
						label="Business Operations"
						onPress={() => handleOpenOperation()}
						error={formik.errors.operation}
						placeholder="Select Business operations.."
					/>
					{/* <CustomDropdownPicker items={items} label="Business Operations" placeholderLabel="" /> */}
				</View>
				<View style={{ marginTop: 15 }}>
					<CustomTextInput
						label="Average Monthly Sales"
						placeholder="Business Operations"
						name="averageMonthlySales"
						autoComplete="off"
						KeyboardType="numeric"
						inputMode="numeric"
						value={formatNumberWithNairaSymbol(formik.values.averageMonthlySales.toString())}
						onChangeText={formik.handleChange("averageMonthlySales")}
						onBlur={formik.handleBlur("averageMonthlySales")}
						error={formik.touched.averageMonthlySales && formik.errors.averageMonthlySales}
					/>
				</View>
				<View>
					<MultiLineTextInput
						editable
						multiline={true}
						numberOfLines={8}
						maxLength={500}
						label="Tell us about your Business"
						placeholder="50 character or more"
						name="description"
						autoComplete="off"
						KeyboardType="default"
						inputMode="text"
						value={formik.values.description}
						onChangeText={formik.handleChange("description")}
						onBlur={formik.handleBlur("description")}
						error={formik.touched.description && formik.errors.description}
					/>
				</View>
				<View>
					<CustomSelectInputMask
						hideIcon={true}
						label="Business Industry"
						placeholder="Select Industry---"
						value={formik.values.industry}
						onPress={() => setShowBis(!showBis)}
						error={formik.errors.industry}
					/>
					{/* <CustomTextInput
						ref={categoryInRef}
						label="Business Industry"
						placeholder="Select Industry---"
						name="industry"
						autoComplete="off"
						KeyboardType="default"
						inputMode="text"
						value={formik.values.industry}
						onChangeText={formik.handleChange("industry")}
						onBlur={formik.handleBlur("industry")}
						error={formik.errors.industry}
						onFocus={handleSelectIndustry}
					/> */}
				</View>
				<View style={{ marginTop: 20, marginBottom: 40 }}>
					<CustomPrimaryButton title="Save Business Details" onPress={formik.handleSubmit} />
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}

export default observer(BusinessDetailsForm)
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
const styles = StyleSheet.create({})
