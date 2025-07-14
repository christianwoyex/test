import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { useQueryClient } from "@tanstack/react-query"
import * as yup from "yup"
import { observer } from "mobx-react"
import CustomPrimaryButton from "../../components/common/PrimaryButton"
import CustomTextInput from "../../components/common/Input"
import profileStore from "../../mobx/profileStore"
import { useFormik } from "formik"
import CustomPrimaryButtonWithDisble from "../../components/common/CustomPrimaryBtnWithDisable"

const PersonalIdBvn = () => {
	const queryClient = useQueryClient()
	const personalResidentialBvnSchema = yup.object().shape({
		bvn: yup.string().min(11).max(11).required().label("BVN")
	})
	const formik = useFormik({
		enableReinitialize: false,
		validateOnChange: true,
		initialValues: {
			bvn: ""
		},

		onSubmit: async values => {
			let payload = { ...values }
			let bvnbPayload = { method: "bvn" }
			bvnbPayload.number = payload.bvn

			const response = await profileStore.updatePersonalIDentification(bvnbPayload)
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
					label="BVN"
					placeholder="Enter your BVN"
					keyboardType="numeric"
					name="bvn"
					value={formik.values.bvn}
					onChangeText={formik.handleChange("bvn")}
					onBlur={formik.handleBlur("bvn")}
					error={formik.touched.bvn && formik.errors.bvn}
				/>
			</View>
			<View style={{ marginTop: -10, marginBottom: 20, width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
				<View>
					<Text style={styles.instructText}>To get your BVN </Text>
				</View>
				<TouchableOpacity activeOpacity={0.9} onPress={() => openPhoneDialer("*565*0#")}>
					<Text style={styles.instructBold}>Dial *565*0#</Text>
				</TouchableOpacity>
			</View>
			<View style={{ marginTop: 60, marginBottom: 20 }}>
				<CustomPrimaryButtonWithDisble
					disabled={!formik.values.bvn ? true : formik.values?.bvn?.length < 11 ? true : formik.values.bvn.length > 11 ? true : false}
					title="Save ID details"
					onPress={formik.handleSubmit}
				/>
			</View>
		</View>
	)
}

export default observer(PersonalIdBvn)

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
