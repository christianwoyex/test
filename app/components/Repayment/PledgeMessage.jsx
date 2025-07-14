import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"

const PledgeMessageModal = ({ modalVisible = false, setModalVisible, onRequestClose, amount = "200" }) => {
	return (
		// <View style={styles.centeredView}>
		<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onRequestClose}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text>
						"<Text style={styles.textStyle}>Commit to Giving Back:</Text>
						<Text style={styles.textDesc}>
							Upon loan repayment, you agree to donate a minimum of {amount} naira to support fellow entrepreneurs, fostering a cycle of empowerment and shared success.
						</Text>
						"
					</Text>
					<View>
						<Pressable style={[styles.button, styles.buttonClose]} onPress={setModalVisible}>
							<Text style={styles.okButtonText}>Ok</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
		// </View>
	)
}

export default PledgeMessageModal

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		padding: 20
	},
	modalView: {
		margin: 20,
		width: "100%",
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 20,
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
