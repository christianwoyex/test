import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import LoanHeader from "../../components/Loan/Header"

import BusinessAdressForm from "../../components/Account/forms/BusinessAdress"
import { SafeAreaView } from "react-native-safe-area-context"
import BusinessDocsForm from "../../components/Account/forms/BusinessDocs"

const BusinessDocsScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Business Document" />
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<BusinessDocsForm navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default BusinessDocsScreen

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
