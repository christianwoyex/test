import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import LoanDetailsOffer from "../../components/Loan/LoanDetails"
import { SafeAreaView } from "react-native-safe-area-context"
import EstimateHeader from "../../components/Loan/LoanFlow/EstimateHeader"

const RecurringCardPaymentScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
				<EstimateHeader />
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text>Simplify your repayment experience! Choose the convenience of automatic electronic withdrawals by authorizing recurring credit or debit card payments. We securely process these payments on scheduled dates for your peace of mind."</Text>
			</ScrollView>
		</SafeAreaView>
	)
}

export default RecurringCardPaymentScreen