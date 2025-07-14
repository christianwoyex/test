import { ScrollView, StyleSheet } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import EstimateHeader from "../../components/Loan/LoanFlow/EstimateHeader"
import LoanAppFormOne from "../../components/Loan/LoanFlow/LoanAppFormOne"
import LoanAppFormTwo from "../../components/Loan/LoanFlow/LoanAppFormTwo"
import LoanApplicationSummary from "../../components/Loan/LoanFlow/LoanApplicationSummary"

const LoanSelectionScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<EstimateHeader navigation={navigation} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<LoanAppFormOne navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default LoanSelectionScreen

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
		paddingRight: 20,
		paddingLeft: 20,
		backgroundColor: "#F9F9F9"
	}
})
