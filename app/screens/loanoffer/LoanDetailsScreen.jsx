import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import LoanDetailsOffer from "../../components/Loan/LoanDetails"
import { SafeAreaView } from "react-native-safe-area-context"
import EstimateHeader from "../../components/Loan/LoanFlow/EstimateHeader"
import { useQueryClient } from "@tanstack/react-query"
import offerStore from "../../mobx/LoanOfferStore"

const LoanDetailsScreen = ({ navigation }) => {
	const onRefresh = async () => {
		await offerStore.getLoanOffersDetailsRefresh()
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
				<EstimateHeader navigation={navigation} />
			</View>
			<ScrollView
				refreshControl={<RefreshControl progressViewOffset={-50} enabled={true} colors={["#008080"]} refreshing={offerStore.refreshing_offer_details} onRefresh={onRefresh} />}
				showsVerticalScrollIndicator={false}
			>
				<LoanDetailsOffer navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default LoanDetailsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5"
	}
})
