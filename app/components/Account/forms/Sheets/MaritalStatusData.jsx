import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { RadioActive, RadioInActive } from "../../../../../assets/icons"
import SelectRadioTypeButton from "./SheetButton"

const MaritalStatusData = ({ value = "", onPressSingle, onPressMarried, onPressDivorced }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.loanTypeLabel}>Select</Text>
			<SelectRadioTypeButton icon={value === "Single" ? <RadioActive /> : <RadioInActive />} onPress={onPressSingle} title="Single" />
			<SelectRadioTypeButton icon={value === "Married" ? <RadioActive /> : <RadioInActive />} onPress={onPressMarried} title="Married" />
			<SelectRadioTypeButton icon={value === "Divorced" ? <RadioActive /> : <RadioInActive />} onPress={onPressDivorced} title="Divorced" />
		</View>
	)
}

export default MaritalStatusData

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
