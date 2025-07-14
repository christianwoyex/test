import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native"
import React from "react"
import EstimateHeader from "../../components/Loan/LoanFlow/EstimateHeader"
import { useQueryClient } from "@tanstack/react-query"
import { observer } from "mobx-react"
import FilteredLoans from "../../components/Loan/FilteredLoans"
import loanStore from "../../mobx/LoanStore"

const FilterApplicationScreen = ({ navigation }) => {
	const queryClient = useQueryClient()

	const onRefresh = async () => {
		await loanStore.getFilteredLoansRefresh()
		queryClient.invalidateQueries({ queryKey: ["filter"] })
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
				<EstimateHeader navigation={navigation} />
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl progressViewOffset={-50} enabled={true} colors={["#008080"]} refreshing={loanStore.refreshingFilter} onRefresh={onRefresh} />}
				style={{ flex: 1 }}
			>
				<FilteredLoans navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default observer(FilterApplicationScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5"
	}
})
