import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import EstimateHeader from "../../components/Loan/LoanFlow/EstimateHeader"
import LoanTerm from "../../components/Loan/LoanTerm"

const LoanTermScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: "100%", paddingHorizontal: 20, backgroundColor: "#FFFFFF" }}>
				<EstimateHeader navigation={navigation} />
			</View>
			<ScrollView style={{ backgroundColor: "#F5F5F5", flex: 1 }} showsVerticalScrollIndicator={false}>
				<LoanTerm navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default LoanTermScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
