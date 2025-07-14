import React, { useState } from "react"
import { View, Text, StyleSheet, Modal } from "react-native"

import ChangeAvatorButton from "./ChangeAvatorButton"
import { IconTakePhoto, IconSelectFromGallary } from "../../../assets/icons"

const ChangeAvaterBottomSheet = ({ navigation, pickImageCam, pickImageGal }) => {
	return (
		<View style={styles.contentContainer}>
			<Text style={styles.loanTypeLabel}>Change Avatar</Text>
			<ChangeAvatorButton title="Take a Photo" onPress={pickImageCam} icon={<IconTakePhoto />} />
			<ChangeAvatorButton title="Select from Gallery" onPress={pickImageGal} icon={<IconSelectFromGallary />} />
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
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "400",
		marginBottom: 10
	}
})

export default ChangeAvaterBottomSheet
