import { StyleSheet } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import LoanHeader from "../components/Loan/Header"
import LoanHomeComponent from "../components/Loan"

const LoanScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} />
			<LoanHomeComponent navigation={navigation} />
		</SafeAreaView>
	)
}

export default LoanScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
