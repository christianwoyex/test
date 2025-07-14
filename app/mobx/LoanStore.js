import axios from "axios"
import { EXPO_API_URL } from "@env"
import { observable, action, makeAutoObservable, computed } from "mobx"
import { findMinMaxAmount } from "../components/common/pickMinMax"

const API_URL = EXPO_API_URL

export class LoanStore {
	@observable loading = false
	@observable loading_filter = false
	@observable refreshingFilter = false
	@observable filterValue = ""
	@observable openkeypad = false
	@observable refreshingloans = false
	@observable refreshingloantype = false

	@observable applyloading = false
	@observable msgSuccess = ""
	@observable msgError = ""
	@observable applysuccess = false
	@observable applyerror = false
	@observable applyerrorkyc = false
	@observable pickBank = false
	@observable selectLoan = false
	@observable repaymentFreq = ""
	@observable searchText = ""
	@observable pickerError = ""
	@observable purpose = ""
	@observable currentValue = 10000

	@observable repaymentPeriodValue = 3
	@observable maxRepaymentPeriodValue = 52

	@observable loanTypes = []
	@computed loans = []
	@computed banks = []
	@computed searchBanks = []
	@computed selectedLoanType = {}
	@computed pickedBank = {}
	@observable selectDetail = {}
	@observable minMax = { minimum_amount: 100000, maximum_amount: 5000000 }

	constructor() {
		makeAutoObservable(this)
	}
	@action clearAppyFields = () => {
		this.selectedLoanType = {}
		this.purpose = ""
		this.repaymentFreq = ""
		this.currentValue = 10000
		this.repaymentPeriodValue = 3
	}
	@action loadingStatus = () => {
		this.loading = !this.loading
	}
	@action toggleRefreshingTypes = () => {
		this.refreshingloantype = !this.refreshingloantype
	}
	@action setUserLoanTypes = data => {
		this.loanTypes = data
	}
	@action setMinMaxAmount = data => {
		this.minMax = data
	}
	@action setUserLoans = data => {
		this.loans = data
	}
	@action setRepayFreq = txt => {
		this.repaymentFreq = txt
		if (txt === "Weekly") {
			this.maxRepaymentPeriodValue = 52
			this.repaymentPeriodValue = 12
		} else {
			this.maxRepaymentPeriodValue = 24
			this.repaymentPeriodValue = 3
		}
	}
	@action setLoanPurpose = text => {
		this.purpose = text
	}
	@action setPickBank = () => {
		this.pickBank = !this.pickBank
	}
	@action setSearchText = text => {
		this.searchText = text
	}
	@action setSearchBanks = data => {
		this.searchBanks = data
	}
	@action setPickSingleBank = data => {
		this.pickedBank = data
		this.pickBank = false
	}
	@action setSelectLoan = () => {
		this.selectLoan = !this.selectLoan
	}
	@action setSelectLoanTypeDetails = data => {
		this.selectDetail = data
	}
	@action setSelectedLoanType = data => {
		this.selectedLoanType = data
		this.setSelectLoan()
		this.setPickerError("")
	}

	@action setSelectedLoanTypeFromDetails = data => {
		this.selectedLoanType = data
		this.setPickerError("")
	}
	@action setCurrentValue = data => {
		this.currentValue = data
	}
	@action setRepaymentPeriodValue = data => {
		this.repaymentPeriodValue = data
	}
	@action setPickerError = data => {
		this.pickerError = data
	}
	@action setBanks = data => {
		this.banks = data
	}

	@action toggleApplyLoadingStatus = () => {
		this.applyloading = !this.applyloading
	}
	@action toggleApplyErrorStatus = () => {
		this.applyerror = !this.applyerror
	}
	@action toggleApplyErrorKycStatus = () => {
		this.applyerrorkyc = !this.applyerrorkyc
	}
	@action toggleApplySucceessStatus = () => {
		this.applysuccess = !this.applysuccess
	}

	@action setApplyErrorMessage = msg => {
		this.msgError = msg
		this.toggleApplyErrorStatus()
	}
	@action setApplyErrorKycMessage = msg => {
		this.msgError = msg
		this.toggleApplyErrorKycStatus()
	}
	@action setApplySuccessMsg = msg => {
		this.msgSuccess = msg
	}
	@action clearApplyError = () => {
		this.applyerror = false
		this.msgError = ""
	}
	@action clearApplyErrorKyc = () => {
		this.applyerrorkyc = false
		this.msgError = ""
	}
	@action setFilter = txt => {
		this.filterValue = txt
	}
	@action clearApplySuccess = () => {
		this.applysuccess = false
		this.msgSuccess = ""
	}
	@action toggleLoansRefreshing = () => {
		this.refreshingloans = !this.refreshingloans
	}

	@action toggleFilterLoading = () => {
		this.loading_filter = !this.loading_filter
	}
	@action toggleFilterLoadingRefresh = () => {
		this.refreshingFilter = !this.refreshingFilter
	}

	@action getLoanTypes = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/loans/types`)

			this.setUserLoanTypes(data?.data)
			if (data?.success) {
			}
			return data
		} catch (error) {
			return error
		}
	}
	@action toggleOpenKeypad = () => {
		this.openkeypad = !this.openkeypad
	}
	@action refreshLoanTypes = async () => {
		this.toggleRefreshingTypes()
		try {
			const { data } = await axios.get(`${API_URL}/loans/types`)

			if (data?.success) {
				this.setUserLoanTypes(data?.data)
				this.toggleRefreshingTypes()
			}
			return data
		} catch (error) {
			this.toggleRefreshingTypes()
			return error
		}
	}
	@action getLoanTypesDetails = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/loans/types/${this.selectDetail?.id}`)
			return data
		} catch (error) {
			return error
		}
	}

	@action getLoanTypesDetailsMain = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/loans/types/${this.selectedLoanType?.id}`)
			if (data?.success) {
				const minmaxValue = findMinMaxAmount(data?.data?.interest_rates)
				let newvalues = { ...minmaxValue }

				newvalues.minimum_amount = newvalues.minimum_amount <= 8000 ? 1000000 : newvalues.minimum_amount
				this.setMinMaxAmount(newvalues)
			}
			return data
		} catch (error) {
			return error
		}
	}
	//User loans
	@action getUserLoans = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/loans?status=active`)

			if (data.success) {
				this.setUserLoans(data.data)
			}
			return data
		} catch (error) {
			return error
		}
	}

	@action getFilteredLoans = async () => {
		this.toggleFilterLoading()
		try {
			const { data } = await axios.get(`${API_URL}/loans/offers?status=${this.filterValue}`)
			if (data?.success) {
				this.toggleFilterLoading()
			}
			return data
		} catch (error) {
			this.toggleFilterLoading()
			return error
		}
	}
	@action getFilteredLoansRefresh = async () => {
		this.toggleFilterLoadingRefresh()
		try {
			const { data } = await axios.get(`${API_URL}/loans/offers?status=${this.filterValue}`)

			if (data?.success) {
				this.toggleFilterLoadingRefresh()
			}
			return data
		} catch (error) {
			this.toggleFilterLoadingRefresh()
			return error
		}
	}
	@action getUserLoansRefreshing = async () => {
		this.toggleLoansRefreshing()
		try {
			const { data } = await axios.get(`${API_URL}/loans?status=active`)

			if (data.success) {
				this.toggleLoansRefreshing()
				this.setUserLoans(data.data)
			}
			return data
		} catch (error) {
			this.toggleLoansRefreshing()
			return error
		}
	}

	@action searchBanksByName(bankName) {
		this.setSearchText(bankName)

		const foundItems = this.banks.filter(bank => bank?.name.toLowerCase().includes(bankName.toLowerCase()))
		this.setSearchBanks(foundItems)
	}
	@action getBankList = async url => {
		try {
			const { data } = await axios.get(url)

			const newData = [...this.banks, ...data.data]
			if (data.success) {
				this.setBanks(newData)
			}

			if (data.metadata?.next) {
				// Extract the URL for the next page

				const { data: newbanks } = await this.getBankList(`${API_URL}/bank-accounts/bank-list?next=${data.metadata?.next}`)
				const newUp = [...this.banks, newbanks.data]
				this.setBanks(newUp)
				return this.banks
			} else {
				this.setBanks(newData)
				return newData
			}
		} catch (error) {
			return error
		}
	}
	@action callBanksRecursive = async () => {
		try {
			const response = await this.getBankList(`${API_URL}/bank-accounts/bank-list`)
			return response
		} catch (error) {
			return error
		}
	}
	@action appyLoan = async payload => {
		this.toggleApplyLoadingStatus()
		try {
			const { data } = await axios.post(`${API_URL}/loans/loan-applications`, payload)
			if (data.success) {
				this.toggleApplyLoadingStatus()
				this.toggleApplySucceessStatus()
				this.setApplySuccessMsg("Your loan application has been successfully submitted. We'll be in touch shortly.")
			}
			return data
		} catch (error) {
			this.toggleApplyLoadingStatus()

			if (error && !error?.response?.data) {
				this.setApplyErrorMessage("An unexpected error occurred,while submiting your loan request, please try again later")
				return { success: false, message: "Something failed" }
			}

			if (
				error.response.data.error.message.includes("KYC") ||
				error.response.data.error.message.includes("profile") ||
				error.response.data.error.message.includes("bussiness") ||
				error.response.data.error.message.includes("dob") ||
				error.response.data.error.message.includes("bank")
			) {
				this.setApplyErrorKycMessage(error.response.data.error.message)
			}
			if (
				!error.response.data.error.message.includes("profile") &&
				!error.response.data.error.message.includes("KYC") &&
				!error.response.data.error.message.includes("bussiness") &&
				!error.response.data.error.message.includes("dob") &&
				!error.response.data.error.message.includes("bank")
			) {
				this.setApplyErrorMessage(error.response.data.error.message)
				return { ...error.response.data }
			}

			return error
		}
	}
}

const loanStore = new LoanStore()
export default loanStore
