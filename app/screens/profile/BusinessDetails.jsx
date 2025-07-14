import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import LoanHeader from "../../components/Loan/Header"
import { SafeAreaView } from "react-native-safe-area-context"
import BusinessDetailsForm from "../../components/Account/forms/BusinessDetails"

const BusinessDetailsScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Business Details" />
			<ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
				<BusinessDetailsForm navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default BusinessDetailsScreen

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
