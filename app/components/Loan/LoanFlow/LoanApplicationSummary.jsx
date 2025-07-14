import { observer } from "mobx-react"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import AppColors from "../../../config/colors"
import CustomPrimaryButton from "../../common/PrimaryButton"
import { IconDateGreen } from "../../../../assets/icons"
import AppDivider from "../../common/Divider"
import loanStore from "../../../mobx/LoanStore"
import { formatThousand } from "../../common/formatPhoneNumber"
import { monthsToDays, weeksToDays } from "../../common/calDays"
import SuccessModal from "../../common/SuccessMainScreen"
import LoadingModal from "../../common/LoadingScreen"
import ErrorModal from "../../common/ErrorScreen"
import ErrorKycScreenModal from "../../common/ErrorKycScreen"

const LoanApplicationSummary = ({ navigation }) => {
	const handleSubmitLoanRequest = async () => {
		let payload = {}
		payload.loanType = loanStore?.selectedLoanType?.id
		payload.duration = loanStore.repaymentPeriodValue
		payload.amount = loanStore.currentValue
		payload.purpose = loanStore.purpose.trim()
		payload.paymentFrequency = loanStore?.repaymentFreq.toLocaleLowerCase()
		const response = await loanStore.appyLoan(payload)

		if (response) {
		}
	}

	const handleClearError = () => {
		loanStore.clearApplyError()
	}
	const handleClearKycError = () => {
		loanStore.clearApplyErrorKyc()
	}
	const handleClearSuccess = () => {
		loanStore.clearApplySuccess()
		loanStore?.clearAppyFields()
		navigation.navigate("HomeScreen")
	}
	return (
		<View>
			<View>
				{loanStore.applyloading && <LoadingModal modalVisible={loanStore.applyloading} />}
				{loanStore.applyerror && <ErrorModal modalVisible={loanStore.applyerror} error={loanStore.msgError} onRequestClose={handleClearError} />}
				{loanStore.applyerrorkyc && <ErrorKycScreenModal modalVisible={loanStore.applyerrorkyc} error={loanStore.msgError} onRequestClose={handleClearKycError} navigation={navigation} />}
				{loanStore.applysuccess && <SuccessModal headerTitle="Congratulations!" modalVisible={loanStore.applysuccess} message={loanStore.msgSuccess} onRequestClose={handleClearSuccess} />}
			</View>
			<Text style={styles.headTextStyles}>Loan Details</Text>
			<View>
				<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<View>
						<Text style={styles.titleTextStyle}>Loan/ Credit Facility</Text>
						<Text style={styles.valueText}>{loanStore?.selectedLoanType?.name}</Text>
					</View>
					<TouchableOpacity
						activeOpacity={0.9}
						style={{
							display: "flex",
							borderRadius: 10,
							justifyContent: "center",
							alignItems: "center",
							width: 50,
							height: 25,
							backgroundColor: "#B5F3D6"
						}}
						onPress={() => navigation.navigate("LoanSelectionScreen")}
						title={"Login"}
					>
						<Text style={{ color: AppColors.btngrey, fontFamily: "Inter-Regular", fontSize: 12, fontWeight: "bold" }}>Edit</Text>
					</TouchableOpacity>
				</View>

				<View style={{ marginTop: 20 }}>
					<Text style={styles.titleTextStyle}>Loan amount</Text>
					<Text style={styles.largeValueStyle}>{formatThousand(loanStore.currentValue)}</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text style={styles.titleTextStyle}>Payment Tenure</Text>
					<Text style={styles.loanTenureValue}>
						{loanStore?.repaymentFreq === "Weekly" ? weeksToDays(loanStore.repaymentPeriodValue).toFixed(0) : monthsToDays(loanStore.repaymentPeriodValue).toFixed(0)} days
					</Text>
				</View>
			</View>

			<View style={{ marginTop: 20 }}>
				<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<Text style={styles.titleTextStyle}>Loan Purpose</Text>
					<TouchableOpacity
						activeOpacity={0.9}
						style={{
							display: "flex",
							borderRadius: 10,
							justifyContent: "center",
							alignItems: "center",
							width: 50,
							height: 25,
							backgroundColor: "#B5F3D6"
						}}
						onPress={() => navigation.navigate("ApplyLoanFormTwo")}
						title={"Login"}
					>
						<Text style={{ color: AppColors.btngrey, fontFamily: "Inter-Regular", fontSize: 12, fontWeight: "bold" }}>Edit</Text>
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 10 }}>
					<Text>{loanStore?.purpose}</Text>
				</View>
			</View>
			<View style={{ marginTop: 30, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
				<View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
					<IconDateGreen />
					<View>
						<Text style={styles.titleTextStyle}>Payment schedule</Text>
						<Text style={styles.largeValueStyle}>{loanStore?.repaymentFreq === "Weekly" ? "Weekly" : "Monthly"}</Text>
					</View>
				</View>
				<TouchableOpacity
					activeOpacity={0.9}
					style={{
						display: "flex",
						borderRadius: 10,
						justifyContent: "center",
						alignItems: "center",
						width: 50,
						height: 25,
						backgroundColor: "#B5F3D6"
					}}
					onPress={() => navigation.navigate("ApplyLoanFormTwo")}
					title={"Login"}
				>
					<Text style={{ color: AppColors.btngrey, fontFamily: "Inter-Regular", fontSize: 12, fontWeight: "bold" }}>Edit</Text>
				</TouchableOpacity>
			</View>
			<View style={{ marginTop: 20 }}>
				<Text>Possible Loan Terms </Text>
				<View style={{ marginTop: 10, paddingVertical: 15 }}>
					<Text style={styles.titleTextStyle}>Interest Rate</Text>
					<Text style={[styles.loanTenureValue, { color: "#bfbebb" }]}>3.5% up to 6%</Text>
				</View>
				<AppDivider />
				<View style={{ paddingVertical: 15 }}>
					<Text style={styles.titleTextStyle}>Security Deposit</Text>
					<Text style={[styles.loanTenureValue, { color: "#bfbebb" }]}>{`Up to ${loanStore?.selectedLoanType?.security_deposit}%`}</Text>
				</View>
				<AppDivider />
				<View style={{ paddingVertical: 15 }}>
					<Text style={styles.titleTextStyle}>Insurance Fee</Text>
					<Text style={[styles.loanTenureValue, { color: "#bfbebb" }]}>{`Up to ${loanStore?.selectedLoanType?.insurance_fee}%`}</Text>
				</View>
				<AppDivider />
				<View style={{ paddingVertical: 15 }}>
					<Text style={styles.titleTextStyle}>Processing fee</Text>
					<Text style={[styles.loanTenureValue, { color: "#bfbebb" }]}>{`Up to ${loanStore?.selectedLoanType?.processing_fee}%`}</Text>
				</View>
			</View>
			<View style={{ marginTop: 30, marginBottom: 50 }}>
				<CustomPrimaryButton title={"Send Request"} onPress={handleSubmitLoanRequest} />
			</View>
		</View>
	)
}

export default observer(LoanApplicationSummary)

const styles = StyleSheet.create({
	headTextStyles: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 25,
		lineHeight: 44,
		letterSpacing: -0.09,
		color: "#001F3F",
		marginTop: 20,
		marginBottom: 20
	},
	titleTextStyle: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "300",
		fontSize: 12,
		lineHeight: 19,
		color: "#525252"
	},
	valueText: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 16,
		lineHeight: 19,
		color: "#343232"
	},
	largeValueStyle: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: 20,
		lineHeight: 30,
		letterSpacing: -0.09,
		color: "#002D2D"
	},
	loanTenureValue: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: 16,
		lineHeight: 22,
		color: "#000000"
	},
	loanPurposeValue: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 16,
		lineHeight: 22,
		color: "#404040"
	}
})
