import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import LoanHeader from "../../components/Loan/Header"

import BusinessAdressForm from "../../components/Account/forms/BusinessAdress"
import { SafeAreaView } from "react-native-safe-area-context"
import BusinessOrganizationForm from "../../components/Account/forms/BusinessOrganization"

const BusinessOrganizationScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Business Organization" />
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<BusinessOrganizationForm navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default BusinessOrganizationScreen

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
