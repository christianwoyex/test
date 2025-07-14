import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PersonDataScreen from "../screens/profile/PersonDataScreen"
import FinanceDataScreen from "../screens/profile/FinanceDataScreen"
import BusinessDataScreen from "../screens/profile/BusinessDataScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import PersonDataFormScreen from "../screens/profile/PersonalDataFormScreen"
import PersonalDataContactScreen from "../screens/profile/PersonalDataContactScreen"
import ResidentialsDetailsFormScreen from "../screens/profile/ResidentialsDetailsFormScreen"
import PersonalDataIdentificationScreen from "../screens/profile/PersonalDataIdentificationScreen"
import LinkAccountFormScreen from "../screens/profile/LinkAccountFormScreen"
import BusinessDetailsScreen from "../screens/profile/BusinessDetails"
import NotificationScreen from "../screens/NotificationScreen"
import ChangePasswordScreen from "../screens/profile/ChangePasswordScreen"
import BusinessAdressScreen from "../screens/profile/BusinessAddress"
import BusinessDocsScreen from "../screens/profile/BusinessDocs"
import BusinessOrganizationScreen from "../screens/profile/BusinessOrganization"
import AddAccountManuallyScreen from "../screens/profile/AddAccountManually"
import AboutScreen from "../screens/profile/AboutScreen"
import PrivacyScreen from "../screens/profile/PrivacyScreen"
import TermsScreen from "../screens/profile/TermsScreen"
import FaqsScreen from "../screens/profile/FaqsScreen"
import SupportScreen from "../screens/profile/SupportScreen"

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
			<Stack.Screen name="personal-data" component={PersonDataScreen} />
			<Stack.Screen name="business-data" component={BusinessDataScreen} />
			<Stack.Screen name="finance-data" component={FinanceDataScreen} />
			<Stack.Screen name="about-screen" component={AboutScreen} />
			<Stack.Screen name="privacy-screen" component={PrivacyScreen} />
			<Stack.Screen name="terms-screen" component={TermsScreen} />
			<Stack.Screen name="faqs-screen" component={FaqsScreen} />
			<Stack.Screen name="support-screen" component={SupportScreen} />
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
			<Stack.Screen name="Notification" component={NotificationScreen} />
			<Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
		</Stack.Navigator>
	)
}

export default ProfileStack
