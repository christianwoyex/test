import { StyleSheet, Text, View } from "react-native"
import React from "react"
import SheetButton from "./SheetButton"
import { RadioActive, RadioInActive } from "../../../../../assets/icons"
import SelectRadioTypeButton from "./SheetButton"

const BusinessCatData = ({ value = "", onPressExisting, onPressNewIdea }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.loanTypeLabel}>Select</Text>
			<SelectRadioTypeButton icon={value === "New Idea" ? <RadioActive /> : <RadioInActive />} onPress={onPressNewIdea} />
			<SelectRadioTypeButton icon={value === "Existing Business" ? <RadioActive /> : <RadioInActive />} onPress={onPressExisting} title="Existing Business" />
		</View>
	)
}

export default BusinessCatData

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
