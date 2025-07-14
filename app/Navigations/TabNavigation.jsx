import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"

import { AccountIcon, HomeIcon, LoanIcon, RepaymentIcon } from "../../assets/icons"
import AppColors from "../config/colors"
import ProfileStack from "./ProfileNavigation"
import HomeStack from "./HomeNavigation"
import RePaymentStack from "./RepaymentStack"
import LoanStack from "./LoanStack"
import { useQuery } from "@tanstack/react-query"
import authStore from "../mobx/AuthStore"
import { observer } from "mobx-react"
import { Dimensions, Platform } from "react-native"

const Tab = createBottomTabNavigator()
const { height } = Dimensions.get("screen")
const TabNavigation = () => {
	const {
		isPending: isPendingUser,
		error: errUser,
		data: userData,
		refetch: refetchUser
	} = useQuery({
		queryKey: ["user"],
		queryFn: authStore.getLoggedInUser
	})
	const getTabBarVisibilityHome = route => {
		const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeScreen"
		let active =
			routeName === "PackagesScreen"
				? "none"
				: routeName == "EstimateScreen"
				? "none"
				: routeName === "EquityScreen"
				? "none"
				: routeName == "ApplicationSummary"
				? "none"
				: isPendingUser
				? "none"
				: routeName === "Verified"
				? "none"
				: routeName === "ApplyLoanFormTwo"
				? "none"
				: routeName === "LoanSelectionScreen"
				? "none"
				: routeName === "loan-review"
				? "none"
				: routeName === "LoanTermScreen"
				? "none"
				: routeName === "LoanOfferScreen"
				? "none"
				: routeName === "LoanDetails"
				? "none"
				: routeName === "loan-review"
				? "none"
				: routeName === "Verified"
				? "none"
				: routeName == "support-screen"
				? "none"
				: routeName === "LoanTermScreen"
				? "none"
				: routeName === "AddGuarantor"
				? "none"
				: routeName === "LoanOfferScreen"
				? "none"
				: routeName == "Notification"
				? "none"
				: routeName == "personal-data"
				? "none"
				: routeName == "finance-data"
				? "none"
				: routeName == "business-data"
				? "none"
				: routeName == "AddAccountManuallyScreen"
				? "none"
				: routeName == "LinkAccountFormScreen"
				? "none"
				: routeName == "ChangePasswordScreen"
				? "none"
				: routeName == "PersonalDataScreen"
				? "none"
				: routeName === "EquityScreen"
				? "none"
				: routeName == "PersonalDataContact"
				? "none"
				: routeName == "PersonalDataResidentials"
				? "none"
				: routeName == "PersonalDataIdentification"
				? "none"
				: routeName == "business-data"
				? "none"
				: routeName == "BusinessDetails"
				? "none"
				: routeName == "BusinessAdress"
				? "none"
				: routeName == "BusinessDocs"
				? "none"
				: routeName == "BusinessOrganization"
				? "none"
				: "flex"
		return active
	}
	const getTabBarVisibilityRePayment = route => {
		const routeName = getFocusedRouteNameFromRoute(route) ?? "Repayment"
		let active =
			routeName === "PledgeSupportScreen"
				? "none"
				: routeName == "EstimateScreen"
				? "none"
				: routeName == "ApplicationSummary"
				? "none"
				: routeName == "Verified"
				? "none"
				: routeName == "support-screen"
				? "none"
				: routeName === "EquityScreen"
				? "none"
				: routeName === "LoanSelectionScreen"
				? "none"
				: routeName === "LoanOfferScreen"
				? "none"
				: routeName === "LoanDetails"
				? "none"
				: routeName === "loan-review"
				? "none"
				: routeName === "Verified"
				? "none"
				: routeName === "LoanTermScreen"
				? "none"
				: routeName === "AddGuarantor"
				? "none"
				: routeName === "LoanOfferScreen"
				? "none"
				: routeName == "Notification"
				? "none"
				: "flex"
		return active
	}
	const getTabBarVisibilityAccount = route => {
		const routeName = getFocusedRouteNameFromRoute(route) ?? "ProfileScreen"
		let activeAccount =
			routeName == "personal-data"
				? "none"
				: routeName == "finance-data"
				? "none"
				: routeName == "Verified"
				? "none"
				: routeName == "about-screen"
				? "none"
				: routeName == "privacy-screen"
				? "none"
				: routeName == "terms-screen"
				? "none"
				: routeName == "faqs-screen"
				? "none"
				: routeName == "support-screen"
				? "none"
				: routeName === "EquityScreen"
				? "none"
				: routeName == "AddAccountManuallyScreen"
				? "none"
				: routeName == "LinkAccountFormScreen"
				? "none"
				: routeName == "ChangePasswordScreen"
				? "none"
				: routeName == "PersonalDataScreen"
				? "none"
				: routeName === "EquityScreen"
				? "none"
				: routeName == "PersonalDataContact"
				? "none"
				: routeName == "PersonalDataResidentials"
				? "none"
				: routeName == "PersonalDataIdentification"
				? "none"
				: routeName == "business-data"
				? "none"
				: routeName == "BusinessDetails"
				? "none"
				: routeName == "BusinessAdress"
				? "none"
				: routeName == "BusinessDocs"
				? "none"
				: routeName == "BusinessOrganization"
				? "none"
				: routeName == "Notification"
				? "none"
				: "flex"

		return activeAccount
	}
	const getTabBarVisibilityLoan = route => {
		const routeName = getFocusedRouteNameFromRoute(route) ?? "LoanScreen"
		let active =
			routeName === "EstimateScreen"
				? "none"
				: routeName === "EquityScreen"
				? "none"
				: routeName === "LoanDetails"
				? "none"
				: routeName === "loan-review"
				? "none"
				: routeName === "Verified"
				? "none"
				: routeName === "LoanTermScreen"
				? "none"
				: routeName === "AddGuarantor"
				? "none"
				: routeName === "LoanOfferScreen"
				? "none"
				: routeName === "LoanDetails"
				? "none"
				: routeName === "loan-review"
				? "none"
				: routeName === "Verified"
				? "none"
				: routeName === "LoanTermScreen"
				? "none"
				: routeName === "AddGuarantor"
				? "none"
				: routeName === "LoanOfferScreen"
				? "none"
				: routeName == "Notification"
				? "none"
				: routeName == "filter_loan"
				? "none"
				: "flex"
		return active
	}
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: true,
				style: {
					borderTopWidth: 0,
					borderBottomWidth: 0,
					elevation: 0,
					backgroundColor: "#F2F9F9"
				},

				tabBarLabelStyle: {
					fontSize: 12,
					// marginTop: -10,
					marginBottom: 6,
					fontFamily: "Inter-SemiBold",
					fontWeight: "500"
				},

				tabBarStyle: {
					elevation: 0,
					paddingTop: 2,
					height: Platform.OS === "ios" ? height / 9 : height / 13,
					borderTopWidth: 0
				},
				tabBarInactiveTintColor: "#666666",
				tabBarActiveTintColor: AppColors.primary
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeStack}
				options={({ route }) => ({
					tabBarStyle: {
						backgroundColor: AppColors.bottomNav,
						elevation: 0,
						borderTopWidth: 0,
						borderBottomWidth: 0,
						// paddingTop: 2,
						height: Platform.OS === "ios" ? height / 9 : height / 13,
						display: getTabBarVisibilityHome(route)
					},
					tabBarIcon: ({ color, size }) => <HomeIcon color={color} />
				})}
			/>
			<Tab.Screen
				name="Loan"
				component={LoanStack}
				options={({ route }) => ({
					tabBarStyle: {
						backgroundColor: AppColors.bottomNav,
						elevation: 0,
						borderTopWidth: 0,
						borderBottomWidth: 0,
						paddingTop: 2,
						height: Platform.OS === "ios" ? height / 9 : height / 13,
						display: getTabBarVisibilityLoan(route)
					},
					tabBarIcon: ({ color, size }) => <LoanIcon color={color} />
				})}
			/>
			<Tab.Screen
				name="Repayment"
				component={RePaymentStack}
				options={({ route }) => ({
					tabBarStyle: {
						display: getTabBarVisibilityRePayment(route),
						backgroundColor: AppColors.bottomNav,
						elevation: 0,
						borderTopWidth: 0,
						borderBottomWidth: 0,
						paddingTop: 2,
						height: Platform.OS === "ios" ? height / 9 : height / 13
					},
					tabBarIcon: ({ color, size }) => <RepaymentIcon color={color} />
				})}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileStack}
				options={({ route }) => ({
					tabBarStyle: {
						display: getTabBarVisibilityAccount(route),
						backgroundColor: AppColors.bottomNav,
						elevation: 0,
						borderTopWidth: 0,
						borderBottomWidth: 0,
						paddingTop: 2,
						height: Platform.OS === "ios" ? height / 9 : height / 13
					},
					tabBarIcon: ({ color, size }) => <AccountIcon color={color} />
				})}
			/>
		</Tab.Navigator>
	)
}

export default observer(TabNavigation)
