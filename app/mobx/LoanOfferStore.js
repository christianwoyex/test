import axios from "axios"
import { EXPO_API_URL } from "@env"
import { observable, action, makeAutoObservable, computed } from "mobx"

const API_URL = EXPO_API_URL

class OfferStore {
	@observable loading = false
	@observable cardinserted = false
	@observable refreshingOffers = false
	@observable refreshing_offer_details = false

	@observable addguarantorError = false
	@observable loadingaddguarantor = false
	@observable msgAddGuarantorError = ""

	@observable loadingsubmitoffer = false
	@observable submitoffererror = false
	@observable submitoffersuccess = false

	@observable loadingInitiate = false
	@observable initiateError = false
	@observable loadingVerify = false
	@observable verifyerror = false
	@observable verifysuccess = false
	@observable msgVerifySuccess = ""
	@observable msgVerifyError = ""
	@observable msgSubmitOfferSuccess = ""
	@observable msgSubmitOfferError = ""
	@observable msgInitiateError = ""
	@observable loadingofferdetails = false
	@observable isoffer = false
	@observable isOpen = false
	@observable repstatus = false
	@observable offers = []
	@observable offerdetails = {}
	@observable selectedOffer = {}
	@observable selectedOfferDetails = {}
	@observable guarantor = {}
	@observable repayMethod = {}
	@observable repayCheckOutMethod = {}
	@observable repaymentData = {}
	@observable offerDetailsMain = {}

	constructor() {
		makeAutoObservable(this)
	}
	@action loadingStatus = () => {
		this.loading = !this.loading
	}

	@action setOffers = data => {
		this.offers = data
	}
	@action setGuarantor = data => {
		this.guarantor = data
	}
	@action setRepaymentData = data => {
		this.repaymentData = data
	}
	@action setRepStatus = data => {
		this.repstatus = !this.repstatus
	}
	@action setSelectedOffermain = details => {
		this.selectedOffer = details
		this.selectedOfferDetails = details
	}

	@action setSelectedOfferDetails = data => {
		this.selectedOfferDetails = data
	}
	@action setOfferDetailsMain = data => {
		this.offerDetailsMain = data
	}
	@action setCardInserted = data => {
		this.cardinserted = data
	}

	@action toggleInitialize = () => {
		this.loadingInitiate = !this.loadingInitiate
	}
	@action toggleInitializeError = msg => {
		this.initiateError = !this.initiateError
		this.msgInitiateError = msg
	}

	@action toggleVerifyError = msg => {
		this.verifyerror = !this.verifyerror
		this.msgVerifyError = msg
	}

	@action toggleVerifySuccess = msg => {
		this.verifysuccess = !this.verifysuccess
		this.msgVerifySuccess = msg
	}
	@action toggleSubmiterOfferError = msg => {
		this.submitoffererror = !this.submitoffererror
		this.msgSubmitOfferError = msg
	}

	@action toggleSubmitOfferSuccess = msg => {
		this.submitoffersuccess = !this.submitoffersuccess
		this.msgSubmitOfferSuccess = msg
	}

	@action toggleAddGuarantorError = msg => {
		this.addguarantorError = !this.addguarantorError
		this.msgAddGuarantorError = msg
	}
	@action toggleVerify = () => {
		this.loadingVerify = !this.loadingVerify
	}
	@action toggleGuarantor = () => {
		this.loadingaddguarantor = !this.loadingaddguarantor
	}
	@action toggleSubmitOffer = () => {
		this.loadingsubmitoffer = !this.loadingsubmitoffer
	}
	@action toggleRefreshingOffers = () => {
		this.refreshingOffers = !this.refreshingOffers
	}
	@action toggleRefreshDetails = () => {
		this.refreshing_offer_details = !this.refreshing_offer_details
	}
	@action getLoanOffers = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/loans/offers`)
			if (data?.success) {
				this.setOffers(data.data)
			}
			return data
		} catch (error) {
			return error
		}
	}
	@action getLoanOffersRefresh = async () => {
		this.toggleRefreshingOffers()
		try {
			const { data } = await axios.get(`${API_URL}/loans/offers`)

			if (data?.success) {
				this.toggleRefreshingOffers()
				this.setOffers(data.data)
			}
			return data
		} catch (error) {
			this.toggleRefreshingOffers()
			return error
		}
	}

	@action getLoanOffersDetails = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/loans/offers/${this.selectedOfferDetails?.id}`)

			if (data?.success) {
				this.setOfferDetailsMain(data?.data)

				if (data?.data?.guarantors.length > 0) {
					setTimeout(() => {
						let guarantorss = {
							name1: this.offerDetailsMain?.guarantors[0]?.name,
							name2: this.offerDetailsMain?.guarantors[1]?.name,
							email1: this.offerDetailsMain?.guarantors[0]?.email,
							email2: this.offerDetailsMain?.guarantors[1]?.email,
							relationship1: this.offerDetailsMain?.guarantors[0]?.relationship,
							relationship2: this.offerDetailsMain?.guarantors[1]?.relationship,
							occupation1: this.offerDetailsMain?.guarantors[0]?.occupation,
							occupation2: this.offerDetailsMain?.guarantors[1]?.occupation,
							phone1: this.offerDetailsMain?.guarantors[0]?.phone,
							phone2: this.offerDetailsMain?.guarantors[1]?.phone
						}
						this.setGuarantor(guarantorss)
					}, 2000)
				}
			}
			return data
		} catch (error) {
			return error
		}
	}
	@action getLoanOffersDetailsRefresh = async () => {
		this.toggleRefreshDetails()
		try {
			const { data } = await axios.get(`${API_URL}/loans/offers/${this.selectedOfferDetails?.id}`)

			if (data?.success) {
				this.toggleRefreshDetails()
				this.setOfferDetailsMain(data?.data)
				if (data?.data?.guarantors.length > 0) {
					let guarantorss = {
						name1: this.offerDetailsMain?.guarantors[0]?.name,
						name2: this.offerDetailsMain?.guarantors[1]?.name,
						email1: this.offerDetailsMain?.guarantors[0]?.email,
						email2: this.offerDetailsMain?.guarantors[1]?.email,
						relationship1: this.offerDetailsMain?.guarantors[0]?.relationship,
						relationship2: this.offerDetailsMain?.guarantors[1]?.relationship,
						occupation1: this.offerDetailsMain?.guarantors[0]?.occupation,
						occupation2: this.offerDetailsMain?.guarantors[1]?.occupation,
						phone1: this.offerDetailsMain?.guarantors[0]?.phone,
						phone2: this.offerDetailsMain?.guarantors[1]?.phone
					}
					this.setGuarantor(guarantorss)
				}
			}
			return data
		} catch (error) {
			this.toggleRefreshDetails()
			return error
		}
	}
	@action addGuarantorLoanOffer = async () => {
		this.toggleGuarantor()

		try {
			const { data } = await axios.post(`${API_URL}/loans/offers/${this.selectedOfferDetails?.id}/guarantors`, this.guarantor)

			if (data?.success) {
				this.toggleGuarantor()
				this.submitOffer()
			}
			return data
		} catch (error) {
			this.toggleGuarantor()

			this.toggleAddGuarantorError("An error occurred while submitting your selected offer please, try again later")
			return error
		}
	}

	@action initiatePayment = async () => {
		this.toggleInitialize()
		try {
			const { data } = await axios.post(`${API_URL}/loans/offers/${this.selectedOfferDetails?.id}/payment`)
			if (data?.success) {
				this.toggleInitialize()
				this.setRepaymentData(data.data)
				this.setRepStatus()
			}
			return data
		} catch (error) {
			this.toggleInitialize()
			if (error?.response?.data?.error?.message) {
				this.toggleInitializeError(error?.response?.data?.error?.message)
			} else {

			this.toggleInitializeError("An error occured while initiating add card, please try again later")
			}
			return error
		}
	}

	@action verifyPayment = async payload => {
		this.toggleVerify()
		try {
			const { data } = await axios.get(`${API_URL}/loans/offers/${this.selectedOfferDetails?.id}/payment?ref=${payload.reference}`)

			if (data?.success) {
				this.setCardInserted(true)
				this.toggleVerify()
				this.toggleVerifySuccess("Your card has been successfully verified, please procceed to submit your selected offer.")
			}
			return data
		} catch (error) {
			this.toggleVerify()
			this.toggleVerifyError("An error occurred while verifying your card, please try again")
			return error
		}
	}

	@action submitOffer = async () => {
		this.toggleSubmitOffer()
		try {
			const { data } = await axios.post(`${API_URL}/loans/offers/${this.selectedOfferDetails?.id}/accept`)
			if (data?.success) {
				this.toggleSubmitOffer()
				this.setCardInserted(false)
				this.toggleSubmitOfferSuccess("Your loan offer has been successfully submitted. We'll be in touch shortly.")
			}
			return data
		} catch (error) {
			this.toggleSubmitOffer()
			if (error.response?.data && !error.response?.data?.success) {
				this.toggleSubmiterOfferError(error.response?.data?.error?.message)
			} else {
				this.toggleSubmiterOfferError("An error occurred while submitting your selected loan offer card, please try again later")
			}
			return error
		}
	}
}

const offerStore = new OfferStore()

export default offerStore
