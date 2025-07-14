import React from "react"
import { View, Text, StyleSheet, Modal, Alert } from "react-native"
import AppDivider from "../../components/common/Divider"
import CustomPrimaryButton from "../../components/common/PrimaryButton"

const UploadSheetComp = ({ onSelectExisting, onSelectNew }) => {
	return (
		<View style={styles.contentContainer}>
			<Text style={styles.loanTypeLabel}>Upload ID</Text>
			<AppDivider />
			<Text>Please have your identification ready and capture a clear, well-lit photo with your phone camera. Note: Unclear photos may result in processing delays.</Text>
			<CustomPrimaryButton title={"Take photo"} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "400",
		marginBottom: 10
	}
})

export default UploadSheetComp
