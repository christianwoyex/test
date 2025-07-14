import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconUploadPickerTop, IconUploadPin } from "../../../assets/icons"

const FileCard = ({ onPress, label = "Accepted file formats are: PDF, PNG, JPEG" }) => {
	return (
		<View style={styles.container}>
			<IconUploadPickerTop />
			<Text style={styles.acceptedType}>{label}</Text>
			<TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.pickBtn}>
				<IconUploadPin />
				<Text>Upload ID</Text>
			</TouchableOpacity>
		</View>
	)
}

export default FileCard

const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: 153.78,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderStyle: "dashed",
		borderRadius: 8,
		borderColor: "#D5D4D4"
	},
	acceptedType: {
		fontFamily: "Inter-Regular",
		fontWeight: "300",
		fontSize: 12,
		lineHeight: 15,
		color: "#525252",
		marginTop: 15
	},
	pickBtn: {
		width: 130,
		height: 40,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
		gap: 6,
		borderRadius: 30,
		backgroundColor: "#D9D9D9",
		marginTop: 15
	}
})
