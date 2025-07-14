import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { EXPO_API_URL, EXPO_TOKEN_KEY, EXPO_REGE_KEY, EXPO_SLIDER_KEY } from "@env"
import * as SecureStore from "expo-secure-store"
import { useNavigation } from "@react-navigation/native"
import authStore from "../mobx/AuthStore"

// import profileStore from "../mobx/profileStore"

const TOKEN_KEY = EXPO_TOKEN_KEY
const REG_KEY = EXPO_REGE_KEY
const SLIDER_KEY = EXPO_SLIDER_KEY
const API_URL = EXPO_API_URL

const AuthContext = createContext({})
export const useAuth = () => {
	return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({ token: null, slider: false, authenticated: false })
	const navigation = useNavigation()

	const loadToken = async () => {
		const token = await SecureStore.getItemAsync(TOKEN_KEY)
		const slider = await SecureStore.getItemAsync(SLIDER_KEY)
		if (slider) {
			let slideState = { ...authState }
			slideState.slider = slider
			setAuthState(slideState)
		} else {
			let slideState = { ...authState }
			slideState.slider = slider
			setAuthState(slideState)
		}

		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
			let newState = { ...authState }
			newState.authenticated = false
			newState.token = token

			setAuthState(newState)
		}
	}

	useEffect(() => {
		loadToken()
	}, [navigation])

	const register = async payload => {
		authStore.loadingStatus()
		axios.defaults.headers.common["Authorization"] = ""
		try {
			const result = await axios.post(`${API_URL}/users`, payload)
			if (result?.data?.data?.token && !result?.data?.data?.user?.is_verified) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.data.token}`
				await SecureStore.setItemAsync(REG_KEY, result.data.data.token)
				authStore.loadingStatus()
			}
			if (result?.data?.data?.token && result?.data?.data?.user?.is_verified) {
				await SecureStore.setItemAsync(REG_KEY, result.data.data.token)
				authStore.setSuccessStatus(result.data.data.message)
				authStore.loadingStatus()
			}
			return result
		} catch (e) {
			authStore.loadingStatus()

			if (e && !e?.response?.data) {
				authStore.setErrorStatus("An unexpected error occurred, please try again later")
				return { success: false, message: "Something failed" }
			}
			if (e?.response?.data) {
				authStore.setErrorStatus(e.response.data.error.message)
				return { ...e.response.data }
			}

			return e
		}
	}
	const verifyOtp = async payload => {
		authStore.loadingStatus()

		try {
			const otpToken = await SecureStore.getItemAsync(REG_KEY)
			if (otpToken) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${otpToken}`
			}
			const otp_response = await axios.post(`${API_URL}/users/otp-verifications`, payload)
			if (otp_response?.data?.success) {
				authStore.setSuccessStatus(otp_response.data.message)
				authStore.loadingStatus()
			}
			return otp_response
		} catch (error) {
			authStore.loadingStatus()
			if (error && !error?.response?.data) {
				authStore.serroretErrorStatus("An unexpected error occurred, please try again later")
				return { success: false, message: "Something failed" }
			}
			if (error?.response?.data) {
				authStore.setErrorStatus(error.response.data.error.message)
				return { ...error.response.data }
			}

			return error
		}
	}
	const login = async payload => {
		authStore.loadingStatus()
		axios.defaults.headers.common["Authorization"] = ""
		try {
			const result = await axios.post(`${API_URL}/users/tokens`, payload)

			let loginState = { ...authState }

			if (result?.data?.data?.token && !result?.data?.data?.user?.is_verified) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.data.token}`
				await SecureStore.setItemAsync(REG_KEY, result.data.data.token)
				authStore.loadingStatus()
			}
			if (result?.data?.data?.token && result?.data?.data?.user?.is_verified) {
				await SecureStore.setItemAsync(REG_KEY, result.data.data.token)
				loginState.authenticated = true
				loginState.token = result.data?.data?.token
				authStore.setLoggedinUser(result.data?.data?.user)
				axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.data.token}`
				await SecureStore.setItemAsync(TOKEN_KEY, result.data.data.token)
				authStore.loadingStatus()
				setAuthState(loginState)
			}
			return result
		} catch (e) {
			authStore.loadingStatus()

			if (e && !e?.response?.data) {
				authStore.setErrorStatus("An unexpected error occurred, please try again later")
				return { success: false, message: "Something failed" }
			}
			if (e.response.data) {
				if (e.response.data?.error.message === "Invalid login credentials") {
					authStore.setErrorStatus("Oops! It looks like there was an issue with your login credentials. Please double-check your phone number and password and try again")
				}
				return { ...e?.response?.data }
			}

			return e
		}
	}

	const setSlideState = async () => {
		await SecureStore.setItemAsync(SLIDER_KEY, "true")
		let slideState = { ...authState }
		slideState.slider = true
		setAuthState(slideState)
	}

	const logout = async () => {
		await SecureStore.deleteItemAsync(TOKEN_KEY)
		await SecureStore.setItemAsync(SLIDER_KEY, "true")
		axios.defaults.headers.common["Authorization"] = ""
		let logoutState = { ...authState }
		logoutState.authenticated = false
		logoutState.slider = true
		logoutState.token = null
		setAuthState(logoutState)
	}

	const value = {
		onRegister: register,
		onLogin: login,
		onLogout: logout,
		onVerifyOtp: verifyOtp,
		setSlideState,
		authState
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
