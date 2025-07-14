import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { RadioActive, RadioInActive } from "../../../../../assets/icons"
import SelectRadioTypeButton from "./SheetButton"

const GenderSelectData = ({ value = "", onPressFemale, onPressMale, onPressOthers }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.loanTypeLabel}>Select</Text>
			<SelectRadioTypeButton icon={value === "Female" ? <RadioActive /> : <RadioInActive />} onPress={onPressFemale} title="Female" />
			<SelectRadioTypeButton icon={value === "Male" ? <RadioActive /> : <RadioInActive />} onPress={onPressMale} title="Male" />
		</View>
	)
}

export default GenderSelectData

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
