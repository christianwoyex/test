import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import RepaymentHome from "../components/Repayment"
import Repaymentheader from "../components/Repayment/Repaymentheader"

const RepaymentScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Repaymentheader navigation={navigation} />
			<RepaymentHome navigation={navigation} />
		</SafeAreaView>
	)
}

export default RepaymentScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
