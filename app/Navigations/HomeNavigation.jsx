import { createStackNavigator } from "@react-navigation/stack"
import { observer } from "mobx-react"
import HomeScreenKyc from "../screens/kyc/HomeScreen"
import LoanScreen from "../screens/LoanScreen"
// import EstimateLoanScreen from "../screens/EstimateLoanScreen"
import LoanSelectionScreen from "../screens/loanoffer/LoanSelectionScreen"
import EquityFinancingScreen from "../screens/EquityFinancingScreen"
// import VerifiedScreen from "../screens/VerifiedScreen"
// import authStore from "../mobx/AuthStore"
import LoanApplyFormTwoScreen from "../screens/loanoffer/ApplyLoanFormTwo"
import LoanApplicationSummary from "../components/Loan/LoanFlow/LoanApplicationSummary"
import LoanApplicationScreen from "../screens/loanoffer/ApplicationSummary"
// import NotificationScreen from "../screens/NotificationScreen"

import LoanDetailsScreen from "../screens/loanoffer/LoanDetailsScreen"
import LoanTermScreen from "../screens/loanoffer/LoanTermScreen"
import LoanReviewScreen from "../screens/loanoffer/LoanReviewScreen"
import AddGuarantorScreen from "../screens/loanoffer/AddGuarantor"
import SupportScreen from "../screens/profile/SupportScreen"
import NotificationScreen from "../screens/NotificationScreen"
import PersonDataScreen from "../screens/profile/PersonDataScreen"
import FinanceDataScreen from "../screens/profile/FinanceDataScreen"
import BusinessDataScreen from "../screens/profile/BusinessDataScreen"

import PersonDataFormScreen from "../screens/profile/PersonalDataFormScreen"
import PersonalDataContactScreen from "../screens/profile/PersonalDataContactScreen"
import ResidentialsDetailsFormScreen from "../screens/profile/ResidentialsDetailsFormScreen"
import PersonalDataIdentificationScreen from "../screens/profile/PersonalDataIdentificationScreen"
import LinkAccountFormScreen from "../screens/profile/LinkAccountFormScreen"
import BusinessDetailsScreen from "../screens/profile/BusinessDetails"
import BusinessAdressScreen from "../screens/profile/BusinessAddress"
import BusinessDocsScreen from "../screens/profile/BusinessDocs"
import BusinessOrganizationScreen from "../screens/profile/BusinessOrganization"
import AddAccountManuallyScreen from "../screens/profile/AddAccountManually"

const Stack = createStackNavigator()

const HomeStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeScreen" component={HomeScreenKyc} />
			<Stack.Screen name="PackagesScreen" component={LoanScreen} />

			{/* <Stack.Screen name="EstimateScreen" component={EstimateLoanScreen} /> */}
			<Stack.Screen name="EquityScreen" component={EquityFinancingScreen} />
			<Stack.Screen name="LoanSelectionScreen" component={LoanSelectionScreen} />
			<Stack.Screen name="ApplyLoanFormTwo" component={LoanApplyFormTwoScreen} />
			<Stack.Screen name="ApplicationSummary" component={LoanApplicationScreen} />
			<Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
			<Stack.Screen name="AddGuarantor" component={AddGuarantorScreen} />
			<Stack.Screen name="LoanTermScreen" component={LoanTermScreen} />
			<Stack.Screen name="loan-review" component={LoanReviewScreen} />
			<Stack.Screen name="Notification" component={NotificationScreen} />
			<Stack.Screen name="support-screen" component={SupportScreen} />
			<Stack.Screen name="personal-data" component={PersonDataScreen} />
			<Stack.Screen name="business-data" component={BusinessDataScreen} />
			<Stack.Screen name="finance-data" component={FinanceDataScreen} />
			<Stack.Screen name="LinkAccountFormScreen" component={LinkAccountFormScreen} />
			<Stack.Screen name="AddAccountManuallyScreen" component={AddAccountManuallyScreen} />
			<Stack.Screen name="PersonalDataScreen" component={PersonDataFormScreen} />
			<Stack.Screen name="PersonalDataContact" component={PersonalDataContactScreen} />
			<Stack.Screen name="PersonalDataResidentials" component={ResidentialsDetailsFormScreen} />
			<Stack.Screen name="PersonalDataIdentification" component={PersonalDataIdentificationScreen} />
			<Stack.Screen name="BusinessDetails" component={BusinessDetailsScreen} />
			<Stack.Screen name="BusinessAdress" component={BusinessAdressScreen} />
			<Stack.Screen name="BusinessDocs" component={BusinessDocsScreen} />
			<Stack.Screen name="BusinessOrganization" component={BusinessOrganizationScreen} />
		</Stack.Navigator>
	)
}

export default observer(HomeStack)
