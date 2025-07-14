import { Dimensions, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TouchableHighlight } from "react-native"
import React from "react"
import AppColors from "../../config/colors"
import { observer } from "mobx-react"
import loanStore from "../../mobx/LoanStore"
import LoadingModal from "../common/LoadingScreen"
import { useQuery } from "@tanstack/react-query"
const { width, height } = Dimensions.get("window")
const EquityFinancing = ({ navigation }) => {
	const {
		isPending,
		error,
		data: loanProduct,
		refetch
	} = useQuery({
		queryKey: ["loantype-details"],
		queryFn: loanStore.getLoanTypesDetails
	})

	const handleApplyNow = () => {
		loanStore.setSelectedLoanTypeFromDetails(loanProduct?.data)
		navigation.navigate("LoanSelectionScreen")
	}
	return (
		<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
			{isPending && <LoadingModal modalVisible={isPending} />}
			<View style={styles.topImageBg}>
				<Image source={require("../../../assets/images/equityfinancing.png")} />
			</View>
			<View style={{ marginTop: 20 }}>
				<Text style={styles.titleText}>{loanProduct?.data?.name}</Text>
				<Text
					style={[
						styles.descText,
						{
							display: loanProduct?.data?.name.includes("Equity") ? "flex" : loanProduct?.data?.name.includes("SME") ? "flex" : loanProduct?.data?.name.includes("Local Purchase") ? "flex" : "none"
						}
					]}
				>
					{loanProduct?.data?.name.includes("Equity")
						? "Empower Your Business with Equity Financing"
						: loanProduct?.data?.name.includes("SME")
						? "Raise capital for your small business"
						: loanProduct?.data?.name.includes("Local Purchase")
						? "Streaming Procurement with Seedng LPO"
						: "Streaming Procurement with Seedng LPO"}
				</Text>
			</View>
			<View style={{ marginTop: 20, marginBottom: 30 }}>
				<Text style={styles.paragraph}>{loanProduct?.data?.description}</Text>
			</View>

			<View style={styles.bottomSection}>
				<TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={() => handleApplyNow()}>
					<Text style={styles.btnText}>Apply Now</Text>
				</TouchableOpacity>
				<TouchableHighlight style={styles.buttonOutline} onPress={() => console.log("Continue Sales")}>
					<Text style={styles.btnTextOutline}>Contact Sales</Text>
				</TouchableHighlight>
			</View>
		</ScrollView>
	)
}

export default observer(EquityFinancing)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: "#FFFFFF"
	},
	topImageBg: {
		height: 215,
		// height / 3.5,
		borderRadius: 15,
		width: "100%",
		backgroundColor: "#F3EAFC",
		borderColor: "#DBBDF6",
		borderWidth: 1,
		display: "flex",
		marginTop: 16,
		flexDirection: "column",
		justifyContent: "space-between",
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		paddingBottom: 20
	},
	titleText: {
		color: "#3E1366",
		fontFamily: "Inter-Regular",
		fontSize: 28,
		fontStyle: "normal",
		fontWeight: "500"
	},
	descText: {
		color: "#666666",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300",
		letterSpacing: -0.015
	},
	paragraph: {
		color: "#575757",
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "400",
		letterSpacing: -0.2,
		lineHeight: 24,
		textAlign: "justify"
	},
	bottomSection: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 40
	},
	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		height: 55,
		color: "#FFF",
		width: "100%",
		backgroundColor: "#8A2BE2",
		marginBottom: 20
	},
	btnText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#FFF"
	},
	buttonOutline: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#8A2BE2",
		height: 55,
		color: "#FFF",
		width: "100%",
		backgroundColor: "transparent"
	},
	btnTextOutline: {
		color: "#525252",
		fontSize: 16,
		fontWeight: "bold"
	}
})
