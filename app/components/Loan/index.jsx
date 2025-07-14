import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, RefreshControl } from "react-native"
import React, { useCallback, useRef, useState } from "react"
import LoanPackageItem from "./LoanPackageItem"
import { ForwardGreaterThanIcon, IconArrowForward } from "../../../assets/icons"
import AppColors from "../../config/colors"
import CustomBottomSheetModal from "../common/CustomBottomSheetModal"
import TailorLoanBottomSheet from "../Home/TailorLoanPackages"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import loanStore from "../../mobx/LoanStore"
import { observer } from "mobx-react"
import { filterTailoredLoanTypesData, transformDataLoanTypes } from "../common/transformData"
import LoadingModal from "../common/LoadingScreen"
const { width, height } = Dimensions.get("window")

const LoanHomeComponent = ({ navigation }) => {
	const [currentPage, setCurrentPage] = useState(0)
	const queryClient = useQueryClient()
	const handleScroll = event => {
		const { contentOffset } = event.nativeEvent
		const page = Math.round(contentOffset.x / width)
		setCurrentPage(page)
	}
	const flatListLoanRef = React.createRef()
	const tailoredModalRef = useRef(null)

	const handlePresentModalPress = useCallback(() => {
		tailoredModalRef.current?.present()
	}, [])

	const handleCloseModalPress = useCallback(() => {
		tailoredModalRef.current?.close()
	}, [])

	const handleSheetChanges = useCallback(index => {}, [])

	const {
		isPending,
		error,
		isError,
		data: AllLoanTypes,
		refetch
	} = useQuery({
		queryKey: ["loantypes"],
		queryFn: loanStore.getLoanTypes
	})

	const onRefresh = async () => {
		await loanStore.refreshLoanTypes()
		queryClient.invalidateQueries({ queryKey: ["loantypes"] })
	}
	const data = !isPending && AllLoanTypes?.data && AllLoanTypes?.data.length > 0 ? transformDataLoanTypes(AllLoanTypes?.data) : []
	const tailoredLoan = !isPending && AllLoanTypes?.data && AllLoanTypes?.data.length > 0 ? filterTailoredLoanTypesData(AllLoanTypes?.data) : []

	const handleViewLoanTypeDetails = loanProduct => {
		loanStore.setSelectLoanTypeDetails(loanProduct)
		navigation.push("EquityScreen")
	}
	return (
		<ScrollView
			refreshControl={<RefreshControl progressViewOffset={-50} enabled={true} colors={["#008080"]} refreshing={loanStore.refreshingloantype} onRefresh={onRefresh} />}
			showsVerticalScrollIndicator={false}
			style={styles.container}
		>
			{isPending && <LoadingModal modalVisible={isPending} />}
			{!isPending && !isError && (
				<View>
					<View style={{ width: "100%", paddingLeft: 15, paddingRight: 15 }}>
						<Text style={styles.popularText}>Popular</Text>
					</View>
					<View style={styles.topSection}>
						<FlatList
							ref={flatListLoanRef}
							horizontal
							pagingEnabled
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							onScroll={handleScroll}
							scrollEventThrottle={16}
							data={data}
							keyExtractor={item => item.id}
							renderItem={({ item }) => (
								<View style={styles.slide} key={item.id}>
									<LoanPackageItem
										onPress={() => handleViewLoanTypeDetails(item)}
										title={item.name}
										current={currentPage}
										subtext={item.description}
										bgColor={item.bg}
										bgAsth={{ first: item.first, second: item.second }}
									/>
								</View>
							)}
						/>

						<View style={styles.indicators}>
							{data?.map((_, index) => (
								<TouchableOpacity
									activeOpacity={0.9}
									key={index}
									style={[styles.indicator, index === currentPage && styles.activeIndicator]}
									// onPress={() => flatListRef.current.scrollToIndex({ index, animated: true })}
								/>
							))}
						</View>
					</View>
					<View style={styles.containerPadding}>
						{!isPending && !isError && (
							<View>
								<Text style={styles.moreloanText}>More Loan Packages</Text>
								<TouchableOpacity activeOpacity={0.9} style={styles.exploreContainer} onPress={handlePresentModalPress}>
									<Image source={require("../../../assets/images/explorepackages.png")} />
									<View style={styles.exploreTextContent}>
										<Text style={styles.exploreText}>Explore</Text>
										<Text style={styles.exploreSubText}>Discover customized loans to meet your business needs.</Text>
									</View>
									<TouchableOpacity activeOpacity={0.9} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 50, backgroundColor: "#FFF" }}>
										<IconArrowForward />
									</TouchableOpacity>
								</TouchableOpacity>
							</View>
						)}
						<View>
							<Text style={styles.needHelpText}>Need help?</Text>
							<View style={styles.supportContent}>
								<View style={styles.supportTextView}>
									<Text style={styles.contactSupportText}>Contact Support</Text>
									<Text style={styles.contactSupportDesText}>Our team of loan & financial expert are available to assist</Text>
									<TouchableOpacity activeOpacity={0.9} style={styles.supportBtn} onPress={() => navigation.push("support-screen")}>
										<View style={styles.support}>
											<Text style={styles.supportBtnText}>Contact us</Text>
											<ForwardGreaterThanIcon />
										</View>
									</TouchableOpacity>
								</View>
								<Image source={require("../../../assets/images/Support_img.png")} />
							</View>
						</View>
					</View>
				</View>
			)}
			{!isPending && !error && (
				<CustomBottomSheetModal
					backgroundStyle={{ backgroundColor: "#FFFFFF" }}
					handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }}
					itemIndex={3}
					ref={tailoredModalRef}
					handleSheetChanges={handleSheetChanges}
				>
					<TailorLoanBottomSheet navigation={navigation} onClose={handleCloseModalPress} loanTypes={tailoredLoan} />
				</CustomBottomSheetModal>
			)}
		</ScrollView>
	)
}

export default observer(LoanHomeComponent)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		// display: "flex",
		width: "100%"
	},
	containerPadding: {
		flex: 1,
		backgroundColor: "#FFF",
		// display: "flex",
		width: "100%",
		paddingLeft: 15,
		paddingRight: 15
	},
	popularText: {
		color: "#000",
		fontFamily: "Inter-SemiBold",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "600",
		marginTop: 10
	},

	moreloanText: {
		color: "#008080",
		fontFamily: "Inter-SemiBold",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "500",
		// lineHeight: "140%",
		letterSpacing: -0.0675,
		marginTop: 60
	},

	exploreContainer: {
		width: "100%",
		// height: 200,
		flexShrink: 0,
		paddingTop: 25,
		paddingBottom: 25,
		paddingLeft: 15,
		paddingRight: 15,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 12,
		backgroundColor: "#FEF8EA",
		marginTop: 10
	},
	exploreTextContent: {
		display: "flex",
		width: "60%"
	},
	exploreText: {
		color: "#002D2D",
		fontFamily: "Inter-SemiBold",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "600"
		// lineHeight: "normal"
	},
	exploreSubText: {
		color: "#2E2E2E",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "200"
		// lineHeight: "normal"
	},

	supportContent: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 25,
		paddingBottom: 25,
		paddingLeft: 15,
		paddingRight: 15,
		flexShrink: 0,
		borderRadius: 12,
		background: "#FAFAFA",
		marginTop: 10
	},
	needHelpText: {
		color: "#575757",
		fontFamily: "Inter-SemiBold",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "400",
		marginTop: 20
		// lineHeight: "normal"
	},
	contactSupportText: {
		color: "#004D4D",
		fontFamily: "Inter-SemiBold",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "500"
		// lineHeight: "normal"
	},
	contactSupportDesText: {
		color: "#6B7D90",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300"
		// lineHeight: "normal"
	},
	supportBtn: {
		display: "flex",
		flexDirection: "row",
		height: 50,
		width: 120,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8.7,
		borderColor: "#1DB954",
		borderWidth: 1,
		marginTop: 30
	},
	support: {
		display: "flex",
		flexDirection: "row"
	},
	supportBtnText: {
		color: "#1DB954",
		marginTop: -2
	},
	supportTextView: {
		display: "flex",
		flexDirection: "column",
		width: "70%"
	},
	slide: {
		width,

		// alignItems: "center",
		justifyContent: "center"
		// paddingRight: 0,
		// paddingLeft: 0,
		// backgroundColor: "red"
	},
	indicators: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 15
	},
	indicator: {
		width: 16,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#D9ECEC",
		marginHorizontal: 2
	},
	activeIndicator: {
		backgroundColor: AppColors.secondary,
		width: 30,
		height: 8
	},
	topSection: {
		flex: 0.31,
		display: "flex",
		width: "100%",
		// backgroundColor: "#3498db", // Example background color for the top section
		justifyContent: "center",
		alignItems: "center"
		// marginRight: 20
	}
})
