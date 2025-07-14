import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { RadioActive, RadioInActive } from "../../../../../assets/icons"
import SelectRadioTypeButton from "./SheetButton"

const OfficeStatusData = ({ value = "", onPressActive, onPressInactive }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.loanTypeLabel}>Select</Text>
			<SelectRadioTypeButton icon={value === "Active" ? <RadioActive /> : <RadioInActive />} onPress={onPressActive} title="Active" />
			<SelectRadioTypeButton icon={value === "Inactive" ? <RadioActive /> : <RadioInActive />} onPress={onPressInactive} title="Inactive" />
		</View>
	)
}

export default OfficeStatusData

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
