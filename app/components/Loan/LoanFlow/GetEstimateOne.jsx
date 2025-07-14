import { StyleSheet, Text, TextInput, View } from "react-native"
import React from "react"
import TextTopSection from "./TextTopSection"
import CustomTextInput from "../../common/Input"
import CustomPrimaryButton from "../../common/PrimaryButton"
import { AppButtonOutline } from "../../common/OutlineButton"
import CustomOutlineButton from "../../common/CustomOutlineButton"
import { TouchableOpacity } from "@gorhom/bottom-sheet"

const GetEstimateOne = ({ navigation, onEstimePress, onPressNone }) => {
	return (
		<View>
			<TextTopSection />

			<View style={styles.middleSection}>
				<Text style={styles.monthlyRevText}>Enter Monthly Revenue</Text>
				<TextInput style={styles.monthIncomeInputStyle} placeholder="300,000.00" />
				<Text style={styles.monthlyRevTextBottom}> Monthly Revenue</Text>
			</View>
			<View style={styles.bottomSection}>
				<CustomTextInput
					label="Email"
					placeholder="Enter your email"
					value={""}
					inputType="email"
					// onChangeText={(text) => setEmail(text)}
					// onBlur={validateEmail}
					error={""}
				/>
			</View>
			<View style={{ marginTop: 30 }}>
				<CustomPrimaryButton title={"Get Estimate"} onPress={onEstimePress} />
				<CustomOutlineButton title="Don’t want an estimate" onPress={onPressNone} />
			</View>
			<View style={styles.bottomContent}>
				<Text style={styles.regLink}>Not an existing business?</Text>
				<TouchableOpacity onPress={onPressNone}>
					<Text style={styles.RegTextLink}>Click here</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default GetEstimateOne

const styles = StyleSheet.create({
	middleSection: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
		backgroundColor: "#FFFFFF",
		paddingTop: 20,
		paddingBottom: 20,
		borderRadius: 12
	},
	monthlyRevText: {
		color: "#525252",
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: 18
	},
	monthlyRevTextBottom: {
		color: "#525252",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: 18,
		marginTop: 10
	},
	monthIncomeInputStyle: {
		height: 55,
		width: "80%",
		borderColor: "#E6F2F2",
		borderBottomWidth: 2,
		textAlign: "center",
		color: "#002D2D",
		fontFamily: "Inter-Regular",
		fontSize: 32,
		fontStyle: "normal",
		fontWeight: "500",
		lineHeight: 27,
		letterSpacing: -0.09,
		marginTop: 25
	},
	bottomSection: {
		width: "100%",
		paddingBottom: 20,
		paddingTop: 20,
		marginTop: 20
	},
	bottomContent: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		height: 50,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 60
	},
	regLink: {
		fontFamily: "Inter-Regular",
		color: "#525252",
		fontSize: 16,
		fontWeight: "300"
	},
	RegTextLink: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "300",
		color: "#1DB954",
		textDecorationLine: "underline",
		marginLeft: 6
	}
})
