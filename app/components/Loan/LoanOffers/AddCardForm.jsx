import { View } from "react-native"
import React from "react"
import CardNumberInput from "../../common/CardNumberInput"
import CustomExpiryDateInput from "../../common/CustomexpirydDateInput"
import CustomPrimaryButton from "../../common/PrimaryButton"
import CustomSecurityCvvInput from "../../common/CustomSecurityCvvInput"

const AddCardForm = () => {
	return (
		<View style={{ marginTop: 20, marginBottom: 40 }}>
			<CardNumberInput label="Card Number" placeholder={"0000 0000 0000 0000"} />
			<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
				<View style={{ width: "48%" }}>
					<CustomExpiryDateInput label="Expiry date" placeholder={"MM/YY"} />
				</View>
				<View style={{ width: "48%" }}>
					<CustomSecurityCvvInput label="Security" />
				</View>
			</View>
			<View style={{ marginTop: 30 }}>
				<CustomPrimaryButton title={"Add Card"} />
			</View>
		</View>
	)
}

export default AddCardForm
