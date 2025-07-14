import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import FileCard from "../../../screens/profile/FileCard"

const SyncBankStatementSheet = ({ navigation, pickFile }) => {
	return (
		<View style={styles.contentContainer}>
			<Text style={styles.loanTypeLabel}>Bank Statement</Text>
			<View style={{ height: 1, width: "100", backgroundColor: "#D9D9D9" }}></View>
			<View style={{ marginVertical: 10, marginBottom: 20 }}>
				<Text style={styles.descText}>
					For existing Business, you are required by Seedng to submit your 12 month bank statement. You can submit automatically by connecting your bank account with mono or okra. Your application
					will be canceled if you don’t submit
				</Text>
			</View>
			<View>
				<FileCard onPress={pickFile} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		zIndex: 20000,
		// position: "absolute",
		backgroundColor: "rgba(0,0,0, 0.5)"
	},
	contentContainer: {
		width: "100%",
		justifyContent: "center",
		paddingHorizontal: 20,
		marginTop: 30
	},
	loanTypeLabel: {
		color: "#001F3F",
		fontFamily: "Inter-Regular",
		fontSize: 30,
		textAlign: "center",
		fontStyle: "normal",
		fontWeight: "400",
		marginBottom: 10
	},
	descText: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "400",
		textAlign: "justify",
		fontSize: 13,
		lineHeight: 19,
		color: "#6B7D90"
	}
})

export default SyncBankStatementSheet
