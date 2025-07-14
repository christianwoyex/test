import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native"
import React from "react"
import EstimateHeader from "../../components/Loan/LoanFlow/EstimateHeader"
import LoanStatus from "../../components/Loan/LoanStatus"
import offerStore from "../../mobx/LoanOfferStore"
import { useQueryClient } from "@tanstack/react-query"
import { observer } from "mobx-react"

const LoanStatusScreen = ({ navigation }) => {
	const queryClient = useQueryClient()

	const onRefresh = async () => {
		await offerStore.getLoanOffersRefresh()
		queryClient.invalidateQueries({ queryKey: ["offers"] })
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
				<EstimateHeader navigation={navigation} />
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl progressViewOffset={-50} enabled={true} colors={["#008080"]} refreshing={offerStore.refreshingOffers} onRefresh={onRefresh} />}
				style={{ flex: 1 }}
			>
				<LoanStatus navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default observer(LoanStatusScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5"
	}
})
