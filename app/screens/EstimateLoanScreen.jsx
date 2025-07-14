import { Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import EstimateHeader from "../components/Loan/LoanFlow/EstimateHeader"
import { SafeAreaView } from "react-native-safe-area-context"
import SkipEstimate from "../components/Loan/LoanFlow/SkipEstimate"
import GetEstimateOne from "../components/Loan/LoanFlow/GetEstimateOne"
import GetEstimateTwo from "../components/Loan/LoanFlow/GetEstimateTwo"

const EstimateLoanScreen = ({ navigation }) => {
	const [currentPage, setCurrentPage] = useState(0)
	const handleEstimateSubmit = () => {
		setCurrentPage(1)
	}
	const handleNoneExistingBizSubmit = () => {
		navigation.navigate("LoanSelectionScreen")
	}
	return (
		<SafeAreaView style={styles.container}>
			<EstimateHeader navigation={navigation} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<SkipEstimate currentPage={currentPage} />
				{currentPage === 0 ? <GetEstimateOne onEstimePress={() => handleEstimateSubmit()} onPressNone={handleNoneExistingBizSubmit} /> : <GetEstimateTwo />}
			</ScrollView>
		</SafeAreaView>
	)
}

export default EstimateLoanScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingRight: 20,
		paddingLeft: 20,
		backgroundColor: "#f5f6f7"
	}
})
