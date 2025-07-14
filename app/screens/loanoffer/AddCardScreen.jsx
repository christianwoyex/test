import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import EstimateHeader from "../../components/Loan/LoanFlow/EstimateHeader"
import AddCard from "../../components/Loan/AddCard"

const AddCardScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
				<EstimateHeader />
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<AddCard />
			</ScrollView>
		</SafeAreaView>
	)
}

export default AddCardScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5"
	}
})
