import { observer } from "mobx-react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OnboardingScreen from "../components/OnBoarding/OnBoardingContent"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import OtpVerificationForm from "../screens/OtpScreen"
import { useAuth } from "../context/AuthContext"
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"
import VerifyOtpScreen from "../screens/VerifyOtpScreen"
import ResetPasswordScreen from "../screens/ResetPasswordScreen"

const Stack = createNativeStackNavigator()

const AuthStack = () => {
	const { authState } = useAuth()
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{authState.slider ? null : <Stack.Screen name="Onboarding" component={OnboardingScreen} />}
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
			<Stack.Screen name="Otp" component={OtpVerificationForm} />
			<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
			<Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
			<Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
		</Stack.Navigator>
	)
}

export default observer(AuthStack)
