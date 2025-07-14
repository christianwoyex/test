import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import Repaymentheader from "../components/Repayment/Repaymentheader"
import DueRepayment from "../components/Repayment/DueRepayment"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import repaymentStore from "../mobx/RepaymentStore"

const LoanDueRepaymentScreen = ({ navigation }) => {
	const queryClient = useQueryClient()
	const { isPending: loading, data: repayments } = useQuery({
		queryKey: ["repayments"],
		queryFn: repaymentStore.getUserRepayments
	})

	const onRefresh = async () => {
		await repaymentStore.getUserRepaymentsPulltoRefresh()
		queryClient.invalidateQueries({ queryKey: ["repayments"] })
	}
	return (
		<SafeAreaView style={styles.container}>
			<Repaymentheader navigation={navigation} text={false} backButton={true} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl progressViewOffset={-50} enabled={true} colors={["#008080"]} refreshing={repaymentStore.refreshing} onRefresh={onRefresh} />}
				style={{ flex: 1 }}
			>
				<DueRepayment navigation={navigation} repayment={repayments} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default LoanDueRepaymentScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
