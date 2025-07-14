import { Dimensions, ScrollView, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import MorebuttonRepayment from "./Morebutton"
import RepaymentSubText from "./RepaymentSubText"
import { IconYellowLove } from "../../../assets/icons"
import TopCardRepay from "./TopCard"
import NextRepaymentcard from "./NextRepaymentcard"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import repaymentStore from "../../mobx/RepaymentStore"
import { observer } from "mobx-react"
import LoadingModal from "../common/LoadingScreen"
const { width, height } = Dimensions.get("window")
import { formatThousand } from "../common/formatPhoneNumber"
import EmptyRepaymentCard from "./EmptyRepaymentcard"

const RepaymentHome = ({ navigation }) => {
	const queryClient = useQueryClient()
	const {
		isPending: loading,
		isError,
		data: repayments
	} = useQuery({
		queryKey: ["repayments"],
		queryFn: repaymentStore.getUserRepayments
	})

	const onRefresh = async () => {
		await repaymentStore.getUserRepaymentsPulltoRefresh()
		queryClient.invalidateQueries({ queryKey: ["repayments"] })
	}

	return (
		<ScrollView
			refreshControl={<RefreshControl progressViewOffset={-50} enabled={true} colors={["#008080"]} refreshing={repaymentStore.refreshing} onRefresh={onRefresh} />}
			style={styles.container}
			showsVerticalScrollIndicator={false}
		>
			{loading && <LoadingModal modalVisible={loading} />}
			{!loading && !isError && !repayments?.data && (
				<View>
					<EmptyRepaymentCard />
				</View>
			)}
			{!loading && !isError && repayments?.data && (
				<View>
					<TopCardRepay repayemnt={repayments?.data} />

					<View style={styles.contentFlex}>
						<RepaymentSubText title="Next Repayment" />
						<MorebuttonRepayment onPress={() => navigation.push("DueRepaymentScreen")} />
					</View>
					<NextRepaymentcard repayment={repayments?.data} navigation={navigation} />
				</View>
			)}

			<View style={styles.pledgeSupport}>
				<View style={styles.pledgeSupportInner}>
					<View style={styles.pledgeSupportIconBg}>
						<IconYellowLove />
					</View>
					<View style={styles.supportTextDiv}>
						<Text style={styles.textSupport}>Pledge Support </Text>
						<Text style={styles.textSupportDesc}>Join the movement to help other entrepreneur</Text>
					</View>
				</View>
				<TouchableOpacity activeOpacity={0.9} style={styles.pledgeLearBtn} onPress={() => navigation.navigate("PledgeSupportScreen")}>
					<Text style={styles.learnMoreText}>Learn more</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}

export default observer(RepaymentHome)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15
	},

	contentFlex: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20
	},

	pledgeSupport: {
		backgroundColor: "#FEF8EA",
		width: "100%",
		flexDirection: "column",
		height: height / 3.5,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		borderColor: "#FAEBBE",
		borderWidth: 1,
		marginTop: 40,
		marginBottom: 40,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	pledgeSupportInner: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	supportTextDiv: {
		width: "80%",
		marginLeft: 10
	},
	pledgeSupportIconBg: {
		backgroundColor: "#FAE9B8",
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		borderColor: "#FCF0D1",
		borderWidth: 1
	},
	textSupport: {
		color: "#001326",
		fontFamily: "Inter-Regular",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "500"
	},
	textSupportDesc: {
		color: "#001326",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300"
	},
	pledgeLearBtn: {
		backgroundColor: "#FDF4DD",
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 9,
		borderColor: "#FAE9B8",
		borderWidth: 1,
		marginTop: 40
	},
	learnMoreText: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: 14,
		lineHeight: 15,
		color: "#3B3B3B"
	}
})
