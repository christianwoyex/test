import { createStackNavigator } from "@react-navigation/stack"
import LoanScreen from "../screens/LoanScreen"
import EquityFinancingScreen from "../screens/EquityFinancingScreen"
import TailorLoanBottomSheetLoan from "../components/Loan/TailorLoanPackages"
import EstimateLoanScreen from "../screens/EstimateLoanScreen"
import LoanOfferScreen from "../screens/loanoffer/LoanOfferScreen"
import LoanStatusScreen from "../screens/loanoffer/LoanStatusScreen"
import LoanSelectionScreen from "../screens/loanoffer/LoanSelectionScreen"
import LoanApplyFormTwoScreen from "../screens/loanoffer/ApplyLoanFormTwo"
import LoanDetailsScreen from "../screens/loanoffer/LoanDetailsScreen"
import LoanTermScreen from "../screens/loanoffer/LoanTermScreen"
import LoanReviewScreen from "../screens/loanoffer/LoanReviewScreen"
import AddGuarantorScreen from "../screens/loanoffer/AddGuarantor"
import NotificationScreen from "../screens/NotificationScreen"
import SupportScreen from "../screens/profile/SupportScreen"
import FilterApplicationScreen from "../screens/loanoffer/FilterApplicationScreen"
import PersonDataScreen from "../screens/profile/PersonDataScreen"
import FinanceDataScreen from "../screens/profile/FinanceDataScreen"
import BusinessDataScreen from "../screens/profile/BusinessDataScreen"

const Stack = createStackNavigator()

const LoanStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="LoanScreen" component={LoanStatusScreen} />
			<Stack.Screen name="LoanOfferScreen" component={LoanOfferScreen} />
			<Stack.Screen name="EquityScreen" component={EquityFinancingScreen} />
			<Stack.Screen name="request-loan" component={TailorLoanBottomSheetLoan} />
			<Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
			<Stack.Screen name="AddGuarantor" component={AddGuarantorScreen} />
			<Stack.Screen name="LoanTermScreen" component={LoanTermScreen} />
			<Stack.Screen name="loan-review" component={LoanReviewScreen} />

			<Stack.Screen name="PackagesScreen" component={LoanScreen} />
			<Stack.Screen name="EstimateScreen" component={EstimateLoanScreen} />
			<Stack.Screen name="ApplyLoanFormOne" component={LoanSelectionScreen} />
			<Stack.Screen name="ApplyLoanFormTwo" component={LoanApplyFormTwoScreen} />
			<Stack.Screen name="ApplicationSummary" component={LoanSelectionScreen} />
			<Stack.Screen name="Notification" component={NotificationScreen} />
			<Stack.Screen name="support-screen" component={SupportScreen} />
			<Stack.Screen name="filter_loan" component={FilterApplicationScreen} />
			<Stack.Screen name="personal-data" component={PersonDataScreen} />
			<Stack.Screen name="business-data" component={BusinessDataScreen} />
			<Stack.Screen name="finance-data" component={FinanceDataScreen} />
		</Stack.Navigator>
	)
}

export default LoanStack
