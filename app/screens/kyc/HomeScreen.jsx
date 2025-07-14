import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { observer } from "mobx-react"
import HeaderHome from "../../components/Home/Header"
import HomeComponent from "../../components/Home/HomeComponent"
import SplashScreenUi from "../SplashScreen"
import { SafeAreaView } from "react-native-safe-area-context"
import { useQuery } from "@tanstack/react-query"
import loanStore from "../../mobx/LoanStore"
import authStore from "../../mobx/AuthStore"
import profileStore from "../../mobx/profileStore"
import offerStore from "../../mobx/LoanOfferStore"

const HomeScreenKyc = ({ navigation }) => {
	const { isPending, error, data, refetch } = useQuery({
		queryKey: ["loantypes"],
		queryFn: loanStore.getLoanTypes
	})
	const { isPending: loading } = useQuery({
		queryKey: ["loans"],
		queryFn: loanStore.getUserLoans
	})
	const { isPending: loadingBusiness } = useQuery({
		queryKey: ["business"],
		queryFn: profileStore.getBusinessDetails
	})
	const { isPending: loanoffer } = useQuery({
		queryKey: ["offers"],
		queryFn: offerStore.getLoanOffers
	})
	const {
		isPending: isPendingUser,
		error: errUser,
		data: userData,
		refetch: refetchUser
	} = useQuery({
		queryKey: ["user"],
		queryFn: authStore.getLoggedInUser
	})
	const { isPending: loadingBanks } = useQuery({
		queryKey: ["banks"],
		queryFn: loanStore.callBanksRecursive
	})

	if (isPendingUser) return <SplashScreenUi />
	return (
		<SafeAreaView style={styles.container}>
			<HeaderHome navigation={navigation} />
			<HomeComponent navigation={navigation} />
		</SafeAreaView>
	)
}

export default observer(HomeScreenKyc)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f2f5f5"
	}
})
