import { StyleSheet, View } from "react-native"
import React from "react"
import TitleTopSectionLoanOffer from "./LoanOffers/TopInfoSection"
import { useQuery } from "@tanstack/react-query"
import { observer } from "mobx-react"
import LoanFiltercard from "./LoanOffers/FilterCard"
import loanStore from "../../mobx/LoanStore"
import LoadingModal from "../common/LoadingScreen"
import EmptyData from "../common/EmptyData"

const FilteredLoans = ({ navigation }) => {
	const { isPending, isError, data } = useQuery({
		queryKey: ["filter"],
		queryFn: loanStore.getFilteredLoans
	})

	return (
		<View style={styles.container}>
			<TitleTopSectionLoanOffer
				fontSize={25}
				navigation={navigation}
				title={`${loanStore.filterValue === "in review" ? "Under Review" : loanStore.filterValue === "rejected" ? "Unapproved" : loanStore.filterValue === "pending" ? "Pending" : ""} Loans`}
			/>
			{loanStore.loading_filter && <LoadingModal modalVisible={loanStore.loading_filter} />}
			{!isPending &&
				!isError &&
				data?.data.length > 0 &&
				data.data?.map(loan => (
					<LoanFiltercard
						key={loan?.loan_application?.id}
						duration={loan?.loan_application?.duration}
						interestRate={loan?.interest_rate ? loan?.interest_rate : "0"}
						loanType={loan?.loan_type?.name}
						frequency={loan?.loan_application?.payment_frequency}
						offerAmount={loan?.loan_application?.amount / 100}
						repayment={loan?.loan_application?.amount / 100 + (loan?.loan_application?.amount / 100) * (loan?.interest_rate / 100)}
					/>
				))}
			{!isPending && !isError && data?.data.length <= 0 && <EmptyData />}
		</View>
	)
}

export default observer(FilteredLoans)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20
	}
})
