import React, { useCallback, useMemo, useRef } from "react"
import { View, Text, StyleSheet, Modal } from "react-native"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import HomeScreenKyc from "../../screens/kyc/HomeScreen"
import RequestLoanTypeButton from "./LoanRequestButtonBottomSheet"
import { IconStartupLoan, IconOtherLoan } from "../../../assets/icons"
import loanStore from "../../mobx/LoanStore"
import { observer } from "mobx-react"

const TailorLoanBottomSheet = ({ navigation, loanTypes = [], onClose }) => {
	const handleViewTailoredLoanTypeDetails = loanProduct => {
		onClose()
		loanStore.setSelectLoanTypeDetails(loanProduct)
		navigation.push("EquityScreen")
	}
	return (
		<View style={styles.contentContainer}>
			<Text style={styles.loanTypeLabel}>Loan Packages</Text>
			{loanTypes?.map(type => (
				<RequestLoanTypeButton
					onPress={() => handleViewTailoredLoanTypeDetails(type)}
					key={type?.id}
					title={type?.name}
					icon={type?.name.includes("Start") ? <IconStartupLoan /> : <IconOtherLoan />}
				/>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		zIndex: 20000,
		// position: "absolute",
		backgroundColor: "rgba(0,0,0, 0.5)"
	},
	contentContainer: {
		width: "100%",
		justifyContent: "center",
		// alignItems: "center",
		paddingHorizontal: 20,
		marginTop: 30
	},
	loanTypeLabel: {
		color: "#001F3F",
		fontFamily: "Inter-Regular",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "400",
		marginBottom: 10
	}
})

export default observer(TailorLoanBottomSheet)
