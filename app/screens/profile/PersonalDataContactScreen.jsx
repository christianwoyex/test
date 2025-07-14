import { useQueryClient } from "@tanstack/react-query"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { observer } from "mobx-react"

import CustomTextInput from "../../components/common/Input"
import CustomPrimaryButton from "../../components/common/PrimaryButton"
import LoanHeader from "../../components/Loan/Header"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomPhoneInput from "../../components/common/PhoneInput"
import authStore from "../../mobx/AuthStore"
import profileStore from "../../mobx/profileStore"
import LoadingModal from "../../components/common/LoadingScreen"
import SuccessModal from "../../components/common/SuccessScreen"
import SuccessMainModal from "../../components/common/SuccessMainScreen"

import ErrorModal from "../../components/common/ErrorScreen"

const PersonalDataContactScreen = ({ navigation }) => {
	const queryClient = useQueryClient()
	const personalContactSchema = yup.object().shape({
		email: yup.string().email().required("Email is required").label("Email"),
		phone: yup.string().required()
	})
	const formik = useFormik({
		enableReinitialize: true,
		validateOnChange: true,
		initialValues: {
			phone: authStore.loggedInUser.phone ? `0${authStore.loggedInUser.phone}` : "",
			email: authStore.loggedInUser.email ? authStore.loggedInUser.email : ""
		},
		onSubmit: async values => {
			let payload = { ...values }
			delete payload.phone
			const response = await profileStore.updatePersonalDetails(payload)

			if (response?.success) {
				queryClient.invalidateQueries({ queryKey: ["user"] })
			}
		},
		validationSchema: personalContactSchema
	})

	const handleCloseSuccess = () => {
		profileStore.clearSuccessStatus()
		navigation.navigate("personal-data")
	}
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Contact Info" border={false} />
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{profileStore.loading && <LoadingModal modalVisible={profileStore.loading} />}
				{profileStore.error && <ErrorModal modalVisible={profileStore.error} error={profileStore.errorValue} onRequestClose={() => profileStore.clearErrorStatus()} />}
				{profileStore.success && <SuccessMainModal modalVisible={profileStore.success} message={profileStore.successValue} onRequestClose={() => handleCloseSuccess()} />}
				<View style={{ marginTop: 20 }}>
					<CustomTextInput
						name="email"
						autoComplete="off"
						label="Email Address"
						placeholder="Enter your email"
						value={formik.values.email}
						inputMode="email"
						disabled={authStore.loading}
						onChangeText={formik.handleChange("email")}
						onBlur={formik.handleBlur("email")}
						error={formik.touched.email && formik.errors.email}
					/>
				</View>
				<View>
					<CustomPhoneInput
						autoComplete="off"
						label="Phone Number"
						placeholder="09035892809"
						keyboardType="phone-pad"
						inputMode="tel"
						readOnly={true}
						name="phone"
						value={formik.values.phone}
						onChangeText={formik.handleChange("phone")}
						onBlur={formik.handleBlur("phone")}
						error={formik.touched.phone && formik.errors.phone}
					/>
				</View>
				<View style={{ marginTop: 20 }}>
					<CustomPrimaryButton onPress={formik.handleSubmit} title="Save Changes" />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default observer(PersonalDataContactScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	content: {
		flex: 1,
		paddingHorizontal: 20
	}
})
