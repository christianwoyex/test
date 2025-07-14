import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { RadioActive, RadioInActive } from "../../../../../assets/icons"
import SelectRadioTypeButton from "./SheetButton"

const BusinessTypeSelectData = ({ value = "", onPressExisting, onPressNew }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.loanTypeLabel}>Select</Text>
			<SelectRadioTypeButton icon={value === "Existing Bussiness" ? <RadioActive /> : <RadioInActive />} onPress={onPressExisting} title="Existing Bussiness" />
			<SelectRadioTypeButton icon={value === "New Ideas" ? <RadioActive /> : <RadioInActive />} onPress={onPressNew} title="New Ideas" />
		</View>
	)
}

export default BusinessTypeSelectData

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingHorizontal: 20
	},
	loanTypeLabel: {
		color: "#001F3F",
		fontFamily: "Inter-Regular",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "400",
		marginTop: 10,
		marginBottom: 10
	}
})
