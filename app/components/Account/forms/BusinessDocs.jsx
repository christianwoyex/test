import { StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import * as DocumentPicker from "expo-document-picker"
import { useFormik } from "formik"
import * as yup from "yup"
import { observer } from "mobx-react"
import { useQueryClient } from "@tanstack/react-query"

import FileCard from "../../../screens/profile/FileCard"
import CustomTextInput from "../../common/Input"
import CustomPrimaryButton from "../../common/PrimaryButton"
import profileStore from "../../../mobx/profileStore"
import LoadingModal from "../../common/LoadingScreen"
import SuccessMainModal from "../../common/SuccessMainScreen"
import ErrorModal from "../../common/ErrorScreen"
import UploadProgress from "../../common/UploadProgress"
let gFormData = global.FormData

const BusinessDocsForm = ({ navigation }) => {
	const queryClient = useQueryClient()
	const [selectedDoc, setSelectDoc] = useState(null)

	const businessDocSchema = yup.object().shape({
		regNumber: yup.string().required().label("Registration Number"),
		document: yup.string().required("Please upload a valid ID").label("Document")
	})
	const formik = useFormik({
		enableReinitialize: true,
		validateOnChange: true,
		initialValues: {
			regNumber: profileStore.businessInfo.reg_number ? profileStore.businessInfo.reg_number : "",
			document: profileStore.businessInfo.reg_doc ? "" : ""
		},
		onSubmit: async values => {
			let gformData = new gFormData()
			let payload = { ...values }

			gformData.append("regNumber", payload.regNumber)
			gformData.append("document", { uri: selectedDoc[0].uri, type: selectedDoc[0].mimeType, name: selectedDoc[0].name, size: selectedDoc[0].size })

			const response = await profileStore.updateBusinessDocs(gformData)
			if (response?.success) {
				queryClient.invalidateQueries({ queryKey: ["business"] })
			}
		},
		validationSchema: businessDocSchema
	})

	const selectDoc = async () => {
		try {
			let result = await DocumentPicker.getDocumentAsync({ type: ["image/png", "image/jpg", "image/jpeg", "application/pdf"] })
			if (result?.assets) {
				setSelectDoc(result?.assets)
				formik.setFieldValue("document", result?.assets[0].uri)
			}
		} catch (err) {
			if (DocumentPicker.isCancel(err)) console.log("User cancelled the upload", err)
			else console.log(err)
		}
	}

	const handleCloseSuccess = () => {
		profileStore.clearSuccessStatus()
		navigation.navigate("business-data")
	}
	return (
		<View style={{ flex: 1, marginTop: 30 }}>
			{profileStore?.loading && <UploadProgress modalVisible={profileStore.loading} progress={profileStore?.uploadProgress} />}
			{profileStore.error && <ErrorModal modalVisible={profileStore.error} error={profileStore.errorValue} onRequestClose={() => profileStore.clearErrorStatus()} />}
			{profileStore.success && <SuccessMainModal modalVisible={profileStore.success} message={profileStore.successValue} onRequestClose={() => handleCloseSuccess()} />}
			<View>
				<CustomTextInput
					label="RC/BN Number"
					placeholder="Registered Business Number"
					name="regNumber"
					autoComplete="off"
					value={formik.values.regNumber}
					// keyboardType="text"
					inputMode="text"
					// disabled={authStore.loading}
					onChangeText={formik.handleChange("regNumber")}
					onBlur={formik.handleBlur("regNumber")}
					error={formik.touched.regNumber && formik.errors.regNumber}
				/>
			</View>
			<View>
				<Text style={styles.label}>CAC Documentation</Text>
				<FileCard label={selectedDoc ? selectedDoc[0]?.name : "Accepted file formats are: PDF, PNG, JPEG"} onPress={() => selectDoc()} />
				<Text style={styles.error}>{formik.errors.document && formik.errors.document}</Text>
			</View>
			<View style={{ marginTop: 40, marginBottom: 40 }}>
				<CustomPrimaryButton onPress={formik.handleSubmit} title="Save Business Details" />
			</View>
		</View>
	)
}

export default observer(BusinessDocsForm)

const styles = StyleSheet.create({
	label: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D"
	},
	error: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontWeight: "400",
		marginBottom: 5,
		color: "red"
	}
})
