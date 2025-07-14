import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import loanStore from "../../mobx/LoanStore"
import { IconOtherLoan, IconStartupLoan } from "../../../assets/icons"
import RequestLoanTypeButton from "../Home/LoanRequestButtonBottomSheet"

const SelectLoanTypesModal = ({ modalVisible = false, setModalVisible, onRequestClose }) => {
	const queryClient = useQueryClient()
	const { isPending, error, data, refetch } = useQuery({
		queryKey: ["loantypes"],
		queryFn: loanStore.getLoanTypes
	})

	// console.log(loanStore.selectedLoanType)
	return (
		<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onRequestClose}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={{ height: 5, width: 60, marginBottom: 10, borderRadius: 30, backgroundColor: "#D9D9D9" }}></View>
					<Text style={styles.textStyle}>Select Loan Type</Text>
					<ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 10, width: "100%", height: "85%", backgroundColor: "white" }}>
						<View style={{ paddingBottom: 40 }}>
							{loanStore?.loanTypes?.map((loanType, idx) => (
								<RequestLoanTypeButton
									title={loanType?.name}
									onPress={() => {
										loanStore.setSelectedLoanType(loanType)
										setTimeout(() => {
											queryClient.invalidateQueries({ queryKey: ["select-type-details"] })
										}, 2000)
									}}
									key={loanType?.id}
									icon={loanType?.name.includes("Start") ? <IconStartupLoan /> : <IconOtherLoan />}
								/>
								// <TouchableOpacity
								// 	style={{ height: 30, width: "100%", justifyContent: "center", backgroundColor: "#fff", marginVertical: 2, borderRadius: 12 }}
								// 	key={loanType?.id}
								// 	onPress={() => loanStore.setSelectedLoanType(loanType)}
								// >
								// 	<Text style={{ fontFamily: "Inter-Regular", fontSize: 14, color: "#000" }}>{loanType?.name}</Text>
								// </TouchableOpacity>
							))}
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

export default observer(SelectLoanTypesModal)

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "flex-end"

		// padding: 20
	},
	modalView: {
		margin: 0,
		width: "100%",
		height: "70%",
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 0,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		marginTop: 20
		// elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF"
	},
	buttonClose: {
		backgroundColor: "transparent"
	},
	textStyle: {
		color: "black",
		fontWeight: "bold",
		fontFamily: "Inter-Regular",
		fontSize: 16,
		textAlign: "justify"
	},
	textDesc: {
		color: "#2E2E2E",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 22,
		textAlign: "justify",
		marginLeft: 5
	},

	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	okButtonText: {
		color: "#1DB954",
		textAlign: "center",
		fontFamily: "Inter-SemiBold",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "500",
		letterSpacing: -0.02
	}
})
