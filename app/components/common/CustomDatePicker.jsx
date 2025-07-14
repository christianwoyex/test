import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconDatePicker } from "../../../assets/icons"

const CustomDatePicker = ({ label = "Select Date", error = "", onPress, value = "", placeholder = "00/00/0000" }) => {
	return (
		<View>
			<Text style={{ fontFamily: "Inter-Regular", fontSize: 16, fontWeight: "400", marginBottom: 5, color: "#002D2D" }}>{label}</Text>
			<TouchableOpacity activeOpacity={0.9} style={styles.datePickStyle} onPress={onPress}>
				{value ? <Text style={styles.value}>{value}</Text> : <Text style={styles.placeholder}>{placeholder}</Text>}
				<IconDatePicker />
			</TouchableOpacity>
			{error && <Text style={{ fontSize: 12, color: "red" }}>{error}</Text>}
		</View>
	)
}

export default CustomDatePicker

const styles = StyleSheet.create({
	datePickStyle: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		minHeight: 56,
		borderColor: "#E6E9EC",
		borderWidth: 1,
		padding: 8,
		paddingRight: 10,
		borderRadius: 8
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
	}
})
