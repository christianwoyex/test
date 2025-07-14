import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconCaretDown, IconHeaderArrow } from "../../../assets/icons"
const CustomSelectInputMask = ({ placeholder = "Select Loan Type--- ", value = "", label = "Field Label", error = "", hideIcon = false, onPress }) => {
	return (
		<View style={styles.selectPicker}>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity activeOpacity={0.9} style={styles.input} onPress={onPress}>
				{value ? <Text style={styles.value}>{value}</Text> : <Text style={styles.placeholder}> {placeholder}</Text>}
				{hideIcon ? <IconCaretDown /> : null}
			</TouchableOpacity>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	)
}

export default CustomSelectInputMask

const styles = StyleSheet.create({
	selectPicker: {
		width: "100%",
		marginBottom: 20
	},
	input: {
		width: "100%",
		flexDirection: "row",
		fontFamily: "Inter-Regular",
		minHeight: 56,
		justifyContent: "space-between",
		alignItems: "center",
		borderColor: "#E6E9EC",
		borderWidth: 1,
		padding: 8,
		borderRadius: 8,
		fontSize: 16
	},
	container: {
		marginBottom: 20
	},
	label: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D"
	},
	placeholder: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: "#B1B1B1"
	},
	value: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: "#000000"
	},
	error: {
		color: "red",
		marginTop: 3,
		fontSize: 12
	}
})
