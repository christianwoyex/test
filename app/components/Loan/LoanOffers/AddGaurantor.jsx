import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import CustomTextInput from "../../common/Input"
import CustomPrimaryButtonWithDisble from "../../common/CustomPrimaryBtnWithDisable"
import CustomPhoneInput from "../../common/PhoneInput"
import offerStore from "../../../mobx/LoanOfferStore"
import { observer } from "mobx-react"

const AddGaurantor = ({ navigation }) => {
	const guarantorSchema = yup.object().shape({
		name1: yup.string().required().label("First Guarantor"),
		email1: yup.string().email().required("Email is required").label("Email"),
		phone1: yup.string().min(11).max(11).required(),
		occupation1: yup.string().min(2).required().label("Occupation"),
		relationship1: yup.string().required().label("Relationship"),
		name2: yup.string().min(2).required().label("Second Guarantor"),
		email2: yup.string().email().required("Email is required").label("Email"),
		phone2: yup.string().min(11).max(11).required(),
		occupation2: yup.string().required().label("Ocupation"),
		relationship2: yup.string().required().label("Relationship")
	})
	const formik = useFormik({
		enableReinitialize: true,
		validateOnChange: true,
		initialValues: {
			name1: offerStore.guarantor.name1 ? offerStore.guarantor?.name1 : "",
			email1: offerStore.guarantor?.email1 ? offerStore?.guarantor?.email1 : "",
			phone1: offerStore.guarantor?.phone1 ? offerStore?.guarantor?.phone1 : "",
			occupation1: offerStore?.guarantor?.occupation1 ? offerStore.guarantor?.occupation1 : "",
			relationship1: offerStore.guarantor.relationship1 ? offerStore.guarantor.relationship1 : "",
			name2: offerStore.guarantor?.name2 ? offerStore?.guarantor?.name2 : "",
			email2: offerStore.guarantor?.email2 ? offerStore?.guarantor?.email2 : "",
			phone2: offerStore.guarantor?.phone2 ? offerStore?.guarantor?.phone2 : "",
			occupation2: offerStore.guarantor.occupation2 ? offerStore.guarantor?.occupation2 : "",
			relationship2: offerStore.guarantor.relationship2 ? offerStore.guarantor.relationship2 : ""
		},
		onSubmit: async values => {
			let payload = { ...values }
			offerStore.setGuarantor(payload)
			navigation.goBack()
		},
		validationSchema: guarantorSchema
	})
	return (
		<View style={{ paddingHorizontal: 20, flex: 1, marginTop: 20 }}>
			<Text style={styles.subTextStyle}>
				Opt for ease and punctuality in payments! Authorize automatic electronic withdrawals for a hassle-free, on-time repayment experience. Provide your bank details, and we'll take care of the
				rest."
			</Text>
			<View style={{ marginTop: 30 }}>
				<Text style={styles.textStyle}>First Guarantor</Text>
				<CustomTextInput
					name="name1"
					value={formik.values.name1}
					onChangeText={formik.handleChange("name1")}
					onBlur={formik.handleBlur("name1")}
					error={formik.touched.name1 && formik.errors.name1}
					label="Full Name"
					placeholder="Enter Guarantor's name"
				/>
				<CustomTextInput
					name="email1"
					autoComplete="off"
					label="Email Address"
					placeholder="Enter your email"
					value={formik.values.email1}
					inputMode="email"
					onChangeText={formik.handleChange("email1")}
					onBlur={formik.handleBlur("email1")}
					error={formik.touched.email1 && formik.errors.email1}
				/>
				<CustomPhoneInput
					autoComplete="off"
					label="Phone Number"
					placeholder="09035892809"
					keyboardType="phone-pad"
					inputMode="tel"
					name="phone1"
					value={formik.values.phone1}
					onChangeText={formik.handleChange("phone1")}
					onBlur={formik.handleBlur("phone1")}
					error={formik.touched.phone1 && formik.errors.phone1}
				/>
				<CustomTextInput
					label="Occupation"
					placeholder="e.g Business man"
					name="occupation1"
					value={formik.values.occupation1}
					inputMode="text"
					onChangeText={formik.handleChange("occupation1")}
					onBlur={formik.handleBlur("occupation1")}
					error={formik.touched.occupation1 && formik.errors.occupation1}
				/>

				<CustomTextInput
					label="Relationship"
					placeholder="e.g Brother"
					name="relationship1"
					value={formik.values.relationship1}
					inputMode="text"
					onChangeText={formik.handleChange("relationship1")}
					onBlur={formik.handleBlur("relationship1")}
					error={formik.touched.relationship1 && formik.errors.relationship1}
				/>
			</View>
			<View style={{ marginTop: 30 }}>
				<Text style={styles.textStyle}>Second Guarantor</Text>
				<CustomTextInput
					name="name2"
					value={formik.values.name2}
					onChangeText={formik.handleChange("name2")}
					onBlur={formik.handleBlur("name2")}
					error={formik.touched.name2 && formik.errors.name2}
					label="Full Name"
					placeholder="Enter Guarantor's name"
				/>
				<CustomTextInput
					name="email2"
					autoComplete="off"
					label="Email Address"
					placeholder="Enter your email"
					value={formik.values.email2}
					inputMode="email"
					onChangeText={formik.handleChange("email2")}
					onBlur={formik.handleBlur("email2")}
					error={formik.touched.email2 && formik.errors.email2}
				/>
				<CustomPhoneInput
					autoComplete="off"
					label="Phone Number"
					placeholder="09035892809"
					keyboardType="phone-pad"
					inputMode="tel"
					name="phone2"
					value={formik.values.phone2}
					onChangeText={formik.handleChange("phone2")}
					onBlur={formik.handleBlur("phone2")}
					error={formik.touched.phone2 && formik.errors.phone2}
				/>
				<CustomTextInput
					label="Occupation"
					placeholder="e.g Business man"
					name="occupation2"
					value={formik.values.occupation2}
					inputMode="text"
					onChangeText={formik.handleChange("occupation2")}
					onBlur={formik.handleBlur("occupation2")}
					error={formik.touched.occupation2 && formik.errors.occupation2}
				/>

				<CustomTextInput
					label="Relationship"
					placeholder="e.g Brother"
					name="relationship2"
					value={formik.values.relationship2}
					inputMode="text"
					onChangeText={formik.handleChange("relationship2")}
					onBlur={formik.handleBlur("relationship2")}
					error={formik.touched.relationship2 && formik.errors.relationship2}
				/>
			</View>
			<View style={{ marginTop: 15, marginBottom: 40 }}>
				<CustomPrimaryButtonWithDisble
					disabled={
						!formik.values.name1 &&
						!formik.values.name2 &&
						formik.values.phone1 &&
						!formik.values.phone2 &&
						!formik.values.email1 &&
						!formik.values.email2 &&
						!formik.values.relationship1 &&
						!formik.values.relationship2 &&
						!formik.values.occupation1 &&
						!formik.values.occupation2 &&
						formik.isValid
							? true
							: formik.values.name1 &&
							  formik.values.name2 &&
							  formik.values.phone1 &&
							  formik.values.phone2 &&
							  formik.values.email1 &&
							  formik.values.email2 &&
							  formik.values.relationship1 &&
							  formik.values.relationship2 &&
							  formik.values.occupation1 &&
							  formik.values.occupation2 &&
							  formik.isValid
							? false
							: true
					}
					onPress={formik.handleSubmit}
					title={"Save Guarantors Details"}
				/>
			</View>
		</View>
	)
}

export default observer(AddGaurantor)

const styles = StyleSheet.create({
	textStyle: {
		marginBottom: 10,
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 20,
		lineHeight: 27,
		color: "#002D2D"
	},
	subTextStyle: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "200",
		fontSize: 11,
		lineHeight: 18,
		color: "#000000"
	}
})
