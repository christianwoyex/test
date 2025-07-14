import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { observer } from "mobx-react"
import { IconMAddMonths, IconMinusMonths } from "../../../../assets/icons"
import loanStore from "../../../mobx/LoanStore"
import CustomPrimaryButtonWithDisble from "../../common/CustomPrimaryBtnWithDisable"

const LoanAppFormTwo = ({ navigation }) => {
	const [periodIndex, setPeriodIndex] = useState(0)

	const loanAppSchema = yup.object().shape({
		purpose: yup.string().required("Purpose of loan is required").min(10).max(250).label("Purpose of Loan")
	})
	const formik = useFormik({
		enableReinitialize: true,
		validateOnChange: true,
		initialValues: {
			purpose: loanStore?.purpose ? loanStore?.purpose : ""
		},
		onSubmit: async values => {
			let payload = { ...values }
			payload.loanType = loanStore?.selectedLoanType?.id
			payload.duration = loanStore.repaymentPeriodValue
			payload.amount = loanStore.currentValue
			payload.purpose = payload.purpose.trim()
			payload.paymentFrequency = loanStore?.repaymentFreq.trim().toLocaleLowerCase()
			loanStore?.setLoanPurpose(payload.purpose.trim())
			navigation.navigate("ApplicationSummary")
		},
		validationSchema: loanAppSchema
	})

	function handleSelectRepPeriod() {
		if (loanStore.repaymentPeriodValue <= 1) return

		loanStore.setRepaymentPeriodValue(loanStore.repaymentPeriodValue - 1)
	}
	function handleSelectRepPeriodAdd() {
		if (loanStore.repaymentPeriodValue >= loanStore.maxRepaymentPeriodValue) return

		loanStore.setRepaymentPeriodValue(loanStore.repaymentPeriodValue + 1)
	}

	return (
		<View style={styles.container}>
			<View style={styles.cardStyles}>
				<View style={{ marginTop: 0, marginBottom: 0 }}>
					<TextInput
						name="purpose"
						placeholder="Loan Purpose"
						value={formik.values.purpose}
						multiline={true}
						numberOfLines={5}
						keyboardType={Platform.OS == "ios" ? "default" : "default"}
						onChangeText={formik.handleChange("purpose")}
						onBlur={formik.handleBlur("purpose")}
						style={{
							alignItems: "center",
							height: "100%",
							width: "100%",
							paddingHorizontal: 15,
							paddingVertical: 10,
							backgroundColor: "#FFFFFF",
							borderRadius: 14,
							fontSize: 16,
							textAlignVertical: "top"
						}}
					/>
					{formik.touched.purpose && formik.touched.purpose && <Text style={{ fontFamily: "Inter-Regular", fontSize: 13, color: "red" }}>{formik.errors.purpose}</Text>}
				</View>
			</View>

			<View style={styles.RepaytenurecardStyles}>
				<View style={{ marginTop: 30, marginBottom: 10 }}>
					<Text style={styles.borrowTextStyle}>And repay over...</Text>
				</View>
				<View style={{ display: "flex", flexDirection: "row", gap: 40, alignItems: "center", justifyContent: "center" }}>
					<TouchableOpacity activeOpacity={0.9} onPress={() => handleSelectRepPeriod()}>
						<IconMinusMonths />
					</TouchableOpacity>
					<View style={{ width: "20%" }}>
						<Text style={styles.amountText}>{loanStore.repaymentPeriodValue}</Text>
					</View>
					<TouchableOpacity activeOpacity={0.9} onPress={() => handleSelectRepPeriodAdd()}>
						<IconMAddMonths />
					</TouchableOpacity>
				</View>
				<View style={{ width: "100%", height: 50 }}>
					<Text style={styles.borrowTextStyle}>{loanStore?.repaymentFreq === "Weekly" ? "Weeks" : "Months"}</Text>
				</View>
			</View>
			<View style={{ width: "100%" }}>
				<CustomPrimaryButtonWithDisble title={"Continue"} onPress={formik.handleSubmit} />
			</View>
		</View>
	)
}

export default observer(LoanAppFormTwo)

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
		marginBottom: 60
	},
	borrowTextStyle: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 16,
		lineHeight: 19,
		textAlign: "center",
		color: "#525252"
	},
	cardStyles: {
		flex: 1,
		width: "100%",
		justifyContent: "space-between",
		height: 220,
		marginTop: 40,
		backgroundColor: "#FFFFFF",
		borderRadius: 14
	},
	keypadBtn: {
		width: "100%",
		height: 56,
		borderWidth: 1,
		borderColor: "#F1F1F1",
		borderBottomLeftRadius: 18,
		borderBottomRightRadius: 18,
		alignItems: "center",
		justifyContent: "center",
		justifySelf: "flex-end",
		marginTop: 10
		// border: "1px solid #F1F1F1",
		// borderRadius: "0px 0px 18px 18px"
	},
	minMaxTextStyle: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 13,
		lineHeight: 19,
		color: "#9C9C9C"
	},
	amountText: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 25,
		lineHeight: 44,
		letterSpacing: -0.9,
		color: "#002D2D",
		textAlign: "center"
	},
	openkeypadText: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 14,
		lineHeight: 19,
		color: "#008080"
	},
	RepaytenurecardStyles: {
		flex: 1,
		width: "100%",
		justifyContent: "space-between",
		height: 170,
		marginTop: 40,
		marginBottom: 40,
		backgroundColor: "#FFFFFF",
		borderRadius: 14
	}
})
