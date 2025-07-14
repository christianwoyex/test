import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import LoanHeader from "../../components/Loan/Header"

import BusinessAdressForm from "../../components/Account/forms/BusinessAdress"
import { SafeAreaView } from "react-native-safe-area-context"

const BusinessAdressScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Business Address" />
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<BusinessAdressForm navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default BusinessAdressScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9F9F9"
	},
	content: {
		flex: 1,
		paddingHorizontal: 20
	}
})
