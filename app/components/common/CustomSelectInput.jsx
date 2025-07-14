import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import RNPickerSelect from "react-native-picker-select"
import { IconCaretDown, IconHeaderArrow } from "../../../assets/icons"

const CustomDropdownPicker = ({
	label = "Select an option:",
	placeholderLabel = "Select..",
	value = "",
	error = "",
	onValueChange,

	items = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" }
	]
}) => {
	const [selectedValue, setSelectedValue] = useState(null)

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<RNPickerSelect
				placeholder={{
					label: placeholderLabel,
					value: null
				}}
				items={items}
				Icon={IconCaretDown}
				useNativeAndroidPickerStyle={false}
				onValueChange={onValueChange}
				style={pickerSelectStyles}
				value={value}
			/>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		// paddingVertical: 10
	},
	label: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D"
	}
})

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		height: 55,
		borderWidth: 1,
		borderColor: "#E6E9EC",
		borderRadius: 8,
		width: "100%",
		color: "black",
		paddingRight: 30 // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		height: 55,
		borderWidth: 1,
		borderColor: "#E6E9EC",
		borderRadius: 8,
		width: "100%",
		color: "black",
		paddingRight: 30
	},
	iconContainer: {
		top: 15,
		right: 15
	},
	error: {
		color: "red",
		marginTop: 3,
		fontSize: 12
	}
})
export default CustomDropdownPicker
