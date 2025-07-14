import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import LoanHeader from "../../components/Loan/Header"

import BusinessAdressForm from "../../components/Account/forms/BusinessAdress"
import { SafeAreaView } from "react-native-safe-area-context"
import AddAccountMannualForm from "../../components/Account/forms/AddAccountMannual"

const AddAccountManuallyScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Link Bank Account" />
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<AddAccountMannualForm navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default AddAccountManuallyScreen

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
