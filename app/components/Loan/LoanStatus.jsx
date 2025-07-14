import { StyleSheet, Text, View } from "react-native"
import React from "react"
import TitleTopSectionLoanOffer from "./LoanOffers/TopInfoSection"
import { useQuery } from "@tanstack/react-query"
import LoanStatusCard from "./LoanOffers/loanStatusCard"
import StatusLabelItem from "./LoanOffers/StatusLabelItem"
import TailoredPackagesCard from "./LoanOffers/TailoredPackagesCard"
import offerStore from "../../mobx/LoanOfferStore"
import loanStore from "../../mobx/LoanStore"
import { observer } from "mobx-react"

const LoanStatus = ({ navigation }) => {
	const { isPending } = useQuery({
		queryKey: ["offers"],
		queryFn: offerStore.getLoanOffers
	})

	const handleFilter = filter => {
		loanStore.setFilter(filter)
		navigation.navigate("filter_loan")
	}

	return (
		<View style={styles.container}>
			<TitleTopSectionLoanOffer navigation={navigation} title="Loan Manager" />
			{offerStore.offers.length <= 0 && <TailoredPackagesCard navigation={navigation} />}
			{offerStore.offers.length > 0 && (
				<LoanStatusCard bgColor="#1DB954" onPress={() => navigation.navigate("LoanOfferScreen")} title="Loan Offers" subtext={`You are eligible for ${offerStore?.offers?.length} loan type`} />
			)}

			<View style={{ marginTop: 10 }}>
				<StatusLabelItem
					bgColor="#F2F9F9"
					titleColor="#002D2D"
					title="Under Review"
					desc="Loan application currently under review"
					icon={1}
					borderColor="#BFDFDF"
					onPress={() => handleFilter("in review")}
				/>
				<StatusLabelItem bgColor="#FEF8EA" titleColor="#002D2D" icon={2} borderColor="#FAEBBE" desc="Loan application currently pending" onPress={() => handleFilter("pending")} />
				<StatusLabelItem bgColor="#F2F4F5" title="Not Approved" icon={3} desc="Loan that doesn't meet requirement " borderColor="#D6DBE0" onPress={() => handleFilter("rejected")} />
			</View>
		</View>
	)
}

export default observer(LoanStatus)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20
	}
})
