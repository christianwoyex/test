import React, { useCallback, useMemo, useRef } from "react"
import { View, Text, StyleSheet } from "react-native"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"

import { IconStartupLoan, IconOtherLoan } from "../../../assets/icons"
import LoanScreen from "../../screens/LoanScreen"
import RequestLoanTypeButton from "../Home/LoanRequestButtonBottomSheet"

const TailorLoanBottomSheetLoan = ({ navigation }) => {
	// ref
	const bottomSheetRef = useRef()

	// variables
	const snapPoint = useMemo(() => ["45%", "50%"], [])

	// callbacks
	const handleSheetChanges = useCallback(index => {
		if (index < 1) {
			navigation.push("LoanScreen")
		}
	}, [])

	// renders
	return (
		<View style={styles.container}>
			<LoanScreen navigation={navigation} />
			<BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoint} enablePanDownToClose={true} onChange={handleSheetChanges}>
				<BottomSheetView>
					<View style={styles.contentContainer}>
						<Text style={styles.loanTypeLabel}>Loan Packages</Text>
						<RequestLoanTypeButton onPress={() => navigation.navigate("EstimateScreen")} title="Startup Loan" icon={<IconStartupLoan />} />
						<RequestLoanTypeButton title="SBA Loan" icon={<IconOtherLoan />} />
						<RequestLoanTypeButton title="Micro Loan" icon={<IconOtherLoan />} />
					</View>
				</BottomSheetView>
			</BottomSheet>
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
		paddingRight: 15,
		paddingLeft: 15,
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

export default TailorLoanBottomSheetLoan
