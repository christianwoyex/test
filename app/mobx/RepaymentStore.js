import axios from "axios"
import { EXPO_API_URL } from "@env"
import { observable, action, makeAutoObservable, computed } from "mobx"

const API_URL = EXPO_API_URL
export class RepaymentStore {
	@observable pledgeInitiateloading = false
	@observable pledgeverifyloading = false
	@observable pledgerror = false
	@observable initiate_success = false
	@observable pledgverifyerror = false
	@observable pledgverifysuccess = false
	@observable msgPledge = ""
	@observable pledgePaymentData = {}

	@observable repayloading = false
	@observable msgSuccess = ""
	@observable msgError = ""
	@observable repaysuccess = false
	@observable repayerror = false
	@observable loading = false
	@observable refreshing = false
	constructor() {
		makeAutoObservable(this)
	}
	@action toggleRefresh = () => {
		this.refreshing = !this.refreshing
	}
	@action toggleRepayLoading = () => {
		this.repayloading = !this.repayloading
	}
	@action toggleSuccess = msg => {
		this.repaysuccess = !this.repaysuccess
		this.msgSuccess = msg
	}
	@action toggleError = msg => {
		this.repayerror = !this.repayerror
		this.msgError = msg
	}
	@action togglePledgeError = msg => {
		this.pledgerror = !this.pledgerror
		this.msgPledge = msg
	}
	@action togglePledgeVeryError = msg => {
		this.pledgverifyerror = !this.pledgverifyerror
		this.msgPledge = msg
	}
	@action togglePledgeVerySuccess = msg => {
		this.pledgverifysuccess = !this.pledgverifysuccess
		this.msgPledge = msg
	}
	@action setPayPledgeData = payload => {
		this.pledgePaymentData = payload
	}
	@action toggleInitiatePledgeStatus = () => {
		this.initiate_success = !this.initiate_success
	}
	@action toggleClearPledgeError = () => {
		this.pledgerror = false
		this.msgPledge = ""
	}

	@action toggleInitiatePayment = () => {
		this.pledgeInitiateloading = !this.pledgeInitiateloading
	}
	@action toggleVerifyPayment = () => {
		this.pledgeverifyloading = !this.pledgeverifyloading
	}

	@action getUserRepayments = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/repayments`)
			return data
		} catch (error) {
			return error
		}
	}
	@action getUserRepaymentsPulltoRefresh = async () => {
		this.toggleRefresh()
		try {
			const { data } = await axios.get(`${API_URL}/repayments`)

			if (data?.success) {
				this.toggleRefresh()
			}
			return data
		} catch (error) {
			this.toggleRefresh()
			return error
		}
	}
	@action repayLoan = async () => {
		this.toggleRepayLoading()
		try {
			const { data } = await axios.post(`${API_URL}/repayments/pay`)

			if (data?.success) {
				this.toggleRepayLoading()
				this.toggleSuccess("Your loan repayment operation was successfully!")
			}
			return data
		} catch (error) {
			this.toggleRepayLoading()
			if (error && !error?.response?.data) {
				this.toggleError("An unexpected error occurred while processing your loan repayment, please try again later")
				return { success: false, message: "Something failed" }
			}
			if (error.response.data) {
				if (error.response.data?.error.message) {
					this.toggleError("Oops! an error occurred while processing your loan repayment, please try again later")
				}
				return { ...error?.response?.data }
			}

			return error
		}
	}

	@action pledgeInitiatePayment = async payload => {
		this.toggleInitiatePayment()
		try {
			const { data } = await axios.post(`${API_URL}/pledges`, payload)
			
			if (data?.success) {
				this.toggleInitiatePayment()
				this.toggleInitiatePledgeStatus()
				this.setPayPledgeData(data?.data)
			}
			return data
		} catch (error) {
			this.toggleInitiatePayment()
			if (error && !error?.response?.data) {
				this.togglePledgeError("An unexpected error occurred while initiating transaction for your pledge, please try again later")
				return { success: false, message: "Something failed" }
			}
			if (error.response.data) {
				if (error.response.data?.error.message) {
					this.togglePledgeError("Oops! an error occurred while processing your loan repayment, please try again later")
				}
				return { ...error?.response?.data }
			}

			return error
		}
	}
	@action pledgeVerifyPayment = async payload => {
		this.toggleVerifyPayment()
		try {
			const { data } = await axios.post(`${API_URL}/pledges/payment-verification`, payload)
			if (data?.success) {
				this.toggleVerifyPayment()
				this.togglePledgeVerySuccess("Thank you for contributing to support emerging entreprenuers, your support is deeply appreciated")
			}
			return data
		} catch (error) {
			this.toggleVerifyPayment()
			if (error && !error?.response?.data) {
				this.togglePledgeVeryError("An unexpected error occurred while initiating transaction for your pledge, please try again later")
				return { success: false, message: "Something failed" }
			}
			if (error.response.data) {
				if (error.response.data?.error.message) {
					this.togglePledgeVeryError("Oops! an error occurred while processing your loan repayment, please try again later")
				}
				return { ...error?.response?.data }
			}

			return error
		}
	}
}

const repaymentStore = new RepaymentStore()

export default repaymentStore
