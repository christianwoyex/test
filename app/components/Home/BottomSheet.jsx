import React from "react"
import { View, Text, StyleSheet, Modal, Alert } from "react-native"
import RequestLoanTypeButton from "./LoanRequestButtonBottomSheet"
import { IconExistingBusiness, IconNewIdea } from "../../../assets/icons"

const BottomSheetComp = ({ onSelectExisting, onSelectNew }) => {
	return (
		<View style={styles.contentContainer}>
			<Text style={styles.loanTypeLabel}>Loan for</Text>
			<RequestLoanTypeButton title="Existing Business" onPress={onSelectExisting} icon={<IconExistingBusiness />} />
			<RequestLoanTypeButton title="New Ideas" onPress={onSelectNew} icon={<IconNewIdea />} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(0,0,0, 0.5)"
	},
	contentContainer: {
		width: "100%",
		justifyContent: "center",
		paddingHorizontal: 20,
		marginTop: 30
	},
	loanTypeLabel: {
		color: "#001F3F",
		fontFamily: "Inter-Regular",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "400",
		marginBottom: 10
	}
})

export default BottomSheetComp
