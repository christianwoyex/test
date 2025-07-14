import { Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import { observer } from "mobx-react"
import loanStore from "../../mobx/LoanStore"
import { IconStartupLoan } from "../../../assets/icons"
import RequestLoanTypeButton from "../Home/LoanRequestButtonBottomSheet"

const BusinessIndustryModal = ({ children, modalVisible = false, setModalVisible, onRequestClose }) => {
	return (
		<Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={onRequestClose}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={{ height: 5, width: 60, marginBottom: 10, borderRadius: 30, backgroundColor: "#D9D9D9" }}></View>
					<Text style={styles.loanTypeLabel}>Business Industry</Text>
					<View style={{ height: 1, width: "100%", backgroundColor: "#D9D9D9" }}>
						<Text>Hell</Text>
					</View>
					<ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 10, paddingBottom: 15, width: "100%", height: "79%", backgroundColor: "white" }}>
						{children}
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

export default observer(BusinessIndustryModal)

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.4)"
		// padding: 20
	},
	modalView: {
		margin: 0,
		width: "100%",
		height: "75%",
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
	loanTypeLabel: {
		color: "#001F3F",
		fontFamily: "Inter-Regular",
		fontSize: 22,
		textAlign: "center",
		fontStyle: "normal",
		fontWeight: "400",
		marginBottom: 10
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
