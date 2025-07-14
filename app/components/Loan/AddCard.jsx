import { StyleSheet, Text, View, FlatList, Image } from "react-native"
import React from "react"
import TitleTopSectionLoanOffer from "./LoanOffers/TopInfoSection"
import AddCardForm from "./LoanOffers/AddCardForm"

const AddCard = () => {
	const data = [
		{ key: "1", image: require("../../../assets/images/visa.png") },
		{ key: "2", image: require("../../../assets/images/master.png") },
		{ key: "3", image: require("../../../assets/images/verve.png") }
	]

	return (
		<View style={styles.container}>
			<View style={{ marginTop: 20 }}>
				<TitleTopSectionLoanOffer title="Add Payment Card" subtitle="You've chosen Recurring Card Payments for your repayment method." />
			</View>
			<View style={styles.cardTypesView}>
				<Text style={styles.creditOrDebit}>Credit or debit card</Text>
				<View style={styles.supportedCards}>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						data={data}
						keyExtractor={item => item.key}
						renderItem={({ item }) => <Image style={{ marginRight: 10, marginTop: item.key === "1" ? 4 : 0 }} source={item.image} />}
					/>
				</View>
			</View>
			<AddCardForm />
		</View>
	)
}

export default AddCard

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	},
	cardTypesView: {
		width: "100%",
		marginTop: 20
	},
	creditOrDebit: {
		fontFamily: "Inter-Regular",
		color: "#000000",
		fontSize: 14,
		fontWeight: "400",
		lineHeight: 17,
		letterSpacing: 0,
		textAlign: "left"
	},
	supportedCards: {
		display: "flex",
		height: 40,
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		marginTop: 10,
		// backgroundColor:"red",
		gap: 20
	}
})
