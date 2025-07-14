import { StyleSheet, Text, BackHandler, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import Slider from "@react-native-community/slider"

import { IconMAddMonths, IconMinusMonths, IconSliderTrackDragg, IconSlideThumb } from "../../../../assets/icons"
import { IconBackRep, IconForwardRep } from "../../../../assets/icons"
import CustomSelectInputMask from "../../common/CustomSelectInputMask"
import SelectLoanTypesModal from "../../common/LoanTypesModal"
import loanStore from "../../../mobx/LoanStore"
import CustomPrimaryButtonWithDisble from "../../common/CustomPrimaryBtnWithDisable"
import TypeInAmountModal from "../typeAmountModal"
import { useQuery } from "@tanstack/react-query"
import { formatThousand } from "../../common/formatPhoneNumber"

const LoanAppFormOne = ({ navigation }) => {
	const [periodIndex, setPeriodIndex] = useState(0)
	const toggleValues = ["Weekly", "Monthly"]

	const backAction = () => {
		loanStore.setSelectLoan()
	}
	const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
	backHandler.remove()

	const handleContinue = () => {
		if (!loanStore?.selectedLoanType?.name) {
			loanStore.setPickerError("Please select loan type")
			return
		}
		loanStore.setRepayFreq(toggleValues[periodIndex])
		navigation.navigate("ApplyLoanFormTwo")
	}
	function handleSelectRepPeriod() {
		setPeriodIndex(0)
		// formik.setFieldValue("paymentFrequency", toggleValues[0], true)
		loanStore.setRepayFreq(toggleValues[0])
	}
	function handleSelectRepPeriodAdd() {
		setPeriodIndex(1)
		loanStore.setRepayFreq(toggleValues[1])
	}
	const { isPending: acountInfo } = useQuery({
		queryKey: ["select-type-details"],
		queryFn: loanStore.getLoanTypesDetailsMain
	})
	useEffect(() => {
		let newsa = loanStore?.repaymentFreq ? loanStore?.repaymentFreq : loanStore.setRepayFreq(toggleValues[periodIndex])
	}, [])
	return (
		<View style={styles.container}>
			<View style={{ marginTop: 20 }}>
				<CustomSelectInputMask
					label=""
					error={loanStore.pickerError}
					value={loanStore?.selectedLoanType?.name}
					onPress={() => loanStore.setSelectLoan()}
					placeholder="Select Loan Type---"
					hideIcon={true}
				/>
				<SelectLoanTypesModal modalVisible={loanStore.selectLoan} onRequestClose={() => loanStore.setSelectLoan()} />
			</View>
			<View></View>
			<View style={styles.cardStyles}>
				<View style={{ marginTop: 30, marginBottom: 20 }}>
					<Text style={styles.borrowTextStyle}>I want to borrow</Text>
				</View>
				<View style={{ marginBottom: 20 }}>
					<Text style={styles.amountText}>N{loanStore.currentValue.toLocaleString()}</Text>
				</View>
				<Slider
					style={styles.slider}
					thumbTintColor="#1DB954"
					value={loanStore.currentValue}
					step={100}
					tapToSeek
					onValueChange={value => loanStore.setCurrentValue(Math.abs(Number(value)))}
					thumbImage={require('../../../../assets/images/sider.png')}
					
					minimumValue={Number(loanStore.minMax.minimum_amount)}
					maximumValue={Number(loanStore.minMax.maximum_amount)}
					minimumTrackTintColor="#1DB954"
					maximumTrackTintColor="#D9D9D9"
				/>
				<View style={{ paddingHorizontal: 10, width: "100%", marginTop: 0, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<Text style={styles.minMaxTextStyle}>N{formatThousand(loanStore.minMax.minimum_amount)}</Text>
					<Text style={styles.minMaxTextStyle}>N{formatThousand(loanStore.minMax.maximum_amount)}</Text>
				</View>
				{loanStore.openkeypad && <TypeInAmountModal modalView={loanStore.openkeypad} />}
				<TouchableOpacity activeOpacity={0.9} disabled={loanStore?.selectedLoanType?.name ? false : true} onPress={() => loanStore.toggleOpenKeypad()} style={styles.keypadBtn}>
					<Text style={styles.openkeypadText}>Open Keypad</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.RepaytenurecardStyles}>
				<View style={{ marginTop: 30, marginBottom: 10 }}>
					<Text style={styles.borrowTextStyle}>To repay</Text>
				</View>
				<View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
					<TouchableOpacity activeOpacity={0.9} disabled={periodIndex === 0} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }} onPress={() => handleSelectRepPeriod()}>
						<IconBackRep />
					</TouchableOpacity>
					<View style={{ width: 180 }}>
						<Text style={styles.amountText}>{toggleValues[periodIndex]}</Text>
					</View>
					<TouchableOpacity
						activeOpacity={0.9}
						disabled={periodIndex === 1}
						style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
						onPress={() => handleSelectRepPeriodAdd()}
					>
						<IconForwardRep />
					</TouchableOpacity>
				</View>
				<View style={{ width: "100%", height: 50 }}>
					<Text style={styles.borrowTextStyle}>Not Sure</Text>
				</View>
			</View>

			<CustomPrimaryButtonWithDisble disabled={!loanStore?.selectedLoanType?.name} title={"Continue"} onPress={() => handleContinue()} />
		</View>
	)
}

export default observer(LoanAppFormOne)

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
		fontSize: 13,
		lineHeight: 19,
		textAlign: "center",
		color: "#525252"
	},
	cardStyles: {
		flex: 1,
		width: "100%",
		justifyContent: "space-between",
		height: 290,
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
		fontSize: 36,
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
		height: 250,
		marginTop: 40,
		marginBottom: 40,
		backgroundColor: "#FFFFFF",
		borderRadius: 14
	},
	slider: {
		width: "100%",
		height: 40, // Increase height to make track more visible
	  },
})
