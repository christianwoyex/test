import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image, RefreshControl } from "react-native"
import React, { useCallback, useRef, useEffect } from "react"
import { observer } from "mobx-react"
import { EyeIcon, ForwardGreaterThanIcon, GrayCircleIcon, NairaIcon } from "../../../assets/icons"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { AppButton } from "../common/AppButton"
import BottomSheetComp from "./BottomSheet"
import CompleteKycBottomSheet from "../Auth/CompleteKycBottomSheet"
import RequestBottomSheetModal from "./RequestBottomSheetModal"
import authStore from "../../mobx/AuthStore"
import EmptyLoanCard from "./EmptyLoanCard"
import CustomBottomSheetModal from "../common/CustomBottomSheetModal"
import ActiveLoanCard from "./ActiveLoanCard"
import loanStore from "../../mobx/LoanStore"
import profileStore from "../../mobx/profileStore"
import { useNavigation, useNavigationState } from "@react-navigation/native"
const { width, height } = Dimensions.get("window")

const HomeComponent = ({ navigation }) => {
	const navigationDa = useNavigation()
	const navigationState = useNavigationState(state => state)
	const queryClient = useQueryClient()
	const newModalRef = useRef(null)
	const KycModalRef = useRef(null)

	const handlePresentModalPressType = useCallback(() => {
		newModalRef.current?.present()
	}, [])

	const handlePresentModalPressKyc = useCallback(() => {
		KycModalRef.current?.present()
	}, [])

	const handleSheetChangesType = useCallback(index => {}, [])

	const handleSelectBusinessType = () => {
		navigation.navigate("LoanSelectionScreen")
		newModalRef.current?.close()
	}
	const handleSelectBusinessTypeNew = () => {
		navigation.navigate("LoanSelectionScreen")
		newModalRef.current?.close()
	}
	const handleCompleteKyc = () => {
		KycModalRef.current?.close()
		navigation.navigate("Profile")
	}
	const handleCloseKYC = () => {
		KycModalRef.current?.close()
	}
	const { isPending: acountInfo } = useQuery({
		queryKey: ["account-info"],
		queryFn: profileStore.getAccountInfo
	})

	const currentRouteName = navigationState.routes[navigationState.index].name

	useEffect(() => {
		if (authStore?.loggedInUser.first_name && !authStore?.loggedInUser.is_kyc_completed) {
			handlePresentModalPressKyc()
		}
	}, [])
	const onRefresh = async () => {
		await loanStore.getUserLoansRefreshing()
		queryClient.invalidateQueries({ queryKey: ["loans"] })
		queryClient.invalidateQueries({ queryKey: ["user"] })
	}

	return (
		<ScrollView
			refreshControl={<RefreshControl progressViewOffset={-50} enabled={true} colors={["#008080"]} refreshing={loanStore.refreshingloans} onRefresh={onRefresh} />}
			showsVerticalScrollIndicator={false}
			style={styles.homeLoan}
		>
			<View style={styles.loanInfoContainer}>
				{loanStore.loans && loanStore.loans.length <= 0 ? <EmptyLoanCard /> : <ActiveLoanCard loan={loanStore.loans[0]} />}

				<View style={{ marginTop: 20, width: "100%" }}>
					<AppButton title="Request Loan" onPress={handlePresentModalPressType} />
				</View>
				<View style={styles.homeLoanPackages}>
					<View style={styles.loanTextContent}>
						<Text style={styles.loanTextExplore}>Explore our tailored loan packages</Text>
					</View>
					<View style={styles.loanTextContent}>
						<Text style={styles.loanApprovedText}>Empowering Your Financial Journey with Customized Loan Solutions.</Text>
					</View>
					<View style={styles.loanTextContent}>
						<View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
							<TouchableOpacity activeOpacity={0.9} style={styles.packagesBtn} onPress={() => navigation.navigate("PackagesScreen")}>
								<View style={styles.pakages}>
									<Text style={styles.packagesBtnText}>Packages</Text>
									<ForwardGreaterThanIcon />
								</View>
							</TouchableOpacity>
							<Image source={require("../../../assets/images/hand_with_dollor.png")} />
						</View>
					</View>
				</View>
				{!authStore?.loggedInUser.is_kyc_completed ? (
					<View style={styles.homeLoanCompleteReg}>
						<View style={styles.loanTextContent}>
							<Text style={styles.loanTextCompletereg}>Complete Your Registration</Text>
						</View>
						<View style={styles.loanTextContent}>
							<Text style={styles.loanApprovedText}>Fill out the KYC section to apply for loan</Text>
						</View>
						<View style={styles.loanTextContent}>
							<View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
								<TouchableOpacity activeOpacity={0.9} style={styles.completeBtn} onPress={() => navigation.navigate("Profile")}>
									<View style={styles.pakages}>
										<Text style={styles.completeBtnText}>Complete KYC</Text>
									</View>
								</TouchableOpacity>
								<GrayCircleIcon />
							</View>
						</View>
					</View>
				) : null}
			</View>

			<CustomBottomSheetModal itemIndex={2} backgroundStyle={{ backgroundColor: "#FFFFFF" }} handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }} ref={KycModalRef}>
				<CompleteKycBottomSheet onCompleteKYC={handleCompleteKyc} onContinue={handleCloseKYC} />
			</CustomBottomSheetModal>

			<RequestBottomSheetModal
				backgroundStyle={{ backgroundColor: "#FFFFFF" }}
				handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }}
				ref={newModalRef}
				handleSheetChanges={handleSheetChangesType}
			>
				<BottomSheetComp onSelectExisting={handleSelectBusinessType} onSelectNew={handleSelectBusinessTypeNew} />
			</RequestBottomSheetModal>
		</ScrollView>
	)
}

export default observer(HomeComponent)

const styles = StyleSheet.create({
	homeLoan: {
		flex: 1,
		width: "100%",
		backgroundColor: "#F5F5F5"
	},
	loanInfoContainer: {
		display: "flex",
		width: "100%",
		paddingLeft: 15,
		paddingRight: 15,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20
	},

	loanTextContent: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 10
	},
	loanText: {
		color: "#002D2D",
		fontFamily: "Inter-SemiBold",
		fontSize: 30,
		fontStyle: "normal",
		fontWeight: "600",
		// lineLeight: 20,
		letterSpacing: -2,
		marginLeft: 5
	},
	loanTextAfterDot: {
		color: "#002D2D",
		fontFamily: "Inter-SemiBold",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "600",
		marginTop: 8,
		// lineLeight: 20,
		letterSpacing: 0
		// marginLeft: 5
	},

	interestText: {
		color: "#2B4560",
		fontFamily: "Inter-SemiBold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "400",
		// lineHeight: 14,
		marginRight: 5
	},
	interestPercent: {
		color: "#1DB954",
		fontFamily: "Inter-SemiBold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "400"
		// lineHeight: 14
	},
	loanApprovedText: {
		color: "#6B7D90",
		fontFamily: "Inter-SemiBold",
		fontSize: 13,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 20,
		letterSpacing: 0.674,
		marginRight: 19
	},

	homeLoanPackages: {
		backgroundColor: "#F5F5F5",
		width: "100%",
		height: height / 2.5,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8.7,
		borderColor: "rgba(0, 128, 128, 0.10)",
		borderWidth: 1
	},
	homeLoanCompleteReg: {
		backgroundColor: "#FEF8EA",
		width: "100%",
		height: height / 3.5,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8.7,
		// borderColor: "rgba(0, 128, 128, 0.10)",
		// borderWidth: 1,
		marginTop: 30,
		marginBottom: 30
	},
	loanTextExplore: {
		color: "#001F3F",
		fontFamily: "Inter-SemiBold",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "600",
		// lineLeight: 20,
		letterSpacing: -0.135,
		marginLeft: 0
	},
	loanTextCompletereg: {
		color: "#001326",
		fontFamily: "Inter-SemiBold",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "600",
		lineHeight: 20,
		letterSpacing: -0.135,
		marginLeft: 0
	},

	packagesBtn: {
		display: "flex",
		flexDirection: "row",
		height: 50,
		width: 120,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8.7,
		borderColor: "#D9ECEC",
		borderWidth: 1,
		marginTop: 30
	},
	pakages: {
		display: "flex",
		flexDirection: "row"
	},
	packagesBtnText: {
		color: "#1DB954",
		fontFamily: "Inter-SemiBold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300",
		letterSpacing: 0.674
	},
	completeBtn: {
		display: "flex",
		flexDirection: "row",
		height: 50,
		width: 150,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8.7,
		backgroundColor: "#1DB954",
		marginTop: 30
	},
	pakages: {
		display: "flex",
		flexDirection: "row"
	},
	completeBtnText: {
		color: "#F5f5f5",
		fontFamily: "Inter-SemiBold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300",
		letterSpacing: 0.674
	}
})
