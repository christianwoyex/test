import { StyleSheet, Text, View } from "react-native"
import React from "react"
import CustomTextInput from "../../common/Input"
import CustomPrimaryButton from "../../common/PrimaryButton"

const LinkAccountForm = () => {
	// cons
	return (
		<View>
			<View style={{ marginTop: 20 }}>
				<Text style={styles.topTextStyles}>Please provide your bank details for loan disbursement.</Text>
				<CustomTextInput label="Bank Name" placeholder="Select bank ..." />
			</View>
			<View>
				<CustomTextInput label="Account Number" placeholder="Add account number" />
			</View>
			<View>
				<CustomTextInput label="Account Name" placeholder="Add Account Name" />
			</View>
			<View style={{ marginTop: 20 }}>
				<CustomPrimaryButton title="Save Account Details" />
			</View>
		</View>
	)
}

export default LinkAccountForm

const styles = StyleSheet.create({
	topTextStyles: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 16,
		lineHeight: 22,
		letterSpacing: -0.02,
		color: "#666666",
		marginBottom: 40
	}
})
