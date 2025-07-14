import { createStackNavigator } from "@react-navigation/stack"
import PersonDataScreen from "../screens/profile/PersonDataScreen"
import BusinessDataScreen from "../screens/profile/BusinessDataScreen"
import RepaymentScreen from "../screens/RepaymentScreen"
import LoanDueRepaymentScreen from "../screens/LoanDueRepaymentScreen"
import RepaymentHistoryScreen from "../screens/RepaymentHistoryScreen"
import PledgeSupportScreen from "../screens/PledgeSupportScreen"
import NotificationScreen from "../screens/NotificationScreen"
import LoanDetailsScreen from "../screens/loanoffer/LoanDetailsScreen"
import LoanTermScreen from "../screens/loanoffer/LoanTermScreen"
import LoanReviewScreen from "../screens/loanoffer/LoanReviewScreen"
import AddGuarantorScreen from "../screens/loanoffer/AddGuarantor"
import EquityFinancingScreen from "../screens/EquityFinancingScreen"

const Stack = createStackNavigator()

const RePaymentStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="RepayementScreen" component={RepaymentScreen} />
			<Stack.Screen name="personal-data" component={PersonDataScreen} />
			<Stack.Screen name="business-data" component={BusinessDataScreen} />
			<Stack.Screen name="DueRepaymentScreen" component={LoanDueRepaymentScreen} />
			<Stack.Screen name="RepaymentHistory" component={RepaymentHistoryScreen} />
			<Stack.Screen name="PledgeSupportScreen" component={PledgeSupportScreen} />
			<Stack.Screen name="Notification" component={NotificationScreen} />
			<Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
			<Stack.Screen name="AddGuarantor" component={AddGuarantorScreen} />
			<Stack.Screen name="LoanTermScreen" component={LoanTermScreen} />
			<Stack.Screen name="loan-review" component={LoanReviewScreen} />
			<Stack.Screen name="EquityScreen" component={EquityFinancingScreen} />
		</Stack.Navigator>
	)
}

export default RePaymentStack
