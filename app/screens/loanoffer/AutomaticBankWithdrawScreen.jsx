import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import LoanDetailsOffer from "../../components/Loan/LoanDetails"
import { SafeAreaView } from "react-native-safe-area-context"
import EstimateHeader from "../../components/Loan/LoanFlow/EstimateHeader"

const AutomaticBankWithdrawScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
				<EstimateHeader />
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text>Opt for ease and punctuality in payments! Authorize automatic electronic withdrawals for a hassle-free, on-time repayment experience. Provide your bank details, and we'll take care of the rest."</Text>
			</ScrollView>
		</SafeAreaView>
	)
}

export default AutomaticBankWithdrawScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5"
	}
})