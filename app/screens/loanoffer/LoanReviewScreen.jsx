import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import EstimateHeader from "../../components/Loan/LoanFlow/EstimateHeader"
import LoanReview from "../../components/Loan/LoanReview"

const LoanReviewScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: "100%", paddingHorizontal: 20, backgroundColor: "transparent" }}>
				<EstimateHeader noti={false} navigation={navigation} />
			</View>
			<ScrollView style={{ backgroundColor: "#F5F5F5", flex: 1 }} showsVerticalScrollIndicator={false}>
				<LoanReview navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default LoanReviewScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5"
	}
})
