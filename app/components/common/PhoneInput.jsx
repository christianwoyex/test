import React, { useState } from "react"
import { View, TextInput, StyleSheet, Text } from "react-native"
import { IconPhoneDown, PasswordIcon } from "../../../assets/icons"

const CustomPhoneInput = ({ value, onCountryCodeChange, onNumberChange, keyboardType, error = "", countries, placeholder = "0903 5892 809", ...props }) => {
	const [selectedCountry, setSelectedCountry] = useState("+234")

	const handleCountryCodeChange = code => {
		setSelectedCountry(code)
		if (onCountryCodeChange) {
			onCountryCodeChange(code)
		}
	}

	return (
		<View style={{ marginBottom: 16 }}>
			<Text style={styles.label}>Phone Number</Text>
			<View style={styles.container}>
				<View style={styles.countryCodeContainer}>
					<Text style={styles.codeText}>+234</Text>
					<IconPhoneDown />
				</View>
				<TextInput style={styles.input} keyboardType={keyboardType} placeholder={placeholder} value={value} onChangeText={onNumberChange} {...props} />

				{error && <Text style={styles.error}>{error}</Text>}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "gray",

		borderRadius: 8,
		marginBottom: 10
	},
	label: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 5,
		color: "#525252"
	},
	error: {
		color: "red",
		marginTop: 5
	},
	codeText: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 16,
		lineHeight: 19,
		color: "#000000",
		marginRight: 4
	},
	countryCodeContainer: {
		width: "30%",
		borderWidth: 1,
		height: 55,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#D9D9D9",
		// paddingHorizontal: 10,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8
	},
	picker: {
		width: 100,
		height: 40,
		color: "black"
	},
	input: {
		width: "70%",
		borderColor: "#D9D9D9",
		borderWidth: 1,
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		paddingHorizontal: 10,
		height: 55,
		fontSize: 16,
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		padding: 10
	}
})

export default CustomPhoneInput
