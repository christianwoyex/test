import { Animated, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import { useScrollToTop } from "@react-navigation/native"
import React, { useState } from "react"
import LoanOffer from "../../components/Loan/LoanOffer"
import { SafeAreaView } from "react-native-safe-area-context"
import EstimateHeader from "../../components/Loan/LoanFlow/EstimateHeader"
import offerStore from "../../mobx/LoanOfferStore"
import { useQueryClient } from "@tanstack/react-query"

const LoanOfferScreen = ({ navigation }) => {
	const [ref, setRef] = useState(null)

	const queryClient = useQueryClient()

	const onRefresh = async () => {
		await offerStore.getLoanOffersRefresh()
		queryClient.invalidateQueries({ queryKey: ["offers"] })
	}

	// const handleScrollToTop = () => {
	// 	// useScrollToTop(
	// 	// 	React.useRef({
	// 	// 	  scrollToTop: () => ref.current?.scrollTo({ y: 100 }),
	// 	// 	})
	// 	//   );
	// useScrollToTop(scrollRef)
	// }

	const scrollHandler = async () => {
		ref.scrollTo({
			x: 0,
			y: 0,
			animated: true
		})
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
				<EstimateHeader navigation={navigation} />
			</View>
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl progressViewOffset={-50} enabled={true} colors={["#008080"]} refreshing={offerStore.refreshingOffers} onRefresh={onRefresh} />}
				ref={ref => {
					setRef(ref)
				}}
				style={{ flex: 1 }}
			>
				<LoanOffer onScrollTop={() => scrollHandler()} navigation={navigation} />
			</Animated.ScrollView>
		</SafeAreaView>
	)
}

export default LoanOfferScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5"
	}
})
