import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import LoanHeader from "../components/Loan/Header"
import EquityFinancing from "../components/Loan/EquityFinancing"

const EquityFinancingScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} />
			<EquityFinancing navigation={navigation} />
		</SafeAreaView>
	)
}

export default EquityFinancingScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
