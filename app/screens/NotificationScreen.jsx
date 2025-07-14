import { RefreshControl, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import NotificationComp from "../components/Notification"
import { useQueryClient } from "@tanstack/react-query"
import offerStore from "../mobx/LoanOfferStore"
import { observer } from "mobx-react"
// import Animated from "react-native-reanimated"
// import LoanHeader from "../components/Loan/Header"

const NotificationScreen = ({ navigation }) => {
	const [ref, setRef] = useState(null)
	const queryClient = useQueryClient()

	const onRefresh = async () => {
		await offerStore.getLoanOffersRefresh()
		queryClient.invalidateQueries({ queryKey: ["offers"] })
	}

	const scrollHandler = async () => {
		ref.scrollTo({
			x: 0,
			y: 0,
			animated: true
		})
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* <AccountHeader navigation={navigation} /> */}
			{/* <Animated.ScrollView
				refreshControl={<RefreshControl enabled={true} colors={["#008080"]} refreshing={offerStore.refreshingOffers} onRefresh={onRefresh} />}
				ref={ref => {
					setRef(ref)
				}}
				showsVerticalScrollIndicator={false}
			>
				<View
					style={{ width: "100%" }}
					onLayout={event => {
						const layout = event?.nativeEvent?.layout
					}}
				>
					<LoanHeader navigation={navigation} title="Notifications" />
					<NotificationComp navigation={navigation} onScrollTop={scrollHandler} />
				</View>
			</Animated.ScrollView> */}
		</SafeAreaView>
	)
}

export default observer(NotificationScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9F9F9"
	}
})
