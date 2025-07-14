import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Repaymentheader from "../components/Repayment/Repaymentheader"
import PledgeSupportComp from "../components/Repayment/PledgeSupport"

const PledgeSupportScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Repaymentheader navigation={navigation} text={false} backButton={true} />
			<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
				<PledgeSupportComp navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default PledgeSupportScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
