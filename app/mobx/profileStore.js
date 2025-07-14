/*** src/Store.js ***/

import axios from "axios"
import { observable, action, makeAutoObservable, computed } from "mobx"
import { EXPO_API_URL } from "@env"

const API_URL = EXPO_API_URL

export class ProfileStore {
	@observable image = null
	@observable loading = false
	@observable upload_suceess = false
	@observable msgSuccess = ""
	@observable upload_error = false
	@observable msgError = ""

	@observable uploadingdp = false
	@observable uploadProgress = 0
	@observable passwordloading = false
	@observable passworderror = false
	@observable passwordsuccess = false
	@observable error = false
	@observable success = false
	@observable errorValue = ""
	@observable successValue = ""
	@observable businessInfo = {}
	@observable accountInfo = {}

	constructor() {
		makeAutoObservable(this)
	}

	@action setImage = image => {
		this.image = image
	}
	@action setUploadPress = progress => {
		this.uploadProgress = progress
	}
	@action loadingStatus = () => {
		this.loading = !this.loading
	}
	@action setErrorStatus = error => {
		this.errorValue = error
		this.error = !this.error
	}
	@action setPasswordErrorStatus = error => {
		this.errorValue = error
		this.passworderror = !this.passworderror
	}
	@action setSuccessStatus = msg => {
		this.successValue = msg
		this.success = !this.success
	}
	@action setPasswordSuccessStatus = msg => {
		this.successValue = msg
		this.passwordsuccess = !this.passwordsuccess
	}
	@action clearSuccessStatus = () => {
		this.successValue = ""
		this.success = false
	}
	@action clearErrorStatus = () => {
		this.errorValue = ""
		this.error = false
	}
	@action clearPasswordSuccessStatus = () => {
		this.successValue = ""
		this.passwordsuccess = false
	}
	@action clearPasswordErrorStatus = () => {
		this.errorValue = ""
		this.passworderror = false
	}
	@action setBusinessInfo = data => {
		this.businessInfo = data
	}
	@action setAccountInfo = data => {
		this.accountInfo = data
	}
	@action togglePasswordLoading = () => {
		this.passwordloading = !this.passwordloading
	}
	@action toggleUploadDpLoading = () => {
		this.uploadingdp = !this.uploadingdp
	}
	@action setUploadSuccess = msg => {
		if (!msg) {
			this.setUploadPress(0)
		}
		this.upload_suceess = !this.upload_suceess
		this.msgSuccess = msg
	}
	@action setUploadError = msg => {
		this.setUploadPress(0)
		this.upload_error = !this.upload_error
		this.msgError = msg
	}
	@action updatePersonalDetails = async payload => {
		this.loadingStatus()
		try {
			const { data } = await axios.patch(`${API_URL}/users/me`, payload)
			if (data?.data) {
				this.setSuccessStatus(data.message)
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

	@action updatePersonalIDentification = async payload => {
		this.loadingStatus()
		try {
			const { data } = await axios.post(`${API_URL}/users/identity-verification`, payload)
			if (data?.success) {
				this.setSuccessStatus(data.message)
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

	@action changePassword = async payload => {
		this.togglePasswordLoading()
		try {
			const { data } = await axios.patch(`${API_URL}/users/password`, payload)
			if (data.success) {
				this.setPasswordSuccessStatus(data.message)
				this.togglePasswordLoading()
			}

			return data
		} catch (error) {
			this.togglePasswordLoading()
			if (error?.response?.data?.error?.message) {
				this.setPasswordErrorStatus(error?.response?.data?.error?.message)
			} else {
				this.setPasswordErrorStatus("An Unexpected Error occured please, try again later!")
			}
			return error
		}
	}

	@action updateProfileImage = async payload => {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			transformRequest: () => {
				return payload
			},
			onUploadProgress: ({ loaded, total }) => {
				this.setUploadPress(loaded / total)
				
			}
		}
		try {
			this.toggleUploadDpLoading()
			const { data } = await axios.patch(`${API_URL}/users/me/profile-image`, payload, config)
			
			if (data?.success) {
				this.toggleUploadDpLoading()
				this.setUploadSuccess(data?.message)
			}
			return data
		} catch (error) {
			console.log(error)
			this.toggleUploadDpLoading()
			if (error.response.data.message) {
				this.setUploadError(error.response.data.message)
			} else {
				this.setUploadError("An unexpected error occured while upload your display photograph, please try again later")
			}
			return error
		}
	}

	@action getBusinessDetails = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/business`)

			this.setBusinessInfo(data?.data)
			return data
		} catch (error) {
			return error
		}
	}

	@action createBusinessDetails = async payload => {
		this.loadingStatus()
		try {
			const { data } = await axios.post(`${API_URL}/business`, payload)
			if (data?.success) {
				this.setSuccessStatus(data.message)
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

	@action updateBusinessData = async payload => {
		this.loadingStatus()
		try {
			const { data } = await axios.patch(`${API_URL}/business`, payload)
			if (data?.success) {
				this.setSuccessStatus(data.message)
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

	@action updateBusinessDocs = async payload => {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				Accept: "application/json"
			},
			method: "PATCH",
			body: payload,
			onUploadProgress: ({ loaded, total }) => {
				this.setUploadPress(loaded / total)
			}
		}
		this.loadingStatus()
		try {
			const { data } = await axios.patch(`${API_URL}/business/document`, payload, config)

			if (data.success) {
				this.setSuccessStatus(data.message)
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

	@action getBankList = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/bank-accounts/bank-list`)
			if (data.metadata?.next) {
				let { data } = await axios.get(`${API_URL}/bank-accounts/bank-list?next=${data.metadata?.next}`)
			}
			return data
		} catch (error) {
			return error
		}
	}

	@action validateAccount = async payload => {
		try {
			const { data } = await axios.get(`${API_URL}/bank-accounts/validate?accountNumber=${payload.accountNumber}&bankCode=${payload.bankCode}`)
			if (data?.success) {
				// this.setSuccessStatus(data.message)
			}
			return data
		} catch (error) {
			// this.loadingStatus()
			// if (error?.response?.data?.error?.message) {
			// 	this.setErrorStatus(error?.response?.data?.error?.message)
			// } else {
			// 	this.setErrorStatus("An Unexpected Error occured please, try again later!")
			// }
			return error
		}
	}
	@action addAccountInfo = async payload => {
		this.loadingStatus()
		try {
			const { data } = await axios.post(`${API_URL}/bank-accounts`, payload)
			if (data?.success) {
				this.setSuccessStatus(data.message)
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
	@action updateAccountInfo = async payload => {
		this.loadingStatus()
		try {
			const { data } = await axios.put(`${API_URL}/bank-accounts`, payload)
			if (data?.success) {
				this.setSuccessStatus(data.message)
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

	@action getAccountInfo = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/bank-accounts`)

			if (data?.success) {
				this.setAccountInfo(data.data)
			}
			return data
		} catch (error) {
			return error
		}
	}

	@action uploadBankStatement = async payload => {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				Accept: "application/json"
			},
			method: "POST",
			body: payload,
			transformRequest: () => {
				return payload
			},
			onUploadProgress: ({ loaded, total }) => {
				this.setUploadPress(loaded / total)
			}
		}
		try {
			this.toggleUploadDpLoading()
			const { data } = await axios.post(`${API_URL}/users/bank-statement`, payload, config)
			if (data.success) {
				this.setUploadSuccess(data.message)
				this.toggleUploadDpLoading()
			}

			return data
		} catch (error) {
			this.toggleUploadDpLoading()
			if (error?.response?.data?.error?.message) {
				this.setUploadError(error?.response?.data?.error?.message)
			} else {
				this.setUploadError("An Unexpected Error occured while uploading your bank statement, please try again later!")
			}
			return error
		}
	}
}

const profileStore = new ProfileStore()
export default profileStore
