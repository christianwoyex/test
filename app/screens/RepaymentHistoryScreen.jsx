import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import Repaymentheader from "../components/Repayment/Repaymentheader"
import RepaymentHistory from "../components/Repayment/RepaymentHistory"

const RepaymentHistoryScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Repaymentheader navigation={navigation} text={false} backButton={true} />
			<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
				<RepaymentHistory />
			</ScrollView>
		</SafeAreaView>
	)
}

export default RepaymentHistoryScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
