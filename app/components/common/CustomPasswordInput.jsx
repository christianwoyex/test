import React, { forwardRef, useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { PasswordCloseIcon, PasswordIcon } from "../../../assets/icons"

export const CustomPasswordInput = forwardRef(({ label, placeholder, error, onChangeText, ...props }, ref) => {
	const [value, setValue] = useState("")
	const [visible, setVisibility] = useState(true)

	const handleTextChange = text => {
		setValue(text)
		if (onChangeText) {
			onChangeText(text)
		}
	}
	function handleTogglePassword() {
		setVisibility(!visible)
	}
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput ref={ref} style={styles.input} placeholder={placeholder} secureTextEntry={visible} value={value} onChangeText={handleTextChange} {...props} />
			{visible ? (
				<TouchableOpacity activeOpacity={0.9} onPress={handleTogglePassword} style={styles.eyeIcon}>
					<PasswordIcon />
				</TouchableOpacity>
			) : (
				<TouchableOpacity activeOpacity={0.9} onPress={handleTogglePassword} style={styles.eyeIcon}>
					<PasswordCloseIcon />
				</TouchableOpacity>
			)}

			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
		position: "relative"
	},
	label: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D"
	},
	input: {
		fontFamily: "Inter-Regular",
		minHeight: 56,
		borderColor: "#E6E9EC",
		borderWidth: 1,
		padding: 8,
		paddingRight: 60,
		borderRadius: 8,
		fontSize: 16
	},
	error: {
		color: "red",
		marginTop: 3,
		fontSize: 12
	},
	eyeIcon: {
		width: 50,
		height: 54,
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		right: 5,
		top: 30,
		backgroundColor: "transparent"
	}
})

export default CustomPasswordInput
