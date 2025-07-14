import { useQueryClient } from "@tanstack/react-query"
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import * as yup from "yup"
import { observer } from "mobx-react"
import CustomPrimaryButton from "../../components/common/PrimaryButton"
import CustomTextInput from "../../components/common/Input"
import profileStore from "../../mobx/profileStore"
import { useFormik } from "formik"
import CustomPrimaryButtonWithDisble from "../../components/common/CustomPrimaryBtnWithDisable"

const PersonalIdNin = () => {
	const queryClient = useQueryClient()
	const personalResidentialBvnSchema = yup.object().shape({
		nin: yup.string().min(11).max(11).required().label("NIN")
	})
	const formik = useFormik({
		enableReinitialize: false,
		validateOnChange: true,
		initialValues: {
			nin: ""
		},

		onSubmit: async values => {
			let payload = { ...values }
			let ninbPayload = { method: "nin" }
			ninbPayload.number = payload.nin

			const response = await profileStore.updatePersonalIDentification(ninbPayload)
			if (response?.success) {
				queryClient.invalidateQueries({ queryKey: ["user"] })
			}
		},
		validationSchema: personalResidentialBvnSchema
	})
	const openPhoneDialer = phoneNumber => {
		const phoneNumberUri = `tel:${phoneNumber}`
		Linking.openURL(phoneNumberUri)
			.then(() => {})
			.catch(error => {})
	}
	return (
		<View>
			<View style={{ marginTop: 20 }}>
				<CustomTextInput
					label="NIN"
					placeholder="Enter your NIN"
					name="nin"
					keyboardType="numeric"
					value={formik.values.nin}
					onChangeText={formik.handleChange("nin")}
					onBlur={formik.handleBlur("nin")}
					error={formik.touched.nin && formik.errors.nin}
				/>
			</View>
			<View style={{ position: "relative", marginTop: -10, marginBottom: 15, gap: 3, width: "100%", display: "flex", justifyContent: "flex-start", flexDirection: "row" }}>
				<Text style={styles.instructText}>To get your NIN</Text>
				<TouchableOpacity activeOpacity={0.9} onPress={() => openPhoneDialer("*346#")}>
					<Text style={styles.instructBold}>Dial *346#</Text>
				</TouchableOpacity>
			</View>

			<View style={{ marginTop: 60, marginBottom: 20 }}>
				<CustomPrimaryButtonWithDisble
					disabled={!formik.values.nin ? true : formik.values?.nin?.length < 11 ? true : formik.values.nin.length > 11 ? true : false}
					title="Save ID details"
					onPress={formik.handleSubmit}
				/>
			</View>
		</View>
	)
}

export default observer(PersonalIdNin)

const styles = StyleSheet.create({
	instructText: {
		fontFamily: "Inter-Regular",
		fontWeight: "300",
		fontSize: 12,
		lineHeight: 15,
		color: "#949494"
	},
	instructBold: {
		fontFamily: "Inter-SemiBold",
		fontWeight: "300",
		fontSize: 12,
		lineHeight: 15,
		color: "#525252"
	},
	otherIdType: {
		fontFamily: "Inter-Regular",
		fontWeight: "300",
		fontSize: 16,
		lineHeight: 15,
		color: "#525252"
	}
})
