/*** src/Store.js ***/
import * as SecureStore from "expo-secure-store"
import { EXPO_API_URL, EXPO_REGE_KEY } from "@env"
import { observable, action, makeAutoObservable, computed } from "mobx"
import axios from "axios"

const REG_KEY = EXPO_REGE_KEY
const API_URL = EXPO_API_URL

export class AuthStore {
	@observable loading = false
	@observable resendloading = false
	@observable error = false

	@observable resendsuccess = false
	@observable success = false
	@observable verifiedStatus = false
	@observable otp = ""
	@observable errorValue = ""
	@observable successValue = ""
	@observable loggedInUser = {}
	@observable forgotOtpId = {}
	@observable chat_script = ""
	constructor() {
		makeAutoObservable(this)
	}

	@action loadingStatus = () => {
		this.loading = !this.loading
	}
	@action resendloadingStatus = () => {
		this.resendloading = !this.resendloading
	}
	@action setResendSuccessStatus = msg => {
		this.successValue = msg
		this.resendsuccess = !this.resendsuccess
	}
	@action setErrorStatus = error => {
		this.errorValue = error
		this.error = !this.error
	}
	@action setSuccessStatus = msg => {
		this.successValue = msg
		this.success = !this.success
	}
	@action clearSuccessStatus = () => {
		this.successValue = ""
		this.success = false
	}
	@action clearResendSuccessStatus = () => {
		this.successValue = ""
		this.resendsuccess = false
	}
	@action setChatScript = script => {
		this.chat_script = script
	}
	@action clearErrorStatus = () => {
		this.errorValue = ""
		this.error = false
	}
	@action getLoggedInUser = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/users/me`)
			if (data?.data) {
				this.setLoggedinUser(data?.data)
			}

			return data
		} catch (error) {
			return error
		}
	}
	@action setLoggedinUser = data => {
		this.loggedInUser = data
	}
	@action setForgotOtpId = data => {
		this.forgotOtpId = data
	}
	@action setOtp = data => {
		this.otp = data
	}
	@action setVerifiedStatus = data => {
		this.verifiedStatus = data
	}
	@action requestForgotPasswordOtp = async payload => {
		this.loadingStatus()
		try {
			const { data } = await axios.post(`${API_URL}/users/forgot-password-otp`, payload)
			if (data?.data) {
				this.setForgotOtpId(data?.data)
				this.setSuccessStatus("Your one-time password (OTP) has been successfully sent to your registered device.")
				this.loadingStatus()
			}
			return data
		} catch (error) {
			this.loadingStatus()
			if (error?.response?.data?.error?.message) {
				this.setErrorStatus(error?.response?.data?.error?.message)
			} else {
				this.setErrorStatus("An Unexpected Error occured please, try again later!")
			}

			return error
		}
	}
	@action resendForgotPasswordOtp = async payload => {
		this.resendloadingStatus()
		try {
			const { data } = await axios.post(`${API_URL}/users/forgot-password-otp`, payload)
			if (data?.data) {
				this.setForgotOtpId(data?.data)
				this.setResendSuccessStatus("Your one-time password (OTP) has been successfully sent to your registered device.")
				this.resendloadingStatus()
			}
			return data
		} catch (error) {
			this.resendloadingStatus()
			if (error?.response?.data?.error?.message) {
				this.setErrorStatus(error?.response?.data?.error?.message)
			} else {
				this.setErrorStatus("An Unexpected Error occured please, try again later!")
			}

			return error
		}
	}
	@action verifyForgotPasswordOtp = async payload => {
		this.loadingStatus()
		try {
			const { data } = await axios.get(`${API_URL}/users/forgot-password-otp/${this.forgotOtpId?.otp_id}?otp=${payload?.otp}`)

			if (data?.success) {
				// await SecureStore.setItemAsync(REG_KEY, result.data.data.token)
				this.setOtp(payload?.otp)
				this.setSuccessStatus("Congratulations! Your one-time password (OTP) has been successfully verified. You can now proceed to reset your password and regain access to your account")
				this.loadingStatus()
			}
			return data
		} catch (error) {
			this.loadingStatus()
			if (error?.response?.data?.error?.message) {
				this.setErrorStatus("Oops! It seems you've entered an incorrect one-time password (OTP). Please double-check the OTP sent to your registered device and try again")
			} else {
				this.setErrorStatus("An Unexpected Error occured please, try again later!")
			}

			return error
		}
	}
	@action resendOtp = async () => {
		this.loadingStatus()
		const token = await SecureStore.getItemAsync(REG_KEY)
		try {
			if (token) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
				const { data } = await axios.post(`${API_URL}/users/otp`)
				if (data?.success) {
					this.setOtp(payload?.otp)
					this.setSuccessStatus(data.message)
					this.loadingStatus()
				}
			}
			return data
		} catch (error) {
			this.loadingStatus()
			if (error?.response?.data?.error?.message) {
				this.setErrorStatus(error?.response?.data?.error?.message)
			} else {
				this.setErrorStatus("An Unexpected Error occured please, try again later!")
			}

			return error
		}
	}
	@action resetForgottenPassword = async payload => {
		this.loadingStatus()
		let newPayload = { ...payload }
		newPayload.otp = this.otp
		newPayload.otpId = this.forgotOtpId?.otp_id
		delete newPayload.confirm_password
		try {
			const { data } = await axios.post(`${API_URL}/users/password`, newPayload)
			if (data?.success) {
				this.setSuccessStatus("Password successfully updated! You're all set to log in securely")
				this.loadingStatus()
			}
			return data
		} catch (error) {
			this.loadingStatus()
			if (error?.response?.data?.error?.message) {
				this.setErrorStatus(error?.response?.data?.error?.message)
			} else {
				this.setErrorStatus("An Unexpected Error occured please, try again later!")
			}

			return error
		}
	}
}

const authStore = new AuthStore()
export default authStore
