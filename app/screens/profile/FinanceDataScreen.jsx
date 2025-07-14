import { StyleSheet } from "react-native"
import React from "react"

import { SafeAreaView } from "react-native-safe-area-context"
import AccountHeader from "../../components/Account/AccountHeader"
import FinancialDataPage from "../../components/Account/pages/FinancialDataPage"

const FinanceDataScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<AccountHeader navigation={navigation} />
			<FinancialDataPage navigation={navigation} />
		</SafeAreaView>
	)
}

export default FinanceDataScreen
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	}
})
